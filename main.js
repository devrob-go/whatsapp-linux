const { app, BrowserWindow, Menu, Notification, session, Tray, nativeImage, ipcMain } = require('electron');
const path = require('path');

let win;
let tray;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (win) {
            if (win.isMinimized()) win.restore();
            win.show();
            win.focus();
        }
    });

    app.whenReady().then(() => {
        createWindow();
        createTray();
    });
}

ipcMain.on('notification-clicked', () => {
    if (win) {
        win.show();
        win.setSkipTaskbar(false); // Ensure it's not hidden
        win.setAlwaysOnTop(true); // Bring it to the front
        win.setAlwaysOnTop(false); // Reset so it's normal
        win.focus();
    }
});

function createWindow() {
    win = new BrowserWindow({
        width: 1400,
        height: 800,
        icon: path.join(__dirname, 'assets/icon.png'),
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js') // Ensure this is loaded
        }
    });

    Menu.setApplicationMenu(null);
    win.setMenuBarVisibility(false);

    win.webContents.setUserAgent(
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
        if (permission === 'notifications') {
            callback(true);
        } else {
            callback(false);
        }
    });

    win.loadURL('https://web.whatsapp.com');

    win.on('close', (event) => {
        if (!app.isQuiting) {
            event.preventDefault();
            win.hide();
        }
    });
}

function createTray() {
    if (tray) return;

    let trayIcon = nativeImage.createFromPath(path.join(__dirname, 'assets/icon_tray.png'))
        .resize({ width: 24, height: 24 });

    tray = new Tray(trayIcon);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Open', click: () => {
                if (win) {
                    if (win.isMinimized()) win.restore();
                    win.show();
                    win.focus();
                }
            }
        },
        { label: 'Quit', click: () => { app.isQuiting = true; app.quit(); } }
    ]);

    tray.setToolTip('WhatsApp');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        if (win) {
            if (win.isMinimized()) win.restore();
            win.show();
            win.focus();
        }
    });
}
