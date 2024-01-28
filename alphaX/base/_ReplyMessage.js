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
const Image = require('./_Image');
const config = require("../../config");

class ReplyMessage extends Base {
    constructor(client, data) {
        super(client);
        if (data) this._patch(data);
    }

    _patch(data) {
        var keyVar = {
            remoteJid: '',
            fromMe: '',
            id: '',
            participant: ''
        }
        let fromWho = data.key.participant == data.message.extendedTextMessage.contextInfo.participant ? data.key.fromMe : false;
        keyVar.remoteJid = data.key.remoteJid;
        keyVar.fromMe = fromWho;
        keyVar.id = data.message.extendedTextMessage.contextInfo.stanzaId;
        keyVar.participant = data.message.extendedTextMessage.contextInfo.participant;

        this.sender = data.key.remoteJid.includes("@g.us") ? data.key.participant : data.key.remoteJid;
        this.stanzaId = data.message.extendedTextMessage.contextInfo.stanzaId;
        this.participant = data.message.extendedTextMessage.contextInfo.participant;
        this.contextInfo = data.message.extendedTextMessage.contextInfo;
        this.quotedKey = keyVar;
        this.fromMe = fromWho;
        if (data.message.extendedTextMessage.contextInfo.quotedMessage && data.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage) {
            this.imageMessage = data.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
            this.message = data.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage.caption ? data.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage.caption : '';
            this.caption = data.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage.caption ? data.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage.caption : '';
            this.jpegThumbnail = data.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage.jpegThumbnail;
            this.url = data.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage.url;
            this.mimetype = data.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage.mimetype;
            this.height = data.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage.height;
            this.width = data.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage.width;
            this.mediaKey = data.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage.mediaKey;
            this.image = true;
            this.video = false;
            this.audio = false;
            this.sticker = false;
            this.document = false;
            this.viewOnce = false;
            this.text = false;
        } else if (data.message.extendedTextMessage.contextInfo.quotedMessage && data.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage) {
            this.videoMessage = data.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage;
            this.message = data.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.caption === null ? data.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.caption : '';
            this.caption = data.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.caption === null ? data.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.caption : '';
            this.url = data.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.url;
            this.mimetype = data.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.mimetype;
            this.height = data.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.height;
            this.width = data.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.width;
            this.mediaKey = data.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.mediaKey;
            this.video = true;
            this.image = false;
            this.audio = false;
            this.sticker = false;
            this.document = false;
            this.viewOnce = false;
            this.text = false;
        } else if (data.message.extendedTextMessage.contextInfo.quotedMessage && data.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage) {
            this.audioMessage = data.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage;
            this.url = data.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage.url;
            this.mimetype = data.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage.mimetype;
            this.mediaKey = data.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage.mediaKey;
            this.audio = true;
            this.video = false;
            this.image = false;
            this.document = false;
            this.sticker = false;
            this.viewOnce = false;
            this.text = false;
        } else if (data.message.extendedTextMessage.contextInfo.quotedMessage && data.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage) {
            this.stickerMessage = data.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage;
            this.url = data.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.url;
            this.mimetype = data.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.mimetype;
            this.mediaKey = data.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.mediaKey;
            this.sticker = true;
            this.video = false;
            this.image = false;
            this.document = false;
            this.audio = false;
            this.viewOnce = false;
            this.text = false;
        } else if (data.message.extendedTextMessage.contextInfo.quotedMessage && data.message.extendedTextMessage.contextInfo.quotedMessage.documentMessage) {
            this.documentMessage = data.message.extendedTextMessage.contextInfo.quotedMessage.documentMessage;
            this.url = data.message.extendedTextMessage.contextInfo.quotedMessage.documentMessage.url;
            this.mimetype = data.message.extendedTextMessage.contextInfo.quotedMessage.documentMessage.mimetype;
            this.mediaKey = data.message.extendedTextMessage.contextInfo.quotedMessage.documentMessage.mediaKey;
            this.fileName = data.message.extendedTextMessage.contextInfo.quotedMessage.documentMessage.fileName;
            this.document = true;
            this.video = false;
            this.image = false;
            this.audio = false;
            this.sticker = false;
            this.viewOnce = false;
            this.text = false;
        } else if (data.message.extendedTextMessage.contextInfo.quotedMessage && data.message.extendedTextMessage.contextInfo.quotedMessage.conversation) {
            this.message = data.message.extendedTextMessage.contextInfo.quotedMessage.conversation;
            this.text = data.message.extendedTextMessage.contextInfo.quotedMessage.conversation;
            this.image = false;
            this.video = false;
            this.audio = false;
            this.sticker = false;
            this.document = false;
            this.viewOnce = false;
        }

        return super._patch(data);
    }

};

module.exports = ReplyMessage;