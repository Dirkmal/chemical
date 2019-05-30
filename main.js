const { app, BrowserWindow, Menu, ipcMain, Notification }  = require('electron');
const url = require('url');
const path = require('path');
const Store = require('electron-store');
const store = new Store();

const keys = {
  API_URL: 'api_url',
}
const signals = {
  GET_API_URL: 'getApiUrl',
  SET_API_URL: 'setApiUrl',
  NAVIGATE: 'navigateTo'
}

const routes = {
  HOME: 'home',
  NEW_PATIENT: 'newp',
  NEW_REPORT: 'create_report',
  VIEW_PATIENTS: 'allp',
  VIEW_REPORTS: 'allr',
  TESTS: 'tests'
}
let main_window, settings_window, icon_path;

function initialize () {
  if (process.platform === 'darwin') {
    icon_path = path.join(__dirname, `dist/chemical/assets/icons/mac.icns`);
  } else {
    icon_path = path.join(__dirname, `dist/chemical/assets/icons/win.ico`);
  }

  createMainWindow();
}

function setItem(key, value) {
  store.set(key, value);
}

function getItem(item_key) {
  return store.get(item_key) || null
}

function deleteItem(item_key) {
  store.delete(item_key);
}

function sendSignal(signal_name, value) {
  main_window.send(signal_name, value);
}

const main_menu_template = [
  {},
  {
    label: 'GoTo',
    submenu: [
      {
        label: 'Home',
        click() {
          sendSignal(signals.NAVIGATE, routes.HOME);
        }
      },
      {
        label: 'Tests',
        click() {
          sendSignal(signals.NAVIGATE, routes.TESTS);
        }
      }
    ]
  },
  {
    label: 'Patient',
    submenu: [
      {
        label: 'Add Patient',
        click() {
          sendSignal(signals.NAVIGATE, routes.NEW_PATIENT);
        }
      },
      {
        label: 'View Patients',
        click() {
          sendSignal(signals.NAVIGATE, routes.VIEW_PATIENTS)
        }
      }
    ]
  },
  {
    label: 'Report',
    submenu: [
      {
        label: 'Create Report',
        click() {
          sendSignal(signals.NAVIGATE, routes.NEW_REPORT);
        }
      },
      {
        label: 'View Reports'
      }
    ]
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Open New Window',
        click() {
          createMainWindow();
        }
      }
    ]
  },
  {
    label: 'Settings',
    submenu: [
      {
        label: 'Set Address to Default',
        click() {
          deleteItem(API_URL);
        }
      },
      {
        label: 'Change Address',
        click() {
          createSettingsWindow();
        }
      }
    ],
  },
  {
    label: 'Dev Tools',
    submenu: [
      {
        label: 'Toggle',
        click() {
          main_window.webContents.toggleDevTools();
        }
      }
    ]
  },
  {
    label: 'Exit',
    submenu: [
      {
        label: 'Quit',
        click() {
          app.quit();
        }
      }
    ]
  }
]
const main_menu = Menu.buildFromTemplate(main_menu_template);

function createMainWindow() {
  main_window = new BrowserWindow({
    width: 1000,
    height: 1000,
    resizable: true,
    title: 'Chemical Pathology Reports System',
    icon: icon_path
  });

  main_window.loadURL(url.format({
    pathname: path.join(__dirname, `/dist/chemical/index.html`),
    protocol: 'file:',
    slashes: true
  }));
  Menu.setApplicationMenu(main_menu);

  main_window.on('closed', () => {
    main_window = null;
  });
}

function createSettingsWindow() {
  settings_window = new BrowserWindow({
    width: 200,
    height: 200,
    resizable: false,
    title: 'Settings Window'
  });

  settings_window.loadURL(url.format({
    pathname: path.join(__dirname, `/dist/chemical/assets/serverconfig.html`),
    protocol: 'file',
    slashes: true
  }));

  settings_window.on('closed', () => {
    settings_window = null;
  })
}

app.on('ready', initialize);

app.on('window-all-closed', () => {
  app.quit()
});

ipcMain.on(signals.GET_API_URL, function(event) {
  event.returnValue = getItem(keys.API_URL);
});

ipcMain.on(signals.SET_API_URL, function(event, args) {
  setItem(keys.API_URL, args);
  // sendSignal('success', 'Server Address Changed. Please restart the app');
  noti = new Notification('Success', {body: 'Server address changed. Please restart the app'});
  noti.show();
});
