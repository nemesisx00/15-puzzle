'use strict'

let _ = require('underscore')
let {BrowserWindow, Menu} = require('electron')
let path = require('path')
let url = require('url')

let defaultIndex = '../view/index.html';

let defaultOptions = {
	width: 250,
	height: 300
}

let requiredOptions = {
	center: true,
	fullscreen: false,
	fullscreenable: false,
	maximizable: false,
	resizable: false
}

let menuTemplate = [
	{
		label: 'File',
		submenu: [
			/*
			{
				label: 'Toggle Developer Tools',
				accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
				click (item, focusedWindow) {
					if(focusedWindow)
						focusedWindow.webContents.toggleDevTools()
				}
			},
			*/
			{ role: 'close' }
		]
	}
]

class Window
{
	constructor(page, options)
	{
		let opts = Object.assign({}, defaultOptions, options, requiredOptions)
		
		let loadUrl = page
		if(!loadUrl)
			loadUrl = url.format({
				pathname: path.join(__dirname, defaultIndex).replace(/\\/g, '/'),
				protocol: 'file:',
				slashes: true
			})
		
		this.options = opts
		
		this.mainWindow = new BrowserWindow(opts)
		this.mainWindow.loadURL(loadUrl)
		this.mainWindow.on('closed', this.destroy)
		this.mainWindow.on('ready-to-show', () => {
			console.log('ready!')
		})
		
		let menu = Menu.buildFromTemplate(menuTemplate)
		Menu.setApplicationMenu(menu)
	}
	
	show()
	{
		if(this.mainWindow)
			this.mainWindow.show()
	}
	
	destroy()
	{
		this.mainWindow = null
	}
}

module.exports = Window
