const electron = require('electron')
const app = electron.app;
// const autoUpdater = require("electron-updater").autoUpdater;
// Module to control application life.
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// Module to allow for file path functions
const path = require('path');
const url = require('url');
const {globalShortcut} = require('electron');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
// autoUpdater.checkForUpdatesAndNotify()
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 650,
    show: false,
    backgroundColor: '#E73C7E',
    //titleBarStyle: 'customButtonsOnHover', 
    frame: false
  });
  globalShortcut.register('CommandOrControl+O', () => {
    mainWindow.webContents.openDevTools();
  });
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  // mainWindow.once('ready-to-show', () => {
  // })
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  mainWindow.show()
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    console.log("Closed");
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  createWindow()
  // autoUpdater.checkForUpdates();
});

// autoUpdater.on('update-downloaded', (info) => {
//   autoUpdater.quitAndInstall();  
// });

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Disbales menu bar
electron.app.on('browser-window-created',function(e,window) {
  window.setMenu(null);
});


// var child = require('child_process').execFile;
// var executablePath = "C:\\Program Files\\OpenVPN\\bin\\openvpn.exe";
// var parameters = ["C:\\Program Files\\SchoolVPNClient\\resources\\resources\\client.ovpn"];

// child(executablePath, parameters, function(err, data) {
//   //  console.log(err);
//   //  console.log(data.toString());
// });