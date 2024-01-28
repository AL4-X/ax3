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
const ReplyMessage = require('./_ReplyMessage');
const config = require("../../config");

class Message extends Base {
    constructor(client, msgData, match) {
        super(client);
        msgData.match = match
        if (msgData) this._patch(msgData);
    }

    _patch(msgData) {        
        this.input = msgData.match.input;
        this.cmd = msgData.match[0].replace(msgData.match[1], "").replaceAll(" ", "");
        this.text = msgData.match.input.replace(this.cmd, "");
        this.key = msgData.key;
        this.sender = msgData.key.remoteJid.includes("@g.us") ? msgData.key.participant : msgData.key.remoteJid;
        this.pushName = msgData.pushName;
        this.jid = msgData.key.remoteJid;
        this.fromMe = msgData.key.fromMe;
        this.viewOnce = msgData.message.viewOnceMessageV2 ? true : false;
        this.deleted = false;
        this.empty = this.text == "" ? true : false;
        this.user = this.client.user;

        if (msgData.message.protocolMessage) {
            this.deleted = true;
            msgData.message.protocolMessage.key.participant;
            this.protocolMessage = msgData.message.protocolMessage;
            this.deletedKey = msgData.message.protocolMessage.key;
        } else {
            this.protocolMessage = false;
        }

        if (msgData.message.viewOnceMessageV2) {
            this.viewOnceMessage = msgData.message.viewOnceMessageV2.message;
        } else {
            this.viewOnceMessage = false;
        }

        if (msgData.message.hasOwnProperty('extendedTextMessage') && msgData.message.extendedTextMessage.hasOwnProperty('contextInfo') === true && msgData.message.extendedTextMessage.contextInfo.hasOwnProperty('quotedMessage')) {
            this.r_msg = new ReplyMessage(this.client, msgData);
        } else {
            this.r_msg = false;
        }

        if (msgData.message.hasOwnProperty('extendedTextMessage') && msgData.message.extendedTextMessage.hasOwnProperty('contextInfo') === true && msgData.message.extendedTextMessage.contextInfo.hasOwnProperty('mentionedJid')) {
            this.mention = msgData.message.extendedTextMessage.contextInfo.mentionedJid;
        } else {
            this.mention = false;
        }

        return super._patch(msgData);
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
            quoted: this.msgData
        })
        return new Message(this.client, message)
    }

    async send(content, options) {
        return await this.client.sendMessage(this.jid, content, options)
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
                if (member.id.split('@')[0] == user.split('@')[0]) {
                    if (member.admin == 'admin' || member.admin == 'superadmin') {
                        admin = true;
                    };
                };
            };
        });
        return admin;

    };

    async gPeople() {

        var group = await this.client.groupMetadata(this.jid);
        let jids = [];
        await group.participants.map((member) => {
            jids.push(member.id);
        });
        return jids;

    };

    async restart() {

        await delay(100);
        return process.exit(0);

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

}

module.exports = Message;