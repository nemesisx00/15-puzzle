'use strict'

let _ = require('underscore')
let {BrowserWindow, Menu} = require('electron')
let path = require('path')
let url = require('url')

let defaultIndex = '../view/index.html';
let aboutPath = '../view/about.html';

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
		
		this.setupMenu()
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
	
	setupMenu()
	{
		let self = this
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
			},
			{
				label: 'Help',
				role: 'help',
				submenu: [
					{
						role: 'about',
						click() {
							let child = new BrowserWindow({
								parent: self.mainWindow,
								width: 500,
								height: 250,
								fullscreen: false,
								fullscreenable: false,
								minimizable: false,
								maximizable: false,
								resizable: false,
								autoHideMenuBar: true
							})
							child.loadURL(url.format({
								pathname: path.join(__dirname, aboutPath).replace(/\\/g, '/'),
								protocol: 'file:',
								slashes: true
							}))
							child.show()
						}
					}
				]
			}
		]
		
		let menu = Menu.buildFromTemplate(menuTemplate)
		Menu.setApplicationMenu(menu)
	}
}

module.exports = Window
