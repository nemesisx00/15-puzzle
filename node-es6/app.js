'use strict';

let electron = require('electron')
let app = electron.app
let Window = require('./lib/Window.js')

let window
app.on('ready', () => {
	window = new Window()
})

app.on('window-all-closed', () => {
	if(process.platform !== 'darwin')
		app.quit()
})

app.on('activate', () => {
	if(window === null)
		window = new Window()
})
