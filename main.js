const { app, BrowserWindow, Menu, Notification, session, Tray, nativeImage } = require('electron');
const path = require('path');

let win;
let tray;

const gotTheLock = app.requestSingleInstanceLock(); // Prevent multiple instances

if (!gotTheLock) {
    app.quit(); // Quit if another instance is already running
} else {
    app.on('second-instance', () => {
        if (win) {
            if (win.isMinimized()) win.restore();
            win.show();
        }
    });

    app.whenReady().then(() => {
        createWindow();
        createTray();
    });
}

function createWindow() {
    win = new BrowserWindow({
        width: 1400,
        height: 800,
        icon: path.join(__dirname, 'assets/icon.png'), // Set WhatsApp icon
        webPreferences: {
            nodeIntegration: false
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
            win.hide(); // Hide instead of closing
        }
    });
}

// Create system tray with a smooth icon
function createTray() {
    if (tray) return; // Prevent duplicate tray icons

    let trayIcon = nativeImage.createFromPath(path.join(__dirname, 'assets/icon_tray.png'))
        .resize({ width: 24, height: 24 });

    tray = new Tray(trayIcon);

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Open', click: () => win.show() },
        { label: 'Quit', click: () => { app.isQuiting = true; app.quit(); } }
    ]);

    tray.setToolTip('WhatsApp');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        win.show(); // Restore window on tray icon click
    });
}
