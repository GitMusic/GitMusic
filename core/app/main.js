const WebSocketServer = require('ws').Server;

const Player = require('./player');
const providers = require('./providers');
const util = require('./utils/ffmpeg');
const debug = require('./utils/debug');
const config = require('../../config.json');
const errors = require('./errors.json');

const player = new Player(util.getffmpegBinaryPath());


const wss = new WebSocketServer({
    port: config.server.port
});

const commands = {
    'search': (args) => new Promise((resolve, reject) => {
        if (!args.query) {
            reject(errors.NO_QUERY_PROVIDED);
        } else {
            const query = args.query;
            debug.log(debug.level.info, `Searching: ${query}`);
            providers.search(query).then(songs => resolve(songs));
        }

    }),

    'play': (args) => {
        return new Promise((resolve, reject) => {
            if (!args.source || !args.song) {
                reject(errors.NO_SONG_PROVIDED);
                return;
            }

            // if (player.getLoadedSong !== args.song) {
            //     if (player.playing) {
            //         player.stop();
            //     }
            //     player.load(args.source, args.song);
            // }

            player.load(args.source, args.song);
            if (player.playing) {
                debug.log(debug.level.info, 'Pausing');
                player.pause();
            } else {
                debug.log(debug.level.info, 'Playing');
                player.play();
            }

            wss.clients.forEach(client => {
                client.reply('play', args, {
                    'success': `song ${args.song} is now ${player.playing ? 'playing' : 'paused'}`
                })
            });
            resolve();
        });

    },
    'seek': (args) => {
        debug.log(debug.level.info, `Seeking: ${seconds}`);
        player.seek(args.time);
    },
    // 'previous': {
    //    player.previous();
    // },
    // 'next': () => {
    //     player.next();
    // },
    // 'queue': (song) => {
    //     player.queue(song);
    // },
    'quit': () => {
        debug.log(debug.level.warning, 'Exiting');
        wss.clients.forEach((client) => {
            client.send(JSON.stringify({
                command: 'quit'
            }));
        });
        process.exit();
    }
};


wss.on('connection', (ws) => {
    debug.log(debug.level.info, `New connection from ${ws.upgradeReq.connection.remoteAddress}`);

    ws.reply = (command, arguments, results) => ws.send(JSON.stringify({
        command: command,
        arguments: arguments,
        results: results
    }));

    ws.error = (code, message) => ws.send(JSON.stringify({
        error: true,
        code: code,
        message: message
    }));

    ws.on('message', (message) => {
        debug.log(debug.level.info, `Message "${message}" recieved from ${ws.upgradeReq.connection.remoteAddress}`);
        try {
            message = JSON.parse(message);
            if (message.command) {
                debug.log(debug.level.info, `Command "${message.command}" received from ${ws.upgradeReq.connection.remoteAddress}`);
                if (message.arguments) {
                    debug.log(debug.level.info, "Command arguments:");
                    debug.log(debug.level.info, message.arguments)
                }

                commands[message.command](message.arguments || {}).then(
                    results => {
                        results && ws.reply(message.command, message.arguments, results);
                        debug.log(debug.level.info, results);
                    },
                    error =>  {
                        ws.error(error.code, error.message);
                        debug.log(debug.level.warning, error);
                    }
                );

            }
        } catch (error) {
            if (!(error instanceof TypeError)) {
                ws.error(errors.UNKNOWN.code, errors.UNKNOWN.message);
                debug.log(debug.level.error, error);
            } else {
                ws.error(errors.COMMAND_NOT_FOUND.code, errors.COMMAND_NOT_FOUND.message);
                debug.log(debug.level.warning, errors.COMMAND_NOT_FOUND);
            }
        }
    }).on('error', (error) => {
        debug.log(debug.level.info, error)
    });
}).on('error', () => {
    //TODO: somehow display an error loading application
});