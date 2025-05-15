const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        "author": "Joe <leanbrown@live.cn>",
        "description": "ID card verification",
        name: "阳光表单验证",
        setupIcon: "./favicon.ico", // 安装程序图标（必须为 .ico 格式）
        // loadingGif: "path/to/loading.gif", // 安装时的加载动画（可选）
        // 用于自动更新的远程发布地址, 此处为空字符串，表示未启用
        remoteReleases: "",
        setupExe: "阳光表单验证-Setup.exe",
        // 启用桌面快捷方式
        createDesktopShortcut: true,  // 是否创建桌面快捷方式（true 表示启用）
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
};
