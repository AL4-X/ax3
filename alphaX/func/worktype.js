function worktype(type, Language) {

    if (!type || !Language) {
        throw new Error('Missing Worktype!!')
    }
    var data = ''
    if (type == 'private') {
        if (Language == 'TR') {
            data = "*Ａｌｐｈａ-Ｘ Private Olarak Çalışıyor! 🚀*\n\n" +
                "_Lütfen burada plugin denemesi yapmayın. Burası sizin LOG numaranızdır._\n" +
                "_Herhangi bir sohbette komutları deneyebilirsiniz :)_\n\n" +
                "*Botunuz sadece size özel olarak çalışmaktadır. Değiştirmek için* _setdb WORK_TYPE:public_ *komutunu kullanın.*\n\n" +
                "*Ａｌｐｈａ-Ｘ Kullandığın İçin Teşekkürler 💘*"
        } else if (Language == 'SI') {
            data = "*Ａｌｐｈａ-Ｘ පුද්ගලික ලෙස ක්‍රියා කරයි! 🚀*\n\n_කරුණාකර මෙහි විධාන උත්සාහ නොකරන්න. මෙය ඔබේ LOG අංකයයි. එය වෙනස් කිරීමට,_\n _setdb WORK_TYPE: public_ *යොදාගන්න.*\n\n*Ａｌｐｈａ-Ｘ භාවිතා කිරීම ගැන ස්තුතියි 💘*"
        } else if (Language == 'EN') {
            data = "*Ａｌｐｈａ-Ｘ ᴡᴏʀᴋɪɴɢ ᴀs ᴘʀɪᴠᴀᴛᴇ! 🚀*\n\n_ᴘʟᴇᴀsᴇ ᴅᴏ ɴᴏᴛ ᴛʀʏ ᴘʟᴜɢɪɴs ʜᴇʀᴇ. ᴛʜɪs ɪs ʏᴏᴜʀ *ʟᴏɢ ɴᴜᴍʙᴇʀ.*_\n_ʏᴏᴜ ᴄᴀɴ ᴛʀʏ ᴄᴏᴍᴍᴀɴᴅs ᴛᴏ ᴀɴʏ ᴄʜᴀᴛ :)_\n\n_*ʏᴏᴜʀ ʙᴏᴛ ᴡᴏʀᴋɪɴɢ ᴀs ᴘʀɪᴠᴀᴛᴇ. ᴛo ᴄʜᴀɴɢᴇ ɪᴛ, ᴜsᴇ*_ _setdb WORK_TYPE:public_\n\n*ᴛʜᴀɴᴋs ꜰᴏʀ ᴜsɪɴɢ Ａｌｐｈａ-Ｘ 💘*"
        } else if (Language == 'AZ') {
            data = "*Ａｌｐｈａ-Ｘ Şəxsi olaraq işləyir! 🚀*\n\n_Zəhmət olmasa burada plaginləri sınamayın. Bu sizin LOG nömrənizdir._\n_İstənilən söhbət üçün əmrləri sınaya bilərsiniz :)_\n\n*Şəxsi olaraq işləmirsən. Dəyişdirmək üçün istifadə edin:* _setdb WORK_TYPE:public_\n\n*Ａｌｐｈａ-Ｘ istifadə etdiyiniz üçün təşəkkürlər. 💘*"
        } else if (Language == 'RU') {
            data = "*Ａｌｐｈａ-Ｘ работает как частное лицо! 🚀*\n\n_Пожалуйста, не пробуйте здесь плагины. Это ваш номер ЖУРНАЛА._\n_Вы можете попробовать команды в любой чат :)_\n\n*Вы не работаете как частный. Чтобы изменить это, используйте:* _setdb WORK_TYPE:public_\n\n*Спасибо за использование Ａｌｐｈａ-Ｘ 💘*"
        } else if (Language == 'ML') {
            data = "*Ａｌｐｈａ-Ｘ സ്വകാര്യമായി പ്രവർത്തിക്കുന്നു! 🚀*\n\n_ദയവായി ഇവിടെ പ്ലഗിനുകൾ പരീക്ഷിക്കരുത്. ഇത് നിങ്ങളുടെ LOG നമ്പർ ആണ്._\n_ഏത് ചാറ്റിലേക്കും നിങ്ങൾക്ക് കമാൻഡുകൾ പരീക്ഷിക്കാം :)_\n\n*നിങ്ങൾ സ്വകാര്യമായി പ്രവർത്തിക്കുന്നില്ല. അത് മാറ്റാൻ, ഉപയോഗിക്കുക:* _setdb WORK_TYPE:public_\n\n*Ａｌｐｈａ-Ｘ ഉപയോഗിച്ചതിന് നന്ദി 💘*"
        } else if (Language == 'HI') {
            data = "*Ａｌｐｈａ-Ｘ निजी के रूप में काम कर रहा है! 🚀*\n\n_कृपया यहां प्लगइन्स का प्रयास न करें। यह आपका लॉग नंबर है।_\n_आप किसी भी चैट के लिए कमांड आज़मा सकते हैं :)_\n\n*आप निजी के रूप में काम नहीं कर रहे हैं। इसे बदलने के लिए, उपयोग करें:* _setdb WORK_TYPE:public_\n\n*Ａｌｐｈａ-Ｘ का उपयोग करने के लिए धन्यवाद 💘*"
        } else if (Language == 'ID') {
            data = "*Ａｌｐｈａ-Ｘ Bekerja sebagai Swasta! 🚀*\n\n_Tolong jangan coba plugin di sini. Ini adalah nomor LOG Anda._\n_Anda dapat mencoba perintah ke obrolan apa pun :)_\n\n*Anda tidak bekerja sebagai pribadi. Untuk mengubahnya, gunakan:* _setdb WORK_TYPE:public_\n\n*Terima kasih telah menggunakan Ａｌｐｈａ-Ｘ 💘*"
        } else if (Language == 'ES') {
            data = "*Ａｌｐｈａ-Ｘ trabajando como privado! 🚀*\n\n_No pruebes los complementos aquí. Este es su número de LOG._\n_Puedes probar comandos en cualquier chat. :)_\n\n*No estás trabajando como privado. Para cambiarlo, use:* _setdb WORK_TYPE:public_\n\n*Gracias por usar Ａｌｐｈａ-Ｘ 💘*"
        } else if (Language == 'PT') {
            data = "*Ａｌｐｈａ-Ｘ trabalhando como privado! 🚀*\n\n_Não tente plug-ins aqui. Este é o seu número de LOG._\n_Você pode tentar comandos para qualquer bate-papo :)_\n\n*Você não está trabalhando como privado. Para mudar isso, use:* _setdb WORK_TYPE:public_\n\n*Obrigado por usar o Ａｌｐｈａ-Ｘ 💘*"
        }
    } else if (type == 'public') {
        if (Language == 'TR') {
            data = "*Ａｌｐｈａ-Ｘ Public Olarak Çalışıyor! 🚀*\n\n" +
                "_Lütfen burada plugin denemesi yapmayın. Burası sizin LOG numaranızdır._\n" +
                "_Herhangi bir sohbette komutları deneyebilirsiniz :)_\n\n" +
                "*Botunuz herkese açık olarak çalışmaktadır. Bazı komutları kullanamazsınız. Değiştirmek için* _setdb WORK_TYPE:private_ *komutunu kullanın.*\n\n" +
                "*Ａｌｐｈａ-Ｘ Kullandığın İçin Teşekkürler 💘*"
        } else if (Language == 'SI') {
            data = "*Ａｌｐｈａ-Ｘ පොදු ලෙස වැඩ කරයි! 🚀*\n\n_කරුණාකර මෙහි විධාන උත්සාහ නොකරන්න. මෙය ඔබේ LOG අංකයයි. එය වෙනස් කිරීමට,* _setdb WORK_TYPE: private_ *යොදාගන්න.*\n\n*Ａｌｐｈａ-Ｘ භාවිතා කිරීම ගැන ස්තුතියි 💘*"
        } else if (Language == 'EN') {
            data = "*Ａｌｐｈａ-Ｘ ᴡᴏʀᴋɪɴɢ ᴀꜱ ᴘᴜʙʟɪᴄ! 🚀*\n\n_ᴘʟᴇᴀꜱᴇ ᴅᴏ ɴᴏᴛ ᴛʀʏ ᴘʟᴜɢɪɴꜱ ʜᴇʀᴇ. ᴛʜɪꜱ ɪꜱ ʏᴏᴜʀ *ʟᴏɢ ɴᴜᴍʙᴇʀ*._\n_ʏᴏᴜ ᴄᴀɴ ᴛʏʀ ᴄᴏᴍᴍᴀɴᴅꜱ ᴀɴʏ ᴄʜᴀᴛ :)_\n\n_*ʏᴏᴜʀ ʙᴏᴛ ᴡᴏʀᴋɪɴɢ ᴀꜱ ᴘᴜʙʟɪᴄ. ꜱᴏᴍᴇ ᴄᴏᴍᴍᴀɴᴅꜱ ʏᴏᴜ ᴄᴀɴɴᴏᴛ ᴜꜱᴇ. ᴛᴏ ᴄʜᴀɴɢᴇ ɪᴛ, ᴜꜱᴇ*_ _setdb WORK_TYPE:private_\n\n*ᴛʜᴀɴᴋꜱ ꜰᴏʀ ᴜꜱɪɴɢ Ａｌｐｈａ-Ｘ 💘*"
        } else if (Language == 'AZ') {
            data = "*Ａｌｐｈａ-Ｘ İctimai olaraq işləyir! 🚀*\n\n_Zəhmət olmasa burada plaginləri sınamayın. Bu sizin LOG nömrənizdir._\n_İstənilən söhbət üçün əmrləri sınaya bilərsiniz :)_\n\n*İctimai olaraq işləmirsiniz. İstifadə edə bilmədiyiniz bəzi əmrlər. Dəyişdirmək üçün istifadə edin:* _setdb WORK_TYPE:private_\n\n*Ａｌｐｈａ-Ｘ istifadə etdiyiniz üçün təşəkkürlər. 💘*"
        } else if (Language == 'RU') {
            data = "*Ａｌｐｈａ-Ｘ работает как общественная! 🚀*\n\n_Пожалуйста, не пробуйте здесь плагины. Это ваш номер ЖУРНАЛА._\n_Вы можете попробовать команды в любой чат :)_\n\n*Вы не работаете публично. Некоторые команды нельзя использовать. Чтобы изменить это, используйте:* _setdb WORK_TYPE:private_\n\n*Спасибо за использование Ａｌｐｈａ-Ｘ 💘*"
        } else if (Language == 'ML') {
            data = "*Ａｌｐｈａ-Ｘ പൊതുവായി പ്രവർത്തിക്കുന്നു! 🚀*\n\n_ദയവായി ഇവിടെ പ്ലഗിനുകൾ പരീക്ഷിക്കരുത്. ഇത് നിങ്ങളുടെ LOG നമ്പർ ആണ്._\n_ഏത് ചാറ്റിലേക്കും നിങ്ങൾക്ക് കമാൻഡുകൾ പരീക്ഷിക്കാം :)_\n\n*നിങ്ങൾ പൊതുവായി പ്രവർത്തിക്കുന്നില്ല. നിങ്ങൾക്ക് ഉപയോഗിക്കാൻ കഴിയാത്ത ചില കമാൻഡുകൾ. അത് മാറ്റാൻ, ഉപയോഗിക്കുക:* _setdb WORK_TYPE:private_\n\n*Ａｌｐｈａ-Ｘ ഉപയോഗിച്ചതിന് നന്ദി 💘*"
        } else if (Language == 'HI') {
            data = "*Ａｌｐｈａ-Ｘ जनता के रूप में काम कर रहा है! 🚀*\n\n_कृपया यहां प्लगइन्स का प्रयास न करें। यह आपका लॉग नंबर है।_\n_आप किसी भी चैट के लिए कमांड आज़मा सकते हैं :)_\n\n*आप जनता के रूप में काम नहीं कर रहे हैं। कुछ कमांड जिनका आप उपयोग नहीं कर सकते हैं। इसे बदलने के लिए, उपयोग करें:* _setdb WORK_TYPE:private_\n\n*Ａｌｐｈａ-Ｘ का उपयोग करने के लिए धन्यवाद 💘*"
        } else if (Language == 'ID') {
            data = "*Ａｌｐｈａ-Ｘ Bekerja sebagai Publik! 🚀*\n\n_Tolong jangan coba plugin di sini. Ini adalah nomor LOG Anda._\n_Anda dapat mencoba perintah ke obrolan apa pun :)_\n\n*Anda tidak bekerja sebagai publik. Beberapa perintah yang tidak dapat Anda gunakan. Untuk mengubahnya, gunakan:* _setdb WORK_TYPE:private_\n\n*Terima kasih telah menggunakan Ａｌｐｈａ-Ｘ 💘*"
        } else if (Language == 'ES') {
            data = "*Ａｌｐｈａ-Ｘ trabajando como público! 🚀*\n\n_No pruebes los complementos aquí. Este es su número de LOG._\n_Puedes probar comandos en cualquier chat. :)_\n\n*No estás trabajando como público. Algunos comandos no se pueden usar. Para cambiarlo, use:* _setdb WORK_TYPE:private_\n\n*Gracias por usar Ａｌｐｈａ-Ｘ 💘*"
        } else if (Language == 'PT') {
            data = "*Ａｌｐｈａ-Ｘ trabalhando como público! 🚀*\n\n_Não tente plug-ins aqui. Este é o seu número de LOG._\n_Você pode tentar comandos para qualquer bate-papo :)_\n\n*Você não está trabalhando como público. Alguns comandos você não pode usar. Para mudar isso, use:* _setdb WORK_TYPE:private_\n\n*Obrigado por usar o Ａｌｐｈａ-Ｘ 💘*"
        }
    } else {
        if (Language == 'TR') {
            data = '_Girdiğin_ *WORK_TYPE* _Anahtarı Bulunamadı!_ \n_Lütfen_ ```setdb WORK_TYPE:private``` _Yada_ ```setdb WORK_TYPE:public``` _Komutunu Kullanın!_'
        } else if (Language == 'AZ') {
            data = '_Daxil etdiyiniz_ *WORK_TYPE* _Açarı Tapılmadı!_ \n_Zəhmət olmasa_ ```setdb WORK_TYPE:private``` _və ya_ ```setdb WORK_TYPE:public``` _yazın._'
        } else if (Language == 'SI') {
            data = '*WORK_TYPE* _ඔබ ඇතුළත් කළ යතුරු පුවරුව හමු නොවීය!_ *කරුණාකර මෙලෙස යොදාගන්න >* ```setdb WORK_TYPE:private``` _හෝ_ ````setdb WORK_TYPE:public```'
        } else if (Language == 'EN') {
            data = '_The_ *WORK_TYPE* _Key You Entered Was Not Found!_ \n_Please Type_ ```setdb WORK_TYPE:private``` _Or_ ```setdb WORK_TYPE:public```'
        } else if (Language == 'RU') {
            data = '_Введенный вами ключ_ *WORK_TYP* _не найден!_ \n_Введите_ ```setdb WORK_TYPE:private``` или ```setdb WORK_TYPE:public```'
        } else if (Language == 'ML') {
            data = '_നിങ്ങൾ നൽകിയ_ *WORK_TYPE* _കീ കണ്ടെത്തിയില്ല!_ \n_ദയവായി_ ```setdb WORK_TYPE:private``` _അല്ലെങ്കിൽ_ ```setdb WORK_TYPE:public``` _എന്ന് ടൈപ്പ് ചെയ്യുക_'
        } else if (Language == 'HI') {
            data = '_आपके द्वारा दर्ज की गई_ *WORK_TYPE* _कुंजी नहीं मिली!_ \n_कृपया टाइप करें_ ```setdb WORK_TYPE:private``` या ```setdb WORK_TYPE:public```'
        } else if (Language == 'ID') {
            data = '_Kunci_ *WORK_TYPE* _yang Anda Masukkan Tidak Ditemukan!_ \n_Silakan Ketik_ ```setdb WORK_TYPE:private``` _Atau_ ```setdb WORK_TYPE:public```'
        } else if (Language == 'PT') {
            data = '_A chave_ *WORK_TYPE* _que você digitou não foi encontrada!_ \n_Digite_ ```setdb WORK_TYPE:private``` _ou_ ```setdb WORK_TYPE:public```'
        } else if (Language == 'ES') {
            data = '_¡No se encontró la clave_ *WORK_TYPE* _que ingresó!_ \n_Escriba_ ```setdb WORK_TYPE:private``` _o_ ```setdb WORK_TYPE:public```'
        }
    }
    return data;
}

module.exports = {
    worktype: worktype
}