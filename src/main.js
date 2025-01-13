const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
import contextMenu from 'electron-context-menu'; // Using ESM

// Set up the context menu
contextMenu({
  prepend: (params, browserWindow) => [
    {
      label: 'Rainbow',
      // Only show when right-clicking images
      visible: params.mediaType === 'image',
    },
  ],
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow; // Declare globally to manage the main window

// Function to create a new browser window
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
    },
  });

  mainWindow.setAlwaysOnTop(true, 'screen-saver');
  mainWindow.setVisibleOnAllWorkspaces(true);

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Uncomment to open DevTools
  // mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  // macOS-specific behavior: Re-create a window if none exist when the app is activated
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit the app when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Listen for IPC messages to create new windows
ipcMain.on('new-window', () => {
  createWindow();
});
