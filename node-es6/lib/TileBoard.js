'use strict'

let _ = require('underscore')
let sprintf = require('sprintf')
let MathUtils = require('./MathUtils.js')
let Tile = require('./Tile.js')

let maxTiles = 15

let htmlTemplate = `<div class="tileBoard">
	<div class="tiles">%s</div>
	<div class="controls">
		<div id="resetButton" class="button">
			<span>Reset</span>
		</div>
	</div>
</div>`

let tileRowStart = '<div class="tileRow">'
let tileRowEnd = '</div>'

let emptyId = 'blank'
let possibleMoves = [-1, 1, -4, 4]

class TileBoard
{
	constructor()
	{
		this.tiles = []
		
		this.generateBoard()
	}
	
	render()
	{
		let out = sprintf(htmlTemplate, this.renderTiles())
		return out
	}
	
	renderTiles()
	{
		let tileHtml = ''
		let length = this.tiles.length
		for(let i = 0; i < length; i++)
		{
			if(i % 4 == 0)
			{
				if(tileHtml.length > 0)
					tileHtml += tileRowEnd
				tileHtml += tileRowStart
			}
			
			let tile = this.tiles[i]
			tileHtml += tile.render()
		}
		tileHtml += tileRowEnd
		
		return tileHtml
	}
	
	detectWin()
	{
		for(let i = 0; i < maxTiles; i++)
		{
			let tile = this.tiles[i]
			if(tile.id !== i)
				return false
		}
		return true
	}
	
	moveTile(tileIndex)
	{
		let i = this.tiles.indexOf(_.findWhere(this.tiles, { text: parseInt(tileIndex) }))
		if(_.isNumber(i) && i >= 0 && i < this.tiles.length)
		{
			for(let move of possibleMoves)
			{
				let moveIndex = i + move
				if(this.tiles[moveIndex] && this.tiles[moveIndex].id === emptyId)
				{
					this.swapTiles(i, moveIndex)
					return true
				}
			}
		}
		
		return false
	}
	
	swapTiles(index1, index2)
	{
		let temp = this.tiles[index1]
		if(temp && this.tiles[index2])
		{
			this.tiles[index1] = this.tiles[index2]
			this.tiles[index2] = temp
		}
	}
	
	generateBoard()
	{
		while(this.tiles.length < maxTiles)
		{
			let i = this.tiles.length
			let tile = new Tile(i, i + 1)
			this.tiles.push(tile)
		}
		
		this.tiles.push(new Tile(emptyId, ''))
		
		this.randomizePositions()
	}
	
	randomizePositions()
	{
		this.tiles = _.shuffle(this.tiles)
	}
	
	generateNextPosition()
	{
		let position = MathUtils.generateRandomNumber() % maxTiles
		if(_.findWhere(this.tiles, {position: position}))
			position = this.generateNextPosition()
		return position
	}
}

module.exports = TileBoard
