require('./app/utils/ffmpeg').ffmpegDownloader().then(() => require('./app/main')).catch(err => console.log(err));
