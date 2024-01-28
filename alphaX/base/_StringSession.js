const fs = require('fs');
const config = require('../../config')

class StringSession {

    constructor() {}

    async CreateAuthJson() {

        try {

            var string = Buffer.from(fs.readFileSync('session.txt'), 'utf16le')
                .toString('utf-8');

            if (string.startsWith('AlphaX;;;')) {

                var code = string.split('AlphaX;;;')[1]

                var decrypt = Buffer.from(code, 'utf16le')
                    .toString('utf-8')
                    .replaceAll('�', '')
                    .replaceAll(' ', '')
                    .replaceAll("\u0000", '');
                console.log(decrypt)

                var buf = Buffer.from(JSON.parse(JSON.stringify(decrypt)));

                await fs.writeFileSync('auth_info_baileys/creds.json', buf, 'utf8', (err) => {
                    console.log(err)
                });

                console.log('❍ Created creds.json on \'auth_info_baileys\' 🔗')

            } else {
                console.error('⚠️️ Invalid Session Provided! please fill with correct informations.')
                process.kill(0, 'SIGTERM')
            };

        } catch {
            console.error('⚠️️ Session Not Found! Please consider your whatsapp scanned session to continue.')
            process.kill(0, 'SIGTERM')
        }

    }
}

module.exports = StringSession;