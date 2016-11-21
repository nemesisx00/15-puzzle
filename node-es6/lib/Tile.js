'use strict';

let sprintf = require('sprintf')

let tileHtml = `<div id="tile-%s" class="tile">
	<div class="noSelect">%s</div>
</div>`

class Tile
{
	constructor(id, text)
	{
		this.id = id
		this.text = text
	}
	
	render()
	{
		let out = sprintf(tileHtml, this.id, this.text)
		return out
	}
}

module.exports = Tile
