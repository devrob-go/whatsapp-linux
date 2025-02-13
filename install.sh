#!/bin/bash

# WhatsApp Web Electron App Installer for Ubuntu
# Author: Your Name
# Description: This script installs WhatsApp Web Electron App on Ubuntu

echo "🔹 Updating System..."
sudo apt update

echo "🔹 Installing Required Dependencies..."
sudo apt install -y nodejs npm git libnss3 libatk1.0-0 libx11-xcb1 libxcomposite1 libxrandr2 libasound2

echo "🔹 Installing Electron Globally..."
npm install -g electron

echo "🔹 Installing Electron Packager..."
npm install -g electron-packager

echo "🔹 Cloning the WhatsApp Web Electron Repository..."
git clone https://github.com/devrob-go/whatsapp-linux.git
cd whatsapp-linux || { echo "❌ Failed to enter directory!"; exit 1; }

echo "🔹 Installing Project Dependencies..."
npm install

echo "🔹 Building the Linux Executable..."
npm run build-linux

echo "🔹 Moving App to /opt Directory..."
sudo mv whatsapp-web-linux-x64 /opt/whatsapp-web
sudo chmod +x /opt/whatsapp-web/whatsapp-web

echo "🔹 Creating Desktop Launcher..."
cat <<EOF | sudo tee /usr/share/applications/whatsapp-web.desktop
[Desktop Entry]
Name=WhatsApp Web
Exec=/opt/whatsapp-web/whatsapp-web
Icon=/opt/whatsapp-web/resources/app/assets/icon.png
Terminal=false
Type=Application
Categories=Network;Chat;
StartupNotify=true
EOF

echo "🔹 Updating Desktop Database..."
sudo update-desktop-database

echo "🔹 Adding Auto-Start on Boot (Optional)..."
mkdir -p ~/.config/autostart
cp /usr/share/applications/whatsapp-web.desktop ~/.config/autostart/

echo "✅ Installation Complete! You can now find 'WhatsApp Web' in your Applications menu. 🚀"
