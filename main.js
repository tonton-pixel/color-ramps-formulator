//
const electron = require ('electron');
const { app, BrowserWindow, dialog, globalShortcut, ipcMain, Menu, shell } = electron;
//
let mainWindow = null;
//
const gotTheLock = app.requestSingleInstanceLock ();
if (!gotTheLock)
{
    app.quit ();
}
else
{
    app.on
    (
        'second-instance',
        (event, commandLine, workingDirectory) =>
        {
            if (mainWindow)
            {
                if (mainWindow.isMinimized ())
                {
                    mainWindow.restore ();
                }
                mainWindow.show ();
            }
        }
    );
    //
    // Share settings with the renderer process
    global.settings = require ('./settings.json');
    //
    if (!settings.accelerated)
    {
        app.disableHardwareAcceleration ();
    }
    //
    const fs = require ('fs');
    const os = require ('os');
    const path = require ('path');
    //
    // const extractString = "Extract Palette";
    const applyString = "Apply Color Map";
    //
    const appPackaged = app.isPackaged;
    //
    const appName = app.name;
    const appVersion = app.getVersion ();
    const appDate = (appPackaged ? fs.statSync (process.resourcesPath).ctime : new Date ()).toISOString ();
    //
    let appDirname = app.getAppPath ();
    let unpackedDirname = `${appDirname}.unpacked`;
    if (!fs.existsSync (unpackedDirname))
    {
        unpackedDirname = appDirname;
    };
    //
    function showAboutBox (menuItem, browserWindow, event)
    {
        let options =
        {
            type: 'info',
            message: `${appName}`,
            detail: `${settings.description}\n${settings.copyright}\n\nVersion: ${appVersion}\nDate: ${appDate}`,
            buttons: [ "OK" ]
        };
        dialog.showMessageBox ((process.platform === 'darwin') ? null : browserWindow, options);
    }
    //
    let licenseWindow = null;
    //
    function showLicense (menuItem, browserWindow, event)
    {
        if (browserWindow === mainWindow)
        {
            if (!licenseWindow)
            {
                licenseWindow = new BrowserWindow
                (
                    {
                        title: `License | ${appName}`,
                        width: 384,
                        height: (process.platform !== 'darwin') ? 480 : 540,
                        minimizable: false,
                        maximizable: false,
                        resizable: false,
                        fullscreenable: false,
                        parent: browserWindow,
                        modal: true,
                        show: false,
                        webPreferences:
                        {
                            contextIsolation: false,
                            devTools: false
                        }
                    }
                );
                if (process.platform !== 'darwin')
                {
                    licenseWindow.removeMenu ();
                }
                licenseWindow.loadFile (path.join (__dirname, 'license-index.html'));
                licenseWindow.once ('ready-to-show', () => { licenseWindow.show (); });
                licenseWindow.on ('close', () => { licenseWindow = null; });
            }
            else
            {
                licenseWindow.show ();
            }
        }
    }
    //
    function getSystemInfo ()
    {
        const infos =
        [
            "-- Application --",
            "",
            [ "Name", appName ],
            [ "Version", appVersion ],
            [ "Date", appDate ],
            "",
            [ "Locale", app.getLocale () ],
            [ "Packaged", app.isPackaged ],
            "",
            "-- Framework --",
            "",
            [ "System Version", process.getSystemVersion () ],
            [ "Platform", process.platform ],
            [ "Architecture", process.arch ],
            [ "Default App", process.defaultApp || false ],
            [ "Mac App Store App", process.mas || false ],
            [ "Windows Store App", process.windowsStore || false ],
            [ "Electron Version", process.versions.electron ],
            [ "Node Version", process.versions.node ],
            [ "V8 Version", process.versions.v8 ],
            [ "Chromium Version", process.versions.chrome ],
            [ "ICU Version", process.versions.icu ],
            [ "Unicode Version", process.versions.unicode ],
            // [ "CLDR Version", process.versions.cldr ],
            // [ "Time Zone Version", process.versions.tz ],
            "",
            "-- Operating System --",
            "",
            [ "OS Type", os.type () ],
            [ "OS Platform", os.platform () ],
            [ "OS Release", os.release () ],
            [ "CPU Architecture", os.arch () ],
            [ "CPU Endianness", os.endianness () ],
            [ "CPU Logical Cores", os.cpus ().length ],
            [ "CPU Model", os.cpus ()[0].model ],
            [ "CPU Speed (MHz)", os.cpus ()[0].speed ]
        ];
        return infos.map (info => (Array.isArray (info) ? `${info[0]}: ${info[1]}` : info) + "\n").join ("");
    }
    //
    let systemInfoWindow = null;
    //
    function showSystemInfo (menuItem, browserWindow, event)
    {
        if (browserWindow === mainWindow)
        {
            if (!systemInfoWindow)
            {
                systemInfoWindow = new BrowserWindow
                (
                    {
                        title: `System Info | ${appName}`,
                        width: 480,
                        height: (process.platform !== 'darwin') ? 640 : 675,
                        minimizable: false,
                        maximizable: false,
                        resizable: false,
                        fullscreenable: false,
                        parent: browserWindow,
                        modal: true,
                        show: false,
                        webPreferences:
                        {
                            contextIsolation: false,
                            devTools: false
                        }
                    }
                );
                if (process.platform !== 'darwin')
                {
                    systemInfoWindow.removeMenu ();
                }
                systemInfoWindow.loadFile (path.join (__dirname, 'system-info-index.html'));
                const script = `document.body.querySelector ('.system-info').value = ${JSON.stringify (getSystemInfo ())};`;
                systemInfoWindow.webContents.on ('dom-ready', () => { systemInfoWindow.webContents.executeJavaScript (script); });
                systemInfoWindow.once ('ready-to-show', () => { systemInfoWindow.show (); });
                systemInfoWindow.on ('close', () => { systemInfoWindow = null; });
            }
            else
            {
                systemInfoWindow.show ();
            }
        }
    }
    //
    let defaultWidth;
    let defaultHeight;
    //
    function resetWindow ()
    {
        if (mainWindow.isFullScreen ())
        {
            shell.beep ();
        }
        else
        {
            if (mainWindow.isMaximized ())
            {
                mainWindow.unmaximize ();
            }
            mainWindow.setSize (defaultWidth, defaultHeight);
            mainWindow.center ();
            if (mainWindow.isMinimized ())
            {
                mainWindow.restore ();
            }
        }
    }
    //
    const darwinAppMenu =
    {
        label: appName,
        submenu:
        [
            { label: `About ${appName}...`, click: showAboutBox },
            { type: 'separator' },
            { role: 'services', submenu: [ ] },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    };
    const appMenu =
    {
        label: settings.shortAppName,
        submenu:
        [
            { role: 'quit' }
        ]
    };
    const editMenu =
    {
        label: "Edit",
        submenu:
        [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectall' }
        ]
    };
    const fileMenu =
    {
        label: "File",
        submenu:
        [
            { label: "Load Formula...", accelerator: 'CommandOrControl+L', click: () => { mainWindow.webContents.send ('load-formula'); } },
            { label: "Save Formula...", accelerator: 'CommandOrControl+S', click: () => { mainWindow.webContents.send ('save-formula'); } },
            { type: 'separator' },
            {
                label: "Import",
                id: 'import',
                submenu:
                [
                    { label: "Color Ramp (.json)...", click: () => { mainWindow.webContents.send ('import-color-ramp', 'json'); } },
                    { label: "Color Ramp (.tsv)...", click: () => { mainWindow.webContents.send ('import-color-ramp', 'tsv'); } },
                    { type: 'separator' },
                    { label: "Color Table (.act)...", click: () => { mainWindow.webContents.send ('import-color-table'); } },
                    { label: "Curves Map (.amp)...", click: () => { mainWindow.webContents.send ('import-curves-map'); } },
                    { label: "Lookup Table (.lut)...", click: () => { mainWindow.webContents.send ('import-lookup-table'); } }
                ]
            },
            {
                label: "Export",
                id: 'export',
                enabled: false,
                submenu:
                [
                    { label: "Color Ramp (.json)...", click: () => { mainWindow.webContents.send ('export-color-ramp', 'json'); } },
                    { label: "Color Ramp (.tsv)...", click: () => { mainWindow.webContents.send ('export-color-ramp', 'tsv'); } },
                    { type: 'separator' },
                    { label: "Color Table (.act)...", click: () => { mainWindow.webContents.send ('export-color-table'); } },
                    { label: "Curves Map (.amp)...", click: () => { mainWindow.webContents.send ('export-curves-map'); } },
                    { label: "Lookup Table (.lut)...", click: () => { mainWindow.webContents.send ('export-lookup-table'); } },
                    { type: 'separator' },
                    { label: "Gradient (.grd)...", click: () => { mainWindow.webContents.send ('export-gradient'); } }
                ]
            }
        ]
    };
    const viewMenu =
    {
        label: "View",
        submenu:
        [
            { label: "Scroll to Top", accelerator: 'CommandOrControl+T', click: () => { mainWindow.webContents.send ('scroll-to-top'); } },
            { label: "Scroll to Bottom", accelerator: 'CommandOrControl+B', click: () => { mainWindow.webContents.send ('scroll-to-bottom'); } },
            { type: 'separator' },
            { label: "Actual Size", accelerator: 'CommandOrControl+0', click: () => { mainWindow.webContents.send ('reset-zoom'); } },
            { label: "Zoom In", accelerator: 'CommandOrControl+Plus', click: () => { mainWindow.webContents.send ('zoom-in'); } },
            { label: "Zoom Out", accelerator: 'CommandOrControl+-', click: () => { mainWindow.webContents.send ('zoom-out'); } },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    };
    const imageMenu =
    {
        label: "Image",
        submenu:
        [
            // {
            //     label: `${extractString}...`,
            //     accelerator: 'CommandOrControl+P',
            //     click: () => { mainWindow.webContents.send ('extract-palette', extractString) }
            // },
            {
                label: `${applyString}...`,
                id: 'apply',
                enabled: false,
                accelerator: 'CommandOrControl+Y',
                click: () => { mainWindow.webContents.send ('apply-color-map', applyString) }
            }
        ]
    };
    const developerMenu =
    {
        label: "Developer",
        submenu:
        [
            { role: 'reload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { label: "Open User Data Directory", click: () => { shell.openPath (app.getPath ('userData')); } },
            { label: "Open Temporary Directory", click: () => { shell.openPath (app.getPath ('temp')); } },
            { type: 'separator' },
            { label: "Show Executable File", click: () => { shell.showItemInFolder (app.getPath ('exe')); } }
        ]
    };
    const darwinWindowMenu =
    {
        role: 'window',
        submenu:
        [
            { role: 'close' },
            { role: 'minimize' },
            { role: 'zoom' },
            { type: 'separator' },
            { label: "Reset to Default", accelerator: 'CommandOrControl+D', click: () => { resetWindow (); } },
            { type: 'separator' },
            { role: 'front' }
        ]
    };
    const windowMenu =
    {
        label: "Window",
        submenu:
        [
            { role: 'minimize' },
            { role: 'close' },
            { type: 'separator' },
            { label: "Reset to Default", accelerator: 'CommandOrControl+D', click: () => { resetWindow (); } }
         ]
    };
    const darwinHelpMenu =
    {
        role: 'help',
        submenu:
        [
            { label: "License...", click: showLicense },
            { label: "System Info...", click: showSystemInfo },
            { type: 'separator' },
            { label: "Documentation", click: () => { shell.openPath (path.join (unpackedDirname, 'doc', 'index.html')); } },
            { label: "Gallery of Examples", click: () => { mainWindow.webContents.send ('open-examples-gallery'); } },
            { label: "Lists of Color Names", click: () => { mainWindow.webContents.send ('open-color-names'); } },
            { type: 'separator' },
            { label: settings.repository.label, click: () => { shell.openExternal (settings.repository.URL); } },
            { label: settings.releases.label, click: () => { shell.openExternal (settings.releases.URL); } }
        ]
    };
    const helpMenu =
    {
        label: 'Help',
        submenu:
        [
            { label: "About...", click: showAboutBox },
            { label: "License...", click: showLicense },
            { label: "System Info...", click: showSystemInfo },
            { type: 'separator' },
            { label: "Documentation", click: () => { shell.openPath (path.join (unpackedDirname, 'doc', 'index.html')); } },
            { label: "Gallery of Examples", click: () => { mainWindow.webContents.send ('open-examples-gallery'); } },
            { label: "Lists of Color Names", click: () => { mainWindow.webContents.send ('open-color-names'); } },
            { type: 'separator' },
            { label: settings.repository.label, click: () => { shell.openExternal (settings.repository.URL); } },
            { label: settings.releases.label, click: () => { shell.openExternal (settings.releases.URL); } }
        ]
    };
    //
    let menuTemplate = [ ];
    menuTemplate.push ((process.platform === 'darwin') ? darwinAppMenu : appMenu);
    menuTemplate.push (fileMenu);
    menuTemplate.push (editMenu);
    menuTemplate.push (viewMenu);
    menuTemplate.push (imageMenu);
    if ((!appPackaged) || settings.developerFeatures)
    {
        menuTemplate.push (developerMenu);
    }
    menuTemplate.push ((process.platform === 'darwin') ? darwinWindowMenu : windowMenu);
    menuTemplate.push ((process.platform === 'darwin') ? darwinHelpMenu : helpMenu);
    //
    let menu;
    //
    function onAppReady ()
    {
        menu = Menu.buildFromTemplate (menuTemplate);
        Menu.setApplicationMenu (menu);
        //
        ipcMain.on
        (
            'enable-output-menus',
            (event, enabled) =>
            {
                menu.getMenuItemById ('export').enabled = enabled;
                menu.getMenuItemById ('apply').enabled = enabled;
                Menu.setApplicationMenu (menu); // Shouldn't be necessary, but...
            }
        );
        //
        const Storage = require ('./lib/storage.js');
        const mainStorage = new Storage ('main-preferences');
        //
        defaultWidth = settings.window.defaultWidth;
        defaultHeight = settings.window.defaultHeight;
        //
        const defaultPrefs =
        {
            windowBounds:
            {
                width: defaultWidth,
                height: defaultHeight
            }
        };
        let prefs = mainStorage.get (defaultPrefs);
        let windowBounds = prefs.windowBounds;
        //
        const windowOptions =
        {
            center: true,
            x: windowBounds.x,
            y: windowBounds.y,
            width: windowBounds.width,
            height: windowBounds.height,
            minWidth: settings.window.minWidth,
            minHeight: settings.window.minHeight,
            backgroundColor: settings.window.backgroundColor,
            show: !settings.window.deferredShow,
            webPreferences:
            {
                contextIsolation: false,
                nodeIntegration: true,
                enableRemoteModule: true,
                spellcheck: false
            }
        };
        if (process.platform === 'linux')
        {
            windowOptions.icon = path.join (__dirname, 'icons', 'icon-256.png');
        }
        mainWindow = new BrowserWindow (windowOptions);
        //
        mainWindow.loadFile (path.join (__dirname, 'renderer', 'index.html'));
        //
        mainWindow.webContents.on ('new-window', (event) => { event.preventDefault (); }); // Prevent openening of a new window by window.open ()
        mainWindow.webContents.on ('will-navigate', (event) => { event.preventDefault (); }); // Inhibit drag-and-drop of URL on window
        //
        mainWindow.once ('close', () => { mainStorage.set ({ windowBounds: mainWindow.getBounds () }); });
        //
        mainWindow.once ('closed', () => { if (process.platform === 'darwin') { app.hide (); } app.quit (); });
        //
        ipcMain.on ('show-window', () => { mainWindow.show (); });
        //
        if (settings.escapeExitsFullScreen)
        {
            ipcMain.on
            (
                'exit-full-screen',
                () =>
                {
                    if (mainWindow.isFullScreen ())
                    {
                        mainWindow.setFullScreen (false);
                    }
                    else
                    {
                        // shell.beep ();
                    }
                }
            );
        }
        //
        if (settings.hotKey)
        {
            // Set hot key
            globalShortcut.register (settings.hotKey, () => { mainWindow.show (); });
        }
    }
    //
    app.once ('ready', onAppReady);
}
//
