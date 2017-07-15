const readline = require('readline');
const process = require('process');

const debug = require('./app/utils/debug');
const Player = require('./app/player');

const player = new Player();

let songs = {};
let loaded = false;

const commands = {
    search: (...words) => {
        const query = words.join(' ');
        debug.log(debug.level.info, `Searching: ${query}`);
        loaded = false;

        // Load the first result
        player.search(query)
            .then(results => {
                loaded = true;
                songs = results;
                console.log(songs);
            }).catch(console.log);
    },
    queue: (index) => {
        player.queue(songs[index].provider, songs[index].id);
    },
    pp: (index) => {
        if (!player.loaded) {
            player.load(songs[index].provider, songs[index].id);
        } else {
            player.playing ? player.pause() : player.play();
        }

    },
    seek: (seconds) => {
        debug.log(debug.level.info, `Seeking: ${seconds}`);
        player.seek(seconds);
    },
    next: () => {
        player.next();
    },
    previous: () => {
        player.previous();
    },
    exit: () => {
        debug.log(debug.level.info, 'Exiting');
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