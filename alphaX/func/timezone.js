async function _getTime(jid) {

    var timezone = '';
    if (jid.startsWith('90')) { // Turkey
        timezone = new Date()
            .toLocaleString('TR', {
            timeZone: 'Europe/Istanbul'
        })
            .split(' ')[1]
    } else if (jid.startsWith('994')) { // Azerbayjan
        timezone = new Date()
            .toLocaleString('AZ', {
            timeZone: 'Asia/Baku'
        })
            .split(' ')[1]
    } else if (jid.startsWith('94')) { // Sri Lanka
        timezone = new Date()
            .toLocaleString('LK', {
            timeZone: 'Asia/Colombo'
        })
            .split(' ')[1]
    } else if (jid.startsWith('351')) { // Portugal
        timezone = new Date()
            .toLocaleString('AZ', {
            timeZone: 'Europe/Lisbon'
        })
            .split(' ')[1]
    } else if (jid.startsWith('7')) { // Russia - Same As Turkey
        timezone = new Date()
            .toLocaleString('RU', {
            timeZone: 'Europe/Istanbul'
        })
            .split(' ')[1]
    } else if (jid.startsWith('91')) { // India
        timezone = new Date()
            .toLocaleString('HI', {
            timeZone: 'Asia/Kolkata'
        })
            .split(' ')[1]
    } else if (jid.startsWith('62')) { // Indonesia
        timezone = new Date()
            .toLocaleString('ID', {
            timeZone: 'Asia/Jakarta'
        })
            .split(' ')[1]
    } else if (jid.startsWith('49')) { // Germany
        timezone = new Date()
            .toLocaleString('DE', {
            timeZone: 'Europe/Berlin'
        })
            .split(' ')[1]
    } else if (jid.startsWith('61')) { // Australia
        timezone = new Date()
            .toLocaleString('AU', {
            timeZone: 'Australia/Lord_Howe'
        })
            .split(' ')[1]
    } else if (jid.startsWith('55')) { // Brazil
        timezone = new Date()
            .toLocaleString('BR', {
            timeZone: 'America/Noronha'
        })
            .split(' ')[1]
    } else if (jid.startsWith('33')) { // France
        timezone = new Date()
            .toLocaleString('FR', {
            timeZone: 'Europe/Paris'
        })
            .split(' ')[1]
    } else if (jid.startsWith('44')) { // UK
        timezone = new Date()
            .toLocaleString('GB', {
            timeZone: 'Europe/London'
        })
            .split(' ')[1]
    } else if (jid.startsWith('39')) { // Italy
        timezone = new Date()
            .toLocaleString('IT', {
            timeZone: 'Europe/Rome'
        })
            .split(' ')[1]
    } else if (jid.startsWith('998')) { // Uzbekistan
        timezone = new Date()
            .toLocaleString('UZ', {
            timeZone: 'Asia/Samarkand'
        })
            .split(' ')[1]
    } else if (jid.startsWith('993')) { // Turkmenistan
        timezone = new Date()
            .toLocaleString('TM', {
            timeZone: 'Asia/Ashgabat'
        })
            .split(' ')[1]
    } else {
        timezone = new Date()
            .toLocaleString('EN', {
            timeZone: 'America/New_York'
        })
            .split(' ')[1]
    };

    return timezone
}

async function _getDate(Language) {

        if (!Language) {
            throw new Error('Missing Language!!')
        }
        const get_localized_date = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        var data = new Date()
            .toLocaleDateString(Language, get_localized_date)
        return data;

    }

module.exports = {
_getDate: _getDate,
_getTime: _getTime
}