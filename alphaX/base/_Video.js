const {
    default: makeWASocket,
    useSingleFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    makeInMemoryStore,
    jidDecode,
    proto,
    delay
} = require("@whiskeysockets/baileys")
const Base = require('./_Base');
const Message = require('./_Message');
const ReplyMessage = require('./_ReplyMessage');
const config = require("../../config");

class Video extends Base {
    constructor(client, data) {
        super(client);
        if (data) this._patch(data);
    }

    _patch(data) {
        this.key = data.key;
        this.sender = data.key.remoteJid.includes("@g.us") ? data.key.participant : data.key.remoteJid;
        this.pushName = data.pushName;
        this.id = data.key.id === undefined ? undefined : data.key.id;
        this.jid = data.key.remoteJid;
        this.fromMe = data.key.fromMe;
        this.caption = data.message.videoMessage.caption === null ? data.message.videoMessage.caption : '';
        this.url = data.message.videoMessage.url;
        this.mimetype = data.message.videoMessage.mimetype;
        this.height = data.quotedMessage.videoMessage.height;
        this.width = data.quotedMessage.videoMessage.width;
        this.mediaKey = data.message.videoMessage.mediaKey;
        this.data = data;

        if (data.message.videoMessage.hasOwnProperty('contextInfo') && data.message.contextInfo.quotedMessage) {
            this.reply_message = new ReplyMessage(this.client, data);
        } else {
            this.reply_message = false;
        }

        return super._patch(data);
    }

    async delete(message) {
        return await this.client.sendMessage(message.key.remoteJid, {
            delete: message.key
        })
    }

    async reply(text) {
        var message = await this.client.sendMessage(this.jid, {
            text: text
        }, {
            quoted: this.data
        })
        return new Message(this.client, message)
    }

    async sendMessage(jid, content, options) {
        return await this.client.sendMessage(jid, content, options)
    }

    async sendTyping() {
        return await this.client.sendPresenceUpdate('composing', this.jid);
    }

    async sendRead() {
        return await this.client.sendReadReceipt(this.key.remoteJid, this.key.participant, [this.key.id]);
    }

    async sendImage(url, options) {
        return this.client.sendMessage(this.jid, {
            image: {
                url: url
            }
        }, options);
    }

    async sendReaction(key, emoji) {

        if (config.SEND_REACT == false || config.SEND_REACT == "false") return
        const reactionMessage = {
            react: {
                text: emoji,
                key: key
            }
        }
        return await this.client.sendMessage(this.jid, reactionMessage)
    }

    async downloadMediaMessage(message) {
        let mimetype = message.mimetype ? message.mimetype.split("/")[0] : ''
        const stream = await downloadContentFromMessage(message, mimetype)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    }

    async setbio(bio) {

        await this.client.query({
            tag: 'iq',
            attrs: {
                to: '@s.whatsapp.net',
                type: 'set',
                xmlns: 'status',
            },
            content: [{
                tag: 'status',
                attrs: {},
                content: Buffer.from(bio, 'utf-8')
            }]
        })
    }

    async checkAdmin(user) {

        if (!user) user = this.client.user.id;
        user = user.split('@')[0].split(':')[0];
        var admin = false;
        var group = await this.client.groupMetadata(this.jid);
        await group.participants.map((member) => {
            if (admin == false) {
                if (member.id.split('@')[0] == user) {
                    if (member.admin == 'admin' || member.admin == 'superadmin') {
                        admin = true;
                    };
                };
            };
        });
        return admin;

    };

    async restart() {

        await delay(100);
        return process.exit(0)

    }

    async getThumbnail(url) {

        const axios = require("axios");
        const fs = require("fs");
        const imageToBase64 = require('image-to-base64');
        var Jimp = require('jimp');

        var thumb = await axios.get(url, {
            responseType: 'arraybuffer'
        });
        await fs.writeFileSync('./media/thumb-image.jpeg', Buffer.from(thumb.data));

        var read = await Jimp.read('./media/thumb-image.jpeg');
        var data = await read.resize(256, 145)
            .quality(100);
        await data.write('./media/thumbnail.jpeg');

        await delay(100);

        return imageToBase64("./media/thumbnail.jpeg")

    };

};

module.exports = Video;