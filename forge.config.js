const { FusesPlugin } = require('@electron-forge/plugin-fuses')
const { FuseV1Options, FuseVersion } = require('@electron/fuses')
const path = require('node:path')

module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.join(__dirname, 'favicon.ico'), // 应用程序图标（必须为 .ico 格式）
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        author: 'Joe <leanbrown@live.cn>',
        description: 'ID card verification',
        name: 'form-client',
        setupIcon: path.join(__dirname, 'favicon.ico'), // 安装程序图标（必须为 .ico 格式）
        loadingGif: path.join(__dirname, 'installing.gif'), // 安装时的加载动画
        // 用于自动更新的远程发布地址, 此处为空字符串，表示未启用
        shortcutName: 'form-client',
        remoteReleases: '',
        setupExe: 'form-client-setup.exe',
        // 启用桌面快捷方式
        createDesktopShortcut: true,  // 是否创建桌面快捷方式（true 表示启用）
        createStartMenuShortcut: true, // 是否创建开始菜单快捷方式（true 表示启用）
        // 可选：禁用开始菜单快捷方式
        // skipUpdateIcon: true,
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
}
