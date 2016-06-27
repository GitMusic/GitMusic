const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const config = require('./config.json');

let mainWindow;

function createWindow() {

    // require('./core/index');

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: config.developer.enabled
    });

    mainWindow.loadURL('file://' + __dirname + '/desktop/src/index.html');
    
    if (config.developer.enabled) {
        mainWindow.webContents.openDevTools({detached: true});
    }

    mainWindow.on('closed', function () {
        mainWindow = null
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});
