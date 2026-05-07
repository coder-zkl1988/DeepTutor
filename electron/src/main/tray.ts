// Derived from DeepTutor (Apache 2.0) — modified for HappyOwl desktop shell.
import { Tray, Menu, nativeImage, app, BrowserWindow } from "electron";
import log from "electron-log";

let tray: Tray | null = null;

export function createTray(mainWindow: BrowserWindow): Tray {
  // Create a simple 16x16 icon
  const size = 16;
  const icon = nativeImage.createFromBuffer(
    Buffer.alloc(size * size * 4, 0x4caf50ff), // Green color (RGBA)
    { width: size, height: size },
  );

  tray = new Tray(icon.resize({ width: 16, height: 16 }));
  tray.setToolTip("HappyOwl");

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open HappyOwl",
      click: () => {
        mainWindow.show();
        mainWindow.focus();
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  tray.on("double-click", () => {
    mainWindow.show();
    mainWindow.focus();
  });

  log.info("System tray created");
  return tray;
}

export function destroyTray(): void {
  if (tray) {
    tray.destroy();
    tray = null;
  }
}
