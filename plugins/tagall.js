const Ev = require('../events');
const Language = require('../language');
const Lang = Language.getString('tagall');

Ev.axCMD({
    pattern: 'tagall ?(.*)',
    fromMe: true,
    desc: Lang.TAGALL_DESC,
    onlyGroup: true,
    deleteCommand: false
}, (async(msg) => {
    var im = msg.checkAdmin(msg.user.id);
    if (!im) return await msg.send(Lang.ADMİN);
    if (!msg.empty) {
        var jids = await msg.gPeople();
        await msg.send({
            text: msg.text,
            mentions: jids,
            edit: msg.key
        });
    } else if (msg.empty && !msg.r_msg) {
        var jids = await msg.gPeople();
        _msg = " *■ @" + jids.toString()
            .replaceAll("@s.whatsapp.net,", "* \n *■ @")
            .replaceAll("@s.whatsapp.net", "*");
        await msg.send({
            text: _msg,
            mentions: jids,
            edit: msg.key
        });
    } else if (msg.r_msg) {
        var jids = await msg.gPeople();
        await msg.send({
            text: msg.r_msg.text,
            mentions: jids,
            edit: msg.key
        });
    }
}));