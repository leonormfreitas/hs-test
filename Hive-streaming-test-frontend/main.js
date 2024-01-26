// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, IpcMessageEvent } = require('electron')
const path = require('node:path')
//const url = require("url");


function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 1000,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "/dist/browser/index.html"))
  
    // Open the DevTools.
    //mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // ipcMain.handle('getCPUusage', handleCPUusage)

    createWindow();
  
    app.on("activate", function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    /* setInterval(() => {
      this.cpuUsage = process.getCPUUsage().percentCPUUsage;
      console.log(this.cpuUsage);
    }, 10000); */
});


/* app.on("ready", createWindow);
// on macOS, closing the window doesn't quit the app */

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/* ipcMain.on('getCPUusage', (event, args) => {
  event.reply('getCPUusageResponse', {
      data: [
          {
              cpuUsage: process.getCPUUsage().percentCPUUsage
          }
      ]
  });
}); */
/* ipcMain.on('ping', (event) => {
  event.sender.send('pong');
}); */