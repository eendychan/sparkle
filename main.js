const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: true,
    title: "Sparkle",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true // Включаем легкие webview для вкладок
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  // Поддержка расширений Chrome (.crx или распакованных папок)
  // Для добавления расширения достаточно указать путь к нему:
  // session.defaultSession.loadExtension('/path/to/unpacked/extension');

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
