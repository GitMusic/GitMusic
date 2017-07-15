const readline = require('readline');
const process = require('process');

const debug = require('./app/utils/debug');
const Player = require('./app/player');

const player = new Player();
const commands = {
    l: (...words) => {
        const query = words.join(' ');
        debug.log(debug.level.info, `Searching: ${query}`);

        // Load the first result
        player.search(query)
            .then(results => {
                debug.log(debug.level.info, `Loading: ${results[0].provider}`);

                player.load(results[0].provider, results[0].results[0].id);
            }).catch(console.log);
    },
    p: (...words) => {
        if (words.length === 0) {
            if (player.playing) {
                debug.log(debug.level.info, 'Pausing');
                player.pause();
            } else {
                debug.log(debug.level.info, 'Playing');
                player.play();
            }
        } else {
            if (!player.playing) player.play();
            commands.l.apply(null, words);
        }
    },
    s: (seconds) => {
        debug.log(debug.level.info, `Seeking: ${seconds}`);
        player.seek(seconds);
    },
    q: () => {
        debug.log('Exiting');
        process.exit();
    }
};

readline.createInterface({
    input: process.stdin,
    output: process.stdout,
}).on('line', line => {
    const [command, ...args] = line.split(' ');
    const action = commands[command];
    if (!action) {
        console.error(`Invalid command: ${command}`);
        return;
    }

    action.apply(null, args);
});