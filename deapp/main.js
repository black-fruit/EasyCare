const { app, dialog } = require('electron')

const fs = require('fs')
const Module = require('module')
const path = require('path')
const url = require('url')

const { setDefaultApplicationMenu } = require('./menu')

// Parse command line options.
const argv = process.argv.slice(1)

const option = {
  file: null,
  noHelp: Boolean(process.env.ELECTRON_NO_HELP),
  version: null,
  webdriver: null,
  modules: []
}

let nextArgIsRequire = false

for (const arg of argv) {
  if (nextArgIsRequire) {
    option.modules.push(arg)
    nextArgIsRequire = false
    continue
  } else if (arg === '--version' || arg === '-v') {
    option.version = true
    break
  } else if (arg.match(/^--app=/)) {
    option.file = arg.split('=')[1]
    break
  } else if (arg === '--interactive' || arg === '-i' || arg === '-repl') {
    option.interactive = true
  } else if (arg === '--test-type=webdriver') {
    option.webdriver = true
  } else if (arg === '--require' || arg === '-r') {
    nextArgIsRequire = true
    continue
  } else if (arg === '--abi' || arg === '-a') {
    option.abi = true
    continue
  } else if (arg === '--no-help') {
    option.noHelp = true
    continue
  } else if (arg[0] === '-') {
    continue
  } else {
    option.file = arg
    break
  }
}

if (nextArgIsRequire) {
  console.error('Invalid Usage: --require [file]\n\n"file" is required')
  process.exit(1)
}

// Quit when all windows are closed and no other one is listening to this.
app.on('window-all-closed', () => {
  if (app.listeners('window-all-closed').length === 1 && !option.interactive) {
    app.quit()
  }
})

// Create default menu.
app.once('ready', () => {
  setDefaultApplicationMenu()
})

// Set up preload modules
if (option.modules.length > 0) {
  Module._preloadModules(option.modules)
}

function loadApplicationPackage (packagePath) {
  // Add a flag indicating app is started from default app.
  Object.defineProperty(process, 'defaultApp', {
    configurable: false,
    enumerable: true,
    value: true
  })

  try {
    // Override app name and version.
    packagePath = path.resolve(packagePath)
    const packageJsonPath = path.join(packagePath, 'package.json')
    let appPath
    if (fs.existsSync(packageJsonPath)) {
      let packageJson
      try {
        packageJson = require(packageJsonPath)
      } catch (e) {
        showErrorMessage(`Unable to parse ${packageJsonPath}\n\n${e.message}`)
        return
      }

      if (packageJson.version) {
        app.setVersion(packageJson.version)
      }
      if (packageJson.productName) {
        app.setName(packageJson.productName)
      } else if (packageJson.name) {
        app.setName(packageJson.name)
      }
      app.setPath('userData', path.join(app.getPath('appData'), app.getName()))
      app.setPath('userCache', path.join(app.getPath('cache'), app.getName()))
      appPath = packagePath
    }

    try {
      const filePath = Module._resolveFilename(packagePath, module, true)
      app.setAppPath(appPath || path.dirname(filePath))
    } catch (e) {
      showErrorMessage(`Unable to find Electron app at ${packagePath}\n\n${e.message}`)
      return
    }

    // Run the app.
    Module._load(packagePath, module, true)
  } catch (e) {
    console.error('App threw an error during load')
    console.error(e.stack || e)
    throw e
  }
}

function showErrorMessage (message) {
  app.focus()
  dialog.showErrorBox('Error launching app', message)
  process.exit(1)
}

function loadApplicationByUrl (appUrl) {
  require('./default_app').load(appUrl)
}

function startRepl () {
  if (process.platform === 'win32') {
    console.error('Electron REPL not currently supported on Windows')
    process.exit(1)
  }

  const repl = require('repl')
  repl.start('> ').on('exit', () => {
    process.exit(0)
  })
}

// Start the specified app if there is one specified in command line, otherwise
// start the default app.
if (option.file && !option.webdriver) {
  const file = option.file
  const protocol = url.parse(file).protocol
  const extension = path.extname(file)
  if (protocol === 'http:' || protocol === 'https:' || protocol === 'file:' || protocol === 'chrome:') {
    loadApplicationByUrl(file)
  } else if (extension === '.html' || extension === '.htm') {
    loadApplicationByUrl(url.format({
      protocol: 'file:',
      slashes: true,
      pathname: path.resolve(file)
    }))
  } else {
    loadApplicationPackage(file)
  }
} else if (option.version) {
  console.log('v' + process.versions.electron)
  process.exit(0)
} else if (option.abi) {
  console.log(process.versions.modules)
  process.exit(0)
} else if (option.interactive) {
  startRepl()
} else {
  if (!option.noHelp) {
    const welcomeMessage = `
Electron ${process.versions.electron} - Build cross platform desktop apps with JavaScript, HTML, and CSS
Usage: electron [options] [path]

A path to an Electron app may be specified. It must be one of the following:
  - index.js file.
  - Folder containing a package.json file.
  - Folder containing an index.js file.
  - .html/.htm file.
  - http://, https://, or file:// URL.

Options:
  -i, --interactive     Open a REPL to the main process.
  -r, --require         Module to preload (option can be repeated).
  -v, --version         Print the version.
  -a, --abi             Print the Node ABI version.`

    console.log(welcomeMessage)
  }

  const indexPath = path.join(__dirname, '/index.html')
  loadApplicationByUrl(url.format({
    protocol: 'file:',
    slashes: true,
    pathname: indexPath
  }))
}
