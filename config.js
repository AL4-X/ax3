const fs = require('fs');
const {
    JsonDB
} = require('node-json-db');
const {
    Config
} = require('node-json-db/dist/lib/JsonDBConfig');

const db = new JsonDB(new Config('JsonDB/ConfigDB', true, false, '/'))
const adb = new JsonDB(new Config('JsonDB/AlphaxDB', true, false, '/'))


function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
};

module.exports = {

    SLEEP: adb.getData('/SLEEP'),
    WAKE_TIME: adb.getData('/WAKE_TIME'),

    ANTILINK: db.getData('/ANTI_LINK'),
    AUTOBIO: db.getData('/AUTO_BIO'),
    SENDREACT: db.getData('/SEND_REACT'),
    PMBLOCK: db.getData('/PM_BLOCK'),
    LANG: db.getData('/LANGUAGE'),
    ALIVEMSG: db.getData('/ALIVE_MSG'),
    KICKMEMSG: db.getData('/KICKME_MSG'),
    BLOCKCHAT: db.getData('/BLOCK_CHAT'),
    BLOCKUSERS: db.getData('/BLOCK_USERS'),
    ADDMSG: db.getData('/ADD_MSG'),
    MUTEMSG: db.getData('/MUTE_MSG'),
    NOLOG: db.getData('/NO_LOG'),
    AILILY: db.getData('/AI_LILY'),
    BLOCKMSG: db.getData('/BLOCK_MSG'),
    UNBLOCKMSG: db.getData('/UNBLOCK_MSG'),
    UNMUTEMSG: db.getData('/UNMUTE_MSG'),
    WORKTYPE: db.getData('/WORK_TYPE'),
    PROMOTEMSG: db.getData('/PROMOTE_MSG'),
    DEMOTEMSG: db.getData('/DEMOTE_MSG'),
    BANMSG: db.getData('/BAN_MSG'),
    AFKMSG: db.getData('/AFK_MSG'),
    HANDLERS: db.getData('/HANDLERS'),
    SENDREAD: db.getData('/SEND_READ'),
    CAPTION: db.getData('/CAPTION'),
    BOTNAME: db.getData('/BOT_NAME'),
    BIONAME: db.getData('/BIO_NAME'),
    CLKEY: db.getData('/COMMAND_LIST_KEY'),
    AMKEY: db.getData('/ALIVE_MSG_KEY'),
    UNAME: db.getData('/USER_NAME'),
    CEMOJI: db.getData('/COMMAND_EMOJI'),
    DEMOJI: db.getData('/DESC_EMOJI'),
    WEMOJI: db.getData('/WARN_EMOJI'),
    APIC: db.getData('/ALIVE_PIC'),
    WLCMGIF: db.getData('/WLCM_GIF'),
    GBYEGIF: db.getData('/GBYE_GIF'),
    BLINKS: db.getData('/CUSTOM_BLOCK_LINKS'),
    BGM: db.getData('/BGM'),
    BKICK: db.getData('/BADWORDS_KICK'),
    NOONLINE: db.getData('/NO_ONLINE'),
    SUDO: db.getData('/SUDO'),
    DEBUG: db.getData('/DEBUG'),

    REPO: "SL-Alpha-X-Team/Alpha-X-MD-Bot",
    BOTHELP: "120363023256845651",
    COMMUNITY: "120363022626781816",
    VERSION: 'V.2.0 - Multi-Device',
    BRANCH: 'Multi-Device',
    GROUP: 'https://chat.whatsapp.com/ItIRSBUMN9t2lQzCpfAKWt',
    CHANNEL: 't.me/SL_AlphaX_Team'
};