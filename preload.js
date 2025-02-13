const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notifications enabled");
        }
    });

    // Capture notification clicks
    navigator.serviceWorker?.addEventListener("notificationclick", (event) => {
        event.notification.close();
        ipcRenderer.send("notification-clicked");
    });
});
