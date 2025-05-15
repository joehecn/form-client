
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 暴露 package.json 的 version 字段
  ping: () => ipcRenderer.invoke('ping'),
  appVersionPing: () => ipcRenderer.invoke('appVersionPing'),
  // 除函数之外，我们也可以暴露变量
})
