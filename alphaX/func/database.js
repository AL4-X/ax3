const {
    JsonDB
} = require('node-json-db');
const {
    Config
} = require('node-json-db/dist/lib/JsonDBConfig');

let ConfigDB, GreetingDB, PluginDB, NoteDB, FilterDB, JidsDB
setInterval(async() => {

    ConfigDB = new JsonDB(new Config('JsonDB/ConfigDB', true, true, '/'));
    GreetingDB = new JsonDB(new Config('JsonDB/GreetingDB', true, true, '/'));
    PluginDB = new JsonDB(new Config('JsonDB/PluginDB', true, true, '/'));
    NoteDB = new JsonDB(new Config('JsonDB/NoteDB', true, true, '/'));
    FilterDB = new JsonDB(new Config('JsonDB/FilterDB', true, true, '/'));
    JidsDB = new JsonDB(new Config('JsonDB/JidsDB', true, true, '/'));

}, 1000);

function TryToBool(String) {
    return String === 'true' ? true : String === 'false' ? false : String === 'null' ? null : String
}

async function ConnectToDB() {
    console.log("❍ Connected to JSON Database ☘️")
}

async function SetDB(DB, KEY, VALUE) {

    if (DB == 'WelcomeDB') { //"WELCOME": {"jid":"msg"}
        return GreetingDB.push('/' + 'WELCOME', {
            [KEY]: VALUE
        }, true)
    } else if (DB == 'GoodbyeDB') { //"GOODBYE": {"jid":"msg"}
        return GreetingDB.push('/' + 'GOODBYE', {
            [KEY]: VALUE
        }, true)
    } else if (DB == 'PluginDB') { //"pluginName": "link"
        return PluginDB.push('/' + KEY, VALUE, true)
    } else if (DB == 'NoteDB') { //"date": "note"
        return NoteDB.push('/' + KEY, VALUE, true)
    } else if (DB == 'FilterDB') { //"jid": { "filter": "msg" }
        return FilterDB.push('/' + KEY, VALUE, true)
    } else if (DB == 'SudoDB') { //"jids": [ "xxxx","xxxx" ]
        return JidsDB.push('/SUDO', [KEY], true)
    } else if (DB == 'BchatDB') { //"jids": [ "xxxx","xxxx" ]
        return JidsDB.push('/BLOCK_CHAT', [KEY], true)
    }
}

async function GetDB(DB, KEY) {

    if (DB == 'WelcomeDB') {
        if (KEY == '*') {
            return GreetingDB.getData('/WELCOME')
        } else {
            return GreetingDB.getData('/WELCOME/' + KEY)
        }
    } else if (DB == 'GoodbyeDB') {
        if (KEY == '*') {
            return GreetingDB.getData('/GOODBYE')
        } else {
            return GreetingDB.getData('/GOODBYE/' + KEY)
        }
    } else if (DB == 'PluginDB') {
        if (KEY == '*') {
            return PluginDB.getData('/')
        } else {
            return PluginDB.getData('/' + KEY)
        }
    } else if (DB == 'NoteDB') {
        if (KEY == '*') {
            return NoteDB.getData('/')
        } else {
            return NoteDB.getData('/' + KEY)
        }
    } else if (DB == 'FilterDB') {
        if (KEY == '*') {
            return FilterDB.getData('/')
        } else {
            return FilterDB.getData('/' + KEY)
        }
    } else if (DB == 'SudoDB') {
        return JidsDB.getData('/SUDO')
    } else if (DB == 'BchatDB') {
        return JidsDB.getData('/BLOCK_CHAT')
    }
}

async function DeleteDB(DB, KEY) {

    if (DB == 'WelcomeDB') {
        return GreetingDB.delete('/WELCOME/' + KEY)
    } else if (DB == 'GoodbyeDB') {
        return GreetingDB.delete('/GOODBYE/' + KEY)
    } else if (DB == 'PluginDB') {
        return PluginDB.delete('/' + KEY)
    } else if (DB == 'NoteDB') {
        return NoteDB.delete('/' + KEY)
    } else if (DB == 'FilterDB') {
        return FilterDB.delete('/' + KEY)
    } else if (DB == 'SudoDB') {
        var x = JidsDB.getData('/SUDO')
        var y = JSON.stringify(x)
        var z = y.replaceAll("\"" + KEY + "\"" + ",",'')
        var a = JSON.parse(z)
        JidsDB.delete('/SUDO')
        return JidsDB.push('/SUDO', a, true)
    } else if (DB == 'BchatDB') {
        var x = JidsDB.getData('/BLOCK_CHAT')
        var y = JSON.stringify(x)
        var z = y.replaceAll("\"" + KEY + "\"" + ",",'')
        var a = JSON.parse(z)
        JidsDB.delete('/BLOCK_CHAT')
        return JidsDB.push('/BLOCK_CHAT', a, true)
    }
}

module.exports = {
    set: SetDB,
    get: GetDB,
    del: DeleteDB,
    connect: ConnectToDB
}