## 🚀 WhatsApp Web Electron App

A lightweight, standalone desktop app for WhatsApp Web using Electron. No need for a browser—just open the app and start chatting!

## 🎯 Features

✅ Dedicated WhatsApp App – No need for a web browser
✅ System Tray Support – Runs in the background like native apps
✅ Desktop Notifications – Get message alerts directly on Linux
✅ Auto Start on Boot (optional) – Opens automatically when you start your PC
✅ Smooth Tray Icon – Clean, optimized icon for better visibility
✅ Fast & Lightweight – Uses minimal system resources

## 📦 Installation (One Command Setup)

Just run this command in your terminal:
```
bash <(curl -s https://raw.githubusercontent.com/devrob-go/whatsapp-linux/main/install.sh)
```
This will install the app automatically, create a desktop shortcut, and enable system tray support. 🚀

---

## 🔧 Manual Installation

If you prefer manual installation, follow these steps:

### 1️⃣ Install Dependencies
```
sudo apt update && sudo apt install -y nodejs npm git
npm install -g electron-packager
```

### 2️⃣ Clone the Repository
```
git clone https://github.com/devrob-go/whatsapp-linux.git
cd whatsapp-linux
```

### 3️⃣ Install Project Dependencies
```
npm install
```

### 4️⃣ Build the App
```
npm run build-linux
```

### 5️⃣ Move to /opt Directory
```
sudo mv whatsapp-web-linux-x64 /opt/whatsapp-web
sudo chmod +x /opt/whatsapp-web/whatsapp-web
```

### 6️⃣ Create a Desktop Shortcut
```
cat <<EOF | sudo tee /usr/share/applications/whatsapp-web.desktop
[Desktop Entry]
Name=WhatsApp
Exec=/opt/whatsapp-web/whatsapp-web
Icon=/opt/whatsapp-web/resources/app/assets/icon.png
Terminal=false
Type=Application
Categories=Network;Chat;
StartupNotify=true
EOF
```

### 7️⃣ Update System Database
```
sudo update-desktop-database
```

### 8️⃣ Enable Auto-Start (Optional)
```
mkdir -p ~/.config/autostart
cp /usr/share/applications/whatsapp-web.desktop ~/.config/autostart/
```

### 🚀 How to Run the App?

After installation, you can launch the app from:

🔹 Applications Menu → Search for "WhatsApp Web"
🔹 Terminal → Run:
```
/opt/whatsapp-web/whatsapp-web
```

### 🛠️ Uninstalling the App

To remove the app completely, run:
```
rm -rf /opt/whatsapp-web
rm -f ~/.config/autostart/whatsapp-web.desktop
sudo rm -f /usr/share/applications/whatsapp-web.desktop
sudo update-desktop-database
```

### 🌍 Supported Platforms

✅ Ubuntu 20.04+
✅ Debian-based Linux distros
📜 License

🔹 This project is open-source and available under the MIT License.

### 💡 Contribute
Want to improve the app? Pull requests are welcome! 🎉