const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let splash = null;


function newSplashScreen() {
    // We only ever want one splash screen. If we're told to make one and it already exists just focus on it
    if (splash !== null) {
        splash.focus();
        return;
    }

    // type is really only specified here some my weird i3 UI works right
    splash = new BrowserWindow({width: 800, frame: false, type: 'splash', show: false});

    // the first sign of the hackyness
    splash.loadURL(url.format({
        pathname: path.join(__dirname, '/splash/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    splash.once('ready-to-show', () => {
        splash.show();
    })

    // we have to clear our reference to the window
    splash.on('closed', () => {
        splash = null;
    });
}
app.on('ready', newSplashScreen)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
    newSplashScreen()
})