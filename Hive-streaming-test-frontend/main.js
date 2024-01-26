// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('node:path')
//const url = require("url");

let win;

module.exports = function getCPUusage() {
  //const cpu = process.getCPUUsage();
  setInterval(() => this.value = console.log(process.getCPUUsage().percentCPUUsage), 10000);
  //console.log("cpu",cpu);
}

function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 1000,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "/dist/browser/index.html"))
  
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();
  
    app.on("activate", function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    getCPUusage();
});


/* function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "/src/index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  // The following is optional and will open the DevTools:
  // win.webContents.openDevTools()
  win.on("closed", () => {
    win = null;
  });
} */


/* app.on("ready", createWindow);
// on macOS, closing the window doesn't quit the app */

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});