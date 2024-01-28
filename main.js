const {
    default: makeWASocket,
    BufferJSON,
    useMultiFileAuthState,
    DisconnectReason,
    Browsers,
    delay
} = require("@whiskeysockets/baileys")
const events = require("./events")
const database = require("./alphaX/func/database")
const config = require("./config")
console.log(config)
const {
    Message, Image, Video, StringSession
} = require("./alphaX/base/")
const pino = require("pino")
const {
    Boom
} = require("@hapi/boom")
const fs = require("fs")
const chalk = require("chalk")
const path = require("path")
const axios = require("axios")
const {
    _getTime, _getDate
} = require("./alphaX/func/timezone")
const {
    worktype
} = require("./alphaX/func/worktype")
const simpleGit = require("simple-git");
const git = simpleGit();
const exec = require("child_process")
    .exec;
const os = require("os");

var owners = {
    jids: ["94772978164@s.whatsapp.net",
        "94763983965@s.whatsapp.net",
        "94701102539@s.whatsapp.net",
        "94755172905@s.whatsapp.net"]
}

async function StartAlphaXmd() {

    console.log(chalk.white.bold("\n\n◳ Alpha-X-MD-Bot-Running 🚀"))
    console.log("❍ Bot Version: " + config.VERSION + " 🏁")

    const {
        JsonDB
    } = require('node-json-db');
    const {
        Config
    } = require('node-json-db/dist/lib/JsonDBConfig');

    const ConfigDB = new JsonDB(new Config('JsonDB/ConfigDB', true, false, '/'))
    const AlphaXDB = new JsonDB(new Config('JsonDB/AlphaxDB', true, false, '/'))

    var logger_levels = ""
    if (config.DEBUG == "true") {
        logger_levels = "debug"
    } else if (config.DEBUG == "false") {
        logger_levels = "silent"
    } else if (config.DEBUG == "trace") {
        logger_levels = "trace"
    } else if (config.DEBUG == "fatal") {
        logger_levels = "fatal"
    } else if (config.DEBUG == "warn") {
        logger_levels = "warn"
    } else if (config.DEBUG == "error") {
        logger_levels = "error"
    } else if (config.debug == "info") {
        logger_levels = "info"
    } else {
        logger_levels = "silent"
    };

    try {
        await database.connect();
    } catch {}

    const session = new StringSession()
    if (!fs.existsSync('./auth_info_baileys/creds.json')) {
        await session.CreateAuthJson()
    }

    const {
        state, saveCreds
    } = await useMultiFileAuthState('auth_info_baileys')

    const AlphaxSock = makeWASocket({
        logger: pino({
            level: "silent"
        }),
        browser: 'AlphaX-MD-Bot-V3',
        syncFullHistory: true,
        generateHighQualityLinkPreview: true,
        auth: state
    });

    // Set wake time 🚀
    var time = await _getTime(AlphaxSock.user.id)
    await AlphaXDB.push("/WAKE_TIME", time);

    await AlphaxSock.ev.on('creds.update', saveCreds);

    AlphaxSock.ev.on("connection.update", async(update) => {

        const {
            connection, lastDisconnect
        } = update
        if (connection === "close") {
            let reason = new Boom(lastDisconnect.error)
                .output.statusCode
            if (reason === DisconnectReason.badSession) {
                console.log(chalk.redBright(`\n\n < ⚠️️ > Bad Session File, Please Delete Session and Scan Again`));
                StartAlphaXmd();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log(chalk.redBright("\n\n <⚠️️> Connection closed, reconnecting...."));
                StartAlphaXmd();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log(chalk.redBright("\n\n <⚠️️> Connection Lost from Server, reconnecting..."));
                StartAlphaXmd();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log(chalk.redBright("\n\n <⚠️️> Connection Replaced, Another New Session Opened, Please Close Current Session First"));
                StartAlphaXmd();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(chalk.redBright(`\n\n < ⚠️️ > Device Logged Out, Please Scan Again And Run.`));
                StartAlphaXmd();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log(chalk.redBright("\n\n <⚠️️> Restart Required, Restarting..."));
                StartAlphaXmd();
            } else if (reason === DisconnectReason.timedOut) {
                console.log(chalk.redBright("\n\n <⚠️️> Connection TimedOut, Reconnecting..."));
                StartAlphaXmd();
            } else console.log("\n\n < ⚠️️ > Unknown DisconnectReason: " + reason + "|" + connection)
        };

        if (connection == "connecting") {
            console.log("❍ Connecting To WhatsApp 📲")
        };

        if (connection == "open") {

            // ====================== Internal Plugins ======================

            if (config.SLEEP == false) {
                async function InstallPlugins() {
                    console.log('❍ Installing Externel Plugins ♂️')
                    const plugins = await database.get('PluginDB', '*')
                    const plugnames = Object.keys(plugins)
                    plugnames.forEach(async(plugin) => {
                        try {
                            const data = await axios.get(plugins[plugin])
                            await fs.writeFile('./plugins/' + plugin + '.js', data.data, (err) => {})
                        } catch {}
                    })
                }
                await InstallPlugins()
                console.log("❍ Installing Internal Plugins 🔌");
                fs.readdirSync("./plugins")
                    .forEach(plugin => {
                    if (path.extname(plugin)
                        .toLowerCase() == ".js") {
                        try {
                            require("./plugins/" + plugin)
                            require("./updater.js")
                        } catch (e) {
                            console.log("Finding Errors... 🚫")
                            console.log("\n" + chalk.redBright("⚠️ Some plugins have errors >") + "\n\n៚️ Plugin Name: " + chalk.green(plugin) + "\n៚ Error: " + chalk.red(e) + "\n\n")
                        }
                    }
                })
                console.log("❍ All Plugins Installed 💸");
            } else {
                console.log("❍ Bot is sleeping now 😴")
                console.log("❍ Installing WakeUp Plugin ♂️")
                require("./plugins/worker.js");
                console.log("❍ Plugin Installed 💸");
            };

            let wtype = config.WORKTYPE == "public" ? "𝙋𝙪𝙗𝙡𝙞𝙘" : "𝙋𝙧𝙞𝙫𝙖𝙩𝙚"
            console.log("❍ Bot is working as " + wtype + " 🎉");

            // ==================== End Internal Plugins ====================

            let start_msg = worktype(config.WORKTYPE, config.LANG);

            await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                text: start_msg
            });

            if (config.SLEEP == true) {

                await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                    text: "*〘😴〙ʙᴏᴛ ɪs sʟᴇᴇᴘɪɴɢ ɴᴏᴡ.* \n *ᴛᴏ ᴡᴀᴋᴇ ᴜᴘ ᴛʏᴘᴇ* _wake_ *ᴄᴏᴍᴍᴀɴᴅ.*"
                });

            }

            // check updates ⚙️
            // try {
            // await git.fetch()
            // .
            // catch (async(err) => {
            // if (err.message.includes("To add an exception for this directory, call:")) {
            // let cmd = err.message.split("To add an exception for this directory, call:")[1].replaceAll("\n", "")
            // .replaceAll("        ", "")
            // await exec(cmd);
            // }
            // });
            // var commits = await git.log([config.BRANCH + "..origin/" + config.BRANCH]);
            // if (commits.total === 0) {
            // await AlphaxSock.sendMessage(AlphaxSock.user.id, {
            // text: "*ʏᴏᴜʀ ʙᴏᴛ ɪꜱ ᴄᴏᴍᴘʟᴇᴛᴇʟʏ ᴜᴘ-ᴛᴏ-ᴅᴀᴛᴇ ✅*"
            // });
            // } else {
            // await AlphaxSock.sendMessage(AlphaxSock.user.id, {
            // text: "*❤️‍🔥 ɴᴇᴡ ᴜᴘᴅᴀᴛᴇꜱ ᴀʀᴇ ᴀᴠᴀʟᴀʙʟᴇ*\n_⚙️ ᴜꜱᴇ [up] ᴄᴏᴍᴍᴀɴᴅ ꜰᴏʀ ᴄʜᴇᴄᴋ ᴜᴘᴅᴀᴛᴇꜱ_"
            // });
            // }
            // } catch {};

            // AutoBio System </>
            // setInterval(async() => {

            if (config.AUTOBIO == true || config.AUTOBIO == "true") {

                var timezone = await _getTime(AlphaxSock.user.id);

                async function datebiog(Language) {

                    if (!Language) {
                        throw new Error("Missing Language!!")
                    }
                    const get_localized_date = {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }
                    var data = new Date()
                        .toLocaleDateString(Language, get_localized_date)
                    return data;

                }

                var timezone_bio = timezone
                var date_bio = await datebiog(config.LANG)
                const biography = "⁞📆⁞ " + date_bio + "\n⁞♻️⁞ ʟᴀꜱᴛ ꜱᴇᴇɴ " + timezone_bio + "\n" + config.BIONAME

                const progressBarLength = 25; // Adjust this based on your desired console width
                function simulateLoading() {
                    let currentStep = 0;

                    const loadingInterval = setInterval(() => {
                        currentStep = (currentStep + 5) % 101; // Loop from 0 to 100
                        const progress = (currentStep / 99) * 100.952;
                        updateConsoleLoadingBar(progress);
                    }, 6 * 1000); // Interval in milliseconds
                }

                async function updateConsoleLoadingBar(progress) {
                    const filledLength = Math.round(progress / 100 * progressBarLength);

                    const bar = `❗ Loading...${progress.toFixed(2)}%` + " » [".padEnd(filledLength, "●") + " ".repeat(progressBarLength - filledLength) + "]";
                   // console.clear();
                   // console.log(bar);
                    
                    await AlphaxSock.query({
                        tag: "iq",
                        attrs: {
                            to: "@s.whatsapp.net",
                            type: "set",
                            xmlns: "status",
                        },
                        content: [{
                            tag: "status",
                            attrs: {},
                            content: Buffer.from(bar, "utf-8")
                        }]
                    })

                }

                // Call the function to start the loading simulation
                await simulateLoading();


            }
            // }, 6 * 1000);

            AlphaxSock.ev.on("messages.upsert", async(chatUpdate) => {

                var msg = chatUpdate.messages[0]
                console.log(JSON.stringify(chatUpdate, 'undefined', '\t'))
                if (msg.key && msg.key.remoteJid === "status@broadcast") return

                // No Online 🚀 >
                if (config.NO_ONLINE) {
                    await AlphaxSock.sendPresenceUpdate("unavailable", msg.key.remoteJid);
                }

                // ==================== Blocked Chats ====================

                if (config.PM_BLOCK !== false) {
                    if (msg.key.remoteJid.includes("@s.whatsapp.net") && msg.key.fromMe == false && msg.key.remoteJid !== AlphaxSock.user.id && !owners.jids.includes(msg.key.remoteJid)) return;
                }
                let b_chat_jids = await database.get('BchatDB');
                if (b_chat_jids) {
                    if (msg.key.remoteJid.includes("@g.us") ? b_chat_jids.includes(msg.key.remoteJid) : b_chat_jids.includes(msg.key.participant)) return;
                }
                if (config.BOTHELP == "120363023256845651" && !owners.jids.includes(AlphaxSock.user.id.split(":")[0] + "@s.whatsapp.net")) {
                    var sup = config.BOTHELP.split(",");
                    if (msg.key.remoteJid.includes("@g.us") ? sup.includes(msg.key.remoteJid.split("@")[0]) : sup.includes(msg.key.participant ? msg.key.remoteJid.split("@")[0] : msg.key.remoteJid.split("@")[0])) return;
                }
                if (config.COMMUNITY == "120363022626781816" && !owners.jids.includes(AlphaxSock.user.id.split(":")[0] + "@s.whatsapp.net")) {
                    var sup = config.COMMUNITY.split(",");
                    if (msg.key.remoteJid.includes("@g.us") ? sup.includes(msg.key.remoteJid.split("@")[0]) : sup.includes(msg.key.participant ? msg.key.remoteJid.split("@")[0] : msg.key.remoteJid.split("@")[0])) return;
                }

                // ==================== End Blocked Chats ====================

                // ======================== Greetings =========================

                if (msg.messageStubType === 28 || msg.messageStubType === 32 && config.SLEEP == false) {

                    let gb;
                    try {
                        gb = await database.get("GoodbyeDB", msg.key.remoteJid)
                    } catch {};
                    if (!gb) return
                    if (gb) {

                        if (gb.includes("{pp}")) {
                            let ppUrl;
                            try {
                                ppUrl = await AlphaxSock.profilePictureUrl(msg.messageStubParameters[0], "image")
                            } catch {
                                ppUrl = await AlphaxSock.profilePictureUrl(msg.key.remoteJid, "image")
                            };
                            var _gpData = await AlphaxSock.groupMetadata(msg.key.remoteJid)
                            var thumb = await axios.get(ppUrl, {
                                responseType: "arrayuffer"
                            })

                            await AlphaxSock.sendMessage(msg.key.remoteJid, {
                                image: {
                                    url: ppUrl
                                },
                                mentions: [msg.messageStubParameters[0], _gpData.owner],
                                caption: gb.replace("{pp}", "‎")
                                    .replace("{gname}", _gpData.subject)
                                    .replace("{gowner}", "@" + _gpData.owner.split("@")[0])
                                    .replace("{gdesc}", _gpData.desc)
                                    .replace("{botowner}", AlphaxSock.user.name)
                                    .replace("{user}", "@" + msg.messageStubParameters[0].split("@")[0])
                            });

                        } else if (gb.includes("{gif}")) {

                            var _gpData = await AlphaxSock.groupMetadata(msg.key.remoteJid);
                            let ppUrl;
                            try {
                                await axios.get(config.GBYE_GIF, {
                                    responseType: "arraybuffer"
                                });
                                ppUrl = config.GBYE_GIF
                            } catch {
                                ppUrl = await AlphaxSock.profilePictureUrl(msg.key.remoteJid, "image")
                            }

                            await AlphaxSock.sendMessage(msg.key.remoteJid, {
                                video: {
                                    url: ppUrl
                                },
                                mentions: [msg.messageStubParameters[0], _gpData.owner],
                                gifPlayback: true,
                                caption: gb.replace("{gif}", "‎")
                                    .replace("{gname}", _gpData.subject)
                                    .replace("{gowner}", "@" + _gpData.owner.split("@")[0])
                                    .replace("{gdesc}", _gpData.desc)
                                    .replace("{botowner}", AlphaxSock.user.name)
                                    .replace("{user}", "@" + msg.messageStubParameters[0].split("@")[0])
                            });

                        } else {
                            var _gpData = await AlphaxSock.groupMetadata(msg.key.remoteJid)
                            await AlphaxSock.sendMessage(msg.key.remoteJid, {
                                text: gb.replace("{gname}", _gpData.subject)
                                    .replace("{gowner}", "@" + _gpData.owner.split("@")[0])
                                    .replace("{gdesc}", _gpData.desc)
                                    .replace("{botowner}", AlphaxSock.user.name)
                                    .replace("{user}", "@" + msg.messageStubParameters[0].split("@")[0]),
                                mentions: [msg.messageStubParameters[0], _gpData.owner]
                            });
                        }
                    }
                } else if (msg.messageStubType === 27 || msg.messageStubType === 31 && config.SLEEP == false) {

                    let gb;
                    try {
                        gb = await database.get("WelcomeDB", msg.key.remoteJid)
                    } catch {};
                    if (!gb) return
                    if (gb) {

                        if (gb.includes("{pp}")) {
                            let ppUrl;
                            try {
                                ppUrl = await AlphaxSock.profilePictureUrl(msg.messageStubParameters[0], "image")
                            } catch {
                                ppUrl = await AlphaxSock.profilePictureUrl(msg.key.remoteJid, "image")
                            };
                            var _gpData = await AlphaxSock.groupMetadata(msg.key.remoteJid)
                            var thumb = await axios.get(ppUrl, {
                                responseType: "arrayuffer"
                            })

                            await AlphaxSock.sendMessage(msg.key.remoteJid, {
                                image: {
                                    url: ppUrl
                                },
                                mentions: [msg.messageStubParameters[0], _gpData.owner],
                                caption: gb.replace("{pp}", "‎")
                                    .replace("{gname}", _gpData.subject)
                                    .replace("{gowner}", "@" + _gpData.owner.split("@")[0])
                                    .replace("{gdesc}", _gpData.desc)
                                    .replace("{botowner}", AlphaxSock.user.name)
                                    .replace("{user}", "@" + msg.messageStubParameters[0].split("@")[0])
                            });

                        } else if (gb.includes("{gif}")) {

                            var _gpData = await AlphaxSock.groupMetadata(msg.key.remoteJid);
                            let ppUrl;
                            try {
                                await axios.get(config.GBYE_GIF, {
                                    responseType: "arraybuffer"
                                });
                                ppUrl = config.WLCM_GIF
                            } catch {
                                ppUrl = await AlphaxSock.profilePictureUrl(msg.key.remoteJid, "image")
                            }

                            await AlphaxSock.sendMessage(msg.key.remoteJid, {
                                video: {
                                    url: ppUrl
                                },
                                mentions: [msg.messageStubParameters[0], _gpData.owner],
                                gifPlayback: true,
                                caption: gb.replace("{gif}", "‎")
                                    .replace("{gname}", _gpData.subject)
                                    .replace("{gowner}", "@" + _gpData.owner.split("@")[0])
                                    .replace("{gdesc}", _gpData.desc)
                                    .replace("{botowner}", AlphaxSock.user.name)
                                    .replace("{user}", "@" + msg.messageStubParameters[0].split("@")[0])
                            });

                        } else {
                            var _gpData = await AlphaxSock.groupMetadata(msg.key.remoteJid)
                            await AlphaxSock.sendMessage(msg.key.remoteJid, {
                                text: gb.replace("{gname}", _gpData.subject)
                                    .replace("{gowner}", "@" + _gpData.owner.split("@")[0])
                                    .replace("{gdesc}", _gpData.desc)
                                    .replace("{botowner}", AlphaxSock.user.name)
                                    .replace("{user}", "@" + msg.messageStubParameters[0].split("@")[0]),
                                mentions: [msg.messageStubParameters[0], _gpData.owner]
                            });
                        }
                    }
                }

                // ======================== End Greetings =====================
                // ========================= Events ===========================

                events.commands.map(
                async(command) => {
                    if (msg.message && msg.message.imageMessage && msg.message.imageMessage.caption) {
                        var text_msg = msg.message.imageMessage.caption;
                    } else if (msg.message && msg.message.videoMessage && msg.message.videoMessage.caption) {
                        var text_msg = msg.message.videoMessage.caption;
                    } else if (msg.message && msg.message.listResponseMessage) {
                        var text_msg = msg.message.listResponseMessage.singleSelectReply.selectedRowId;
                    } else if (msg.message && msg.message.buttonsResponseMessage) {
                        var text_msg = msg.message.buttonsResponseMessage.selectedButtonId;
                    } else if (msg.message && msg.message.templateButtonReplyMessage) {
                        var text_msg = msg.message.templateButtonReplyMessage.selectedId;
                    } else if (msg.message) {
                        var text_msg = !msg.message.extendedTextMessage ? msg.message.conversation : msg.message.extendedTextMessage.text;
                    } else {
                        var text_msg = undefined;
                    }

                    if ((command.on !== undefined && (command.on === "image" || command.on === "photo") && msg.message && msg.message.imageMessage !== null && (command.pattern === undefined || (command.pattern !== undefined && command.pattern.test(text_msg)))) || (command.pattern !== undefined && command.pattern.test(text_msg)) || (command.on !== undefined && command.on === "text" && text_msg) || (command.on !== undefined && (command.on === "video") && msg.message && msg.message.videoMessage !== null && (command.pattern === undefined || (command.pattern !== undefined && command.pattern.test(text_msg))))) {

                        let sendMsg = false;

                        let sudo_jids = await database.get('SudoDB');

                        if (msg.key.fromMe == false ) sendMsg = true
                        if (msg.key.fromMe == false && owners.jids && owners.jids.includes(msg.key.participant || msg.key.remoteJid)) sendMsg = true
                        if (msg.key.fromMe == false && command.fromMe == false && config.WORKTYPE == "public" || msg.key.fromMe == false && command.fromMe == false || command.on) sendMsg = true
                        if (msg.key.fromMe == true) sendMsg = true
                        if (command.onlyPm && msg.key.remoteJid.includes("@g.us") || command.onlyGroup && msg.key.remoteJid.includes("@s.whatsapp.net")) sendMsg = false
                        // ==================== End Events ====================

                        // ==================== Message Catcher ====================
                        if (sendMsg) {

                            if (config.SEND_READ && command.on === undefined) {
                                await AlphaxSock.sendReadReceipt(msg.key.remoteJid, msg.key.participant, [msg.key.id]);
                            }
                            var match = text_msg.match(command.pattern);
                            if (command.on !== undefined && (command.on === "image" || command.on === "photo") && msg.message.imageMessage !== null) {
                                AlphaXmsg = new Image(AlphaxSock, msg);
                            } else if (command.on !== undefined && (command.on === "video") && msg.message.videoMessage !== null) {
                                AlphaXmsg = new Video(AlphaxSock, msg);
                            } else {
                                AlphaXmsg = new Message(AlphaxSock, msg, match);
                            }

                            if (msg.key.fromMe && command.deleteCommand) {
                                await AlphaXmsg.delete(msg)
                            }

                            // ==================== End Message Catcher ====================

                            // ==================== Error Message ====================
                            try {
                                await command.function(AlphaXmsg, match);
                            } catch (error) {

                                if (config.NOLOG == "true") return;
                                if (config.LANG == "SI") {

                                    await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                        text: "*🔭 දෝෂ වාර්තාව [ Ａｌｐｈａ-Ｘ ] 📨*\n" + "\n*⚙ Ａｌｐｈａ-Ｘ හි දෝෂයක් සිදු වී ඇත!*" + "\n_♦ මෙම දෝෂ ලඝු සටහනට ඔබේ අංකය හෝ විරුද්ධවාදියෙකුගේ අංකය ඇතුළත් විය හැකිය. කරුණාකර එය සමඟ ප්‍රවේශම් වන්න!_" + "\n_🛸 ඔබට අපගේ වට්සැප් කණ්ඩායමට උදව් සඳහා ලිවිය හැකිය ._" + "\n _https://chat.whatsapp.com/ItIRSBUMN9t2lQzCpfAKWt_" + "\n_මෙම පණිවිඩය ඔබගේ අංකයට යා යුතුව තිබුණි (සුරැකි පණිවිඩ)._\n" + "\n*දෝෂය:* ```" + error + "```\n\n"
                                    });
                                    if (error.message.includes("URL")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 ප්‍රධාන දෝෂය:* _Only Absolutely URLs Supported_" + "\n*⚖️ හේතුව:* _The usage of media tools (xmedia, sticker..) in the LOG number._" + "\n*🛡️ විසඳුම:* _You can use commands in any chat, except the LOG number._"
                                        });
                                    } else if (error.message.includes("conversation")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 ප්‍රධාන දෝෂය:* _Deleting Plugin_" + "\n*⚖️ හේතුව:* _Entering incorrectly the name of the plugin wanted to be deleted._" + "\n*🛡️ විසඳුම:* _Please try without adding_ *__* _to the plugin you want to delete. If you still get an error, try to add like_ ```?(.*) / $``` _to the end of the name._ "
                                        });
                                    } else if (error.message.includes("split")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 ප්‍රධාන දෝෂය:* _Split of Undefined_" + "\n*⚖️ හේතුව:* _Commands that can be used by group admins occasionally dont see the split function._ " + "\n*🛡️ විසඳුම:* _Restarting will be enough._"
                                        });
                                    } else if (error.message.includes("SSL")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 ප්‍රධාන දෝෂය:* _SQL Database Error_" + "\n*⚖️ හේතුව:* _Database corruption._ " + "\n*🛡️ විසඳුම:* _There is no known solution. You can try reinstalling it._"
                                        });
                                    } else if (error.message.includes("Ookla")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 ප්‍රධාන දෝෂය:* _Ookla Server Connection_" + "\n*⚖️ හේතුව:* _Speedtest data cannot be transmitted to the server._" + "\n*🛡️ විසඳුම:* _If you use it one more time the problem will be solved._"
                                        });
                                    } else if (error.message.includes("params")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 ප්‍රධාන දෝෂය:* _Requested Audio Params_" + "\n*⚖️ හේතුව:* _Using the TTS command outside the Latin alphabet._" + "\n*🛡️ විසඳුම:* _The problem will be solved if you use the command in Latin letters frame._"
                                        });
                                    } else if (error.message.includes("unlink")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n" + "\n========== ```Error Resolved``` ==========" + "\n\n*🛠 ප්‍රධාන දෝෂය:* _No Such File or Directory_" + "\n*⚖️ හේතුව:* _Incorrect coding of the plugin._" + "\n*🛡️ විසඳුම:* _Please check the your plugin codes._"
                                        });
                                    } else if (error.message.includes("404")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 ප්‍රධාන දෝෂය:* _Error 404 HTTPS_" + "\n*⚖️ හේතුව:* _Failure to communicate with the server as a result of using the commands under the Heroku plugin._" + "\n*🛡️ විසඳුම:* _Wait a while and try again. If you still get the error, perform the transaction on the website.._"
                                        });
                                    } else if (error.message.includes("reply.delete")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 ප්‍රධාන දෝෂය:* _Reply Delete Function_" + "\n*⚖️ හේතුව:* _Using IMG or Wiki commands._" + "\n*🛡️ විසඳුම:* _There is no solution for this error. It is not a fatal error._"
                                        });
                                    } else if (error.message.includes("load.delete")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 ප්‍රධාන දෝෂය:* _Reply Delete Function_" + "\n*⚖️ හේතුව:* _Using IMG or Wiki commands._" + "\n*🛡️ විසඳුම:* _There is no solution for this error. It is not a fatal error._"
                                        });
                                    } else if (error.message.includes("400")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 ප්‍රධාන දෝෂය:* _Bailyes Action Error_ " + "\n*⚖️ හේතුව:* _The exact reason is unknown. More than one option may have triggered this error._" + "\n*🛡️ විසඳුම:* _If you use it again, it may improve. If the error continues, you can try to restart._"
                                        });
                                    } else if (error.message.includes("decode")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 ප්‍රධාන දෝෂය:* _Cannot Decode Text or Media_" + "\n*⚖️ හේතුව:* _Incorrect use of the plug._" + "\n*🛡️ විසඳුම:* _Please use the commands as written in the plugin description._"
                                        });
                                    } else if (error.message.includes("unescaped")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 ප්‍රධාන දෝෂය:* _Word Character Usage_" + "\n*⚖️ හේතුව:* _Using commands such as TTP, ATTP outside the Latin alphabet._" + "\n*🛡️ විසඳුම:* _The problem will be solved if you use the command in Latin alphabet.._"
                                        });
                                    } else {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🙇🏻 සමාවන්න! මට මෙම දෝශය කියවිය නොහැක 🙇🏻*" + "\n_උපසදෙස් සඳහා ඔබට අපගේ සහය කන්ඩායමට එක්විය හැක_"
                                        });
                                    }
                                } else {

                                    await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                        text: "*🔭 ERROR REPORT [ Ａｌｐｈａ-Ｘ ] ⚖️*\n" + "\n*⚙ Ａｌｐｈａ-Ｘ an error has occurred!*" + "\n_♦ This error log may include your number or the number of an opponent. Please be careful with it!_" + "\n_🏷 Aslo you can join our support group:_ \n *https://chat.whatsapp.com/ItIRSBUMN9t2lQzCpfAKWt* " + "\n_This message should have gone to your number (saved messages)._\n\n" + "*Error:* ```" + error + "```\n\n"
                                    }, {
                                        detectLinks: false
                                    });
                                    if (error.message.includes("URL")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 Main Error:* _Only Absolutely URLs Supported_" + "\n*⚖️ Reason:* _The usage of media tools (xmedia, sticker..) in the LOG number._" + "\n*🛡️ Solution:* _You can use commands in any chat, except the LOG number._"
                                        });
                                    } else if (error.message.includes("conversation")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 Main Error:* _Deleting Plugin_" + "\n*⚖️ Reason:* _Entering incorrectly the name of the plugin wanted to be deleted._" + "\n*🛡️ Solution:* _Please try without adding_ *__* _to the plugin you want to delete. If you still get an error, try to add like_ ```?(.*) / $``` _to the end of the name._ "
                                        });
                                    } else if (error.message.includes("split")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 Main Error:* _Split of Undefined_" + "\n*⚖️ Reason:* _Commands that can be used by group admins occasionally dont see the split function._ " + "\n*🛡️ Solution:* _Restarting will be enough._"
                                        });
                                    } else if (error.message.includes("SSL")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 Main Error:* _SQL Database Error_" + "\n*⚖️ Reason:* _Database corruption._ " + "\n*🛡️ Solution:* _There is no known solution. You can try reinstalling it._"
                                        });
                                    } else if (error.message.includes("Ookla")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 Main Error:* _Ookla Server Connection_" + "\n*⚖️ Reason:* _Speedtest data cannot be transmitted to the server._" + "\n*🛡️ Solution:* _If you use it one more time the problem will be solved._"
                                        });
                                    } else if (error.message.includes("params")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 Main Error:* _Requested Audio Params_" + "\n*⚖️ Reason:* _Using the TTS command outside the Latin alphabet._" + "\n*🛡️ Solution:* _The problem will be solved if you use the command in Latin letters frame._"
                                        });
                                    } else if (error.message.includes("unlink")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n" + "\n========== ```Error Resolved``` ==========" + "\n\n*🛠 Main Error:* _No Such File or Directory_" + "\n*⚖️ Reason:* _Incorrect coding of the plugin._" + "\n*🛡️ Solution:* _Please check the your plugin codes._"
                                        });
                                    } else if (error.message.includes("404")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 Main Error:* _Error 404 HTTPS_" + "\n*⚖️ Reason:* _Failure to communicate with the server as a result of using the commands under the Heroku plugin._" + "\n*🛡️ Solution:* _Wait a while and try again. If you still get the error, perform the transaction on the website.._"
                                        });
                                    } else if (error.message.includes("reply.delete")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 Main Error:* _Reply Delete Function_" + "\n*⚖️ Reason:* _Using IMG or Wiki commands._" + "\n*🛡️ Solution:* _There is no solution for this error. It is not a fatal error._"
                                        });
                                    } else if (error.message.includes("load.delete")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 Main Error:* _Reply Delete Function_" + "\n*⚖️ Reason:* _Using IMG or Wiki commands._" + "\n*🛡️ Solution:* _There is no solution for this error. It is not a fatal error._"
                                        });
                                    } else if (error.message.includes("400")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 Main Error:* _Bailyes Action Error_ " + "\n*⚖️ Reason:* _The exact reason is unknown. More than one option may have triggered this error._" + "\n*🛡️ Solution:* _If you use it again, it may improve. If the error continues, you can try to restart._"
                                        });
                                    } else if (error.message.includes("decode")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 Main Error:* _Cannot Decode Text or Media_" +

                                            "\n*⚖️ Reason:* _Incorrect use of the plug._" + "\n*🛡️ Solution:* _Please use the commands as written in the plugin description._"
                                        });
                                    } else if (error.message.includes("unescaped")) {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n" + "\n========== _Error Resolved!_ ==========" + "\n\n*🛠 Main Error:* _Word Character Usage_" + "\n*⚖️ Reason:* _Using commands such as TTP, ATTP outside the Latin alphabet._" + "\n*🛡️ Solution:* _The problem will be solved if you use the command in Latin alphabet.._"
                                        });
                                    } else {
                                        return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                            text: "*🙇🏻 Sorry, I Couldnt Read This Error! 🙇🏻*" + "\n_You can write to our support group for more help._"
                                        });
                                    }
                                }
                            }
                        }
                    }
                })
            })
        }
    })
}

StartAlphaXmd()
//    .
// catch (async(err) => {
// console.log(chalk.red(err))
// })