const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {

    require('./service/index');

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false
    });

    mainWindow.loadURL('file://${__dirname}/desktop/src/index.html');

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
