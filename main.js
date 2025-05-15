const { Menu, app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const fs = require('node:fs')

if (require('electron-squirrel-startup')) {
  app.quit()
}

// 获取 package.json 的路径
const packageJsonPath = path.join(__dirname, 'package.json')
// 读取并解析 package.json 文件
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

Menu.setApplicationMenu(null) // 隐藏菜单栏

const createWindow = () => {
  const win = new BrowserWindow({
    width: 880,
    height: 660,
    resizable: false, // 禁止调整窗口大小
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
  // win.loadURL('http://localhost:5173/')

  // 仅在开发模式下打开开发者工具
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools()
  }
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  ipcMain.handle('appVersionPing', () => packageJson.version)
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})