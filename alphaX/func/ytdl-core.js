const ytdl = require('ytdl-core');

async function getVideoInfo(url) {

    data = await ytdl.getInfo(url);

    var output = {}
    output.title = data.videoDetails.title
    output.desc = data.videoDetails.description
    output.durationS = data.videoDetails.lengthSeconds
    output.views = data.videoDetails.viewCount
    output.uploadDate = data.videoDetails.uploadDate
    output.authorName = data.videoDetails.author.name
    output.url = data.videoDetails.video_url
    data.videoDetails.thumbnails.forEach(t => output.thumb = t.url)

    return output;

}

async function getSong(url) {

    data = await ytdl.getInfo(url);
    data.formats.forEach(yt => {

        if (!yt.hasVideo && yt.hasAudio && yt.container == "mp4") {

            db = [];
            db.push(yt);

            var output = {};
            db.forEach(data => {
                output.url = data.url
            });

            return output;

        }
    })

}

async function getVideo(url) {

    data = await ytdl.getInfo(url);
    var db = [];
    var output = {};

    data.formats.forEach(yt => {
        if (yt.hasVideo && yt.hasAudio) {
            db.push(yt);
        }
    });

    var data = Object.assign({}, db);
    output.hdvideo = data['0'];
    output.medium = data['1'];

    return output;
}