const readline = require('readline');
const process = require('process');

const debug = require('./app/utils/debug');
const Player = require('./app/player');

const player = new Player();
const commands = {
    'l': (...words) => {
        const query = words.join(' ');
        console.log(`Searching: ${query}`);

        // Load the first result
        player.search(query)
            .then(results => {
                debug.log(debug.level.info, results);
                return results[0].id;
            })
            .then((id) => {
                debug.log(debug.level.info, `Loading: ${query}`);
                player.load(id);
            });
    },
    'p': (...words) => {
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
    's': (seconds) => {
        debug.log(debug.level.info, `Seeking: ${seconds}`);
        player.seek(seconds);
    },
    'q': () => {
        console.log('Exiting');
        process.exit();
    }
};

const rl = readline.createInterface({
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

if (process.argv.length > 2) {
    commands.p.apply(null, process.argv.slice(2));
}
