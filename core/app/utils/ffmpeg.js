const tarball = require('tarball-extract');
const request = require('request');
const progress = require('request-progress');
const fs = require('fs');
const config = require('../../../config.json');

module.exports = {


    getffmpegBinaryPath() {
        let base = `${__dirname}/../../bin/ffmpeg`;
        switch(process.platform) {
            case 'linux':
                return `${base}/linux/ia32/ffmpeg`;
            case 'darwin':
                return `${base}/linux/ia32/ffmpeg`;
            case 'win32':
                return `${base}/win32/ia32/ffmpeg.exe`;
            default:
                return null;
        }
    },

    ffmpegDownloader() {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(this.getffmpegBinaryPath())) {
                console.log("ffmpeg already downloaded!");
                resolve();
                return;
            }
            let ffmpeg = `ffmpeg-${process.platform}.tgz`;
            let url = `https://github.com/${config.ffmpeg.user}/${config.ffmpeg.repo}/releases/download/${config.ffmpeg.tag}/${ffmpeg}`;
            progress(request.get(url))
                .on('progress', (state) => {
                    console.log(state);
                })
                .on('error', (err) => {
                    reject(err)
                })
                .pipe(fs.createWriteStream(ffmpeg))
                .on('close', () => {
                    tarball.extractTarball(ffmpeg, `${__dirname}/../../bin`, (err) => {
                        err && reject(err);
                        fs.unlink(ffmpeg, (err) => {
                            err && reject(err);
                            !err && resolve();
                        });
                    })
                });
        })

    }
};