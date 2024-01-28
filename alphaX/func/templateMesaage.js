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
    proto
} = require("@whiskeysockets/baileys")
const axios = require('axios');

async function sendTemplateMsgWithImage(client, jid, text, footer, buff, but, options = {}) {

    let up_msg = await prepareWAMessageMedia({
        image: buff
    }, {
        upload: client.waUploadToServer
    })
    var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
            hydratedTemplate: {
                imageMessage: up_msg.imageMessage,
                "hydratedContentText": text,
                "hydratedFooterText": footer,
                "hydratedButtons": but
            }
        }
    }), options)

    return await client.relayMessage(jid, template.message, {
        messageId: template.key.id
    })
}

async function sendTemplateMsgWithVideo(client, jid, text, footer, buff, but, options = {}) {

    let up_msg = await prepareWAMessageMedia({
        video: buff
    }, {
        upload: client.waUploadToServer
    })
    var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
            hydratedTemplate: {
                videoMessage: up_msg.videoMessage,
                "hydratedContentText": text,
                "hydratedFooterText": footer,
                "hydratedButtons": but
            }
        }
    }), options)

    return await client.relayMessage(jid, template.message, {
        messageId: template.key.id
    })
}

async function sendTemplateMsgWithAudio(client, jid, text, footer, buff, but, options = {}) {

    let up_msg = await prepareWAMessageMedia({
        audio: buff
    }, {
        upload: client.waUploadToServer
    })
    var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
            hydratedTemplate: {
                audioMessage: up_msg.audioMessage,
                "hydratedContentText": text,
                "hydratedFooterText": footer,
                "hydratedButtons": but
            }
        }
    }), options)

    return await client.relayMessage(jid, template.message, {
        messageId: template.key.id
    })
}

async function sendTemplateMsgWithDoc(client, jid, text, footer, buff, but, options = {}) {

    let up_msg = await prepareWAMessageMedia({
        document: buff
    }, {
        upload: client.waUploadToServer
    })
    var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
            hydratedTemplate: {
                documentMessage: up_msg.documentMessage,
                "hydratedContentText": text,
                "hydratedFooterText": footer,
                "hydratedButtons": but
            }
        }
    }), options)

    return await client.relayMessage(jid, template.message, {
        messageId: template.key.id
    })
}

module.exports = {
    sendTemplateImg: sendTemplateMsgWithImage,
    sendTemplateVid: sendTemplateMsgWithVideo,
    sendTemplateAud: sendTemplateMsgWithAudio,
    sendTemplateDoc: sendTemplateMsgWithDoc
}