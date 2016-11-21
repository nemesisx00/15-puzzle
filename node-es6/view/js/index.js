'use strict'

let TileBoard = require('../lib/TileBoard.js')

let board

$(() => {
	board = new TileBoard()
	render()
	
	$('#resetButton').on('click', reset)
	
	//--------------------------------------------------
	
	function clickToMove()
	{
		let id = $(this).find('div').text()
		if(board.moveTile(id))
			render()
	}
	
	function reset()
	{
		$('#winMessage').hide()
		board.randomizePositions()
		render()
	}
	
	function render()
	{
		if($('.tileBoard').length < 1)
		{
			$('body').append(board.render())
		}
		else
		{
			$('.tileBoard .tiles .tileRow').remove()
			$('.tileBoard .tiles').append(board.renderTiles())
		}
		
		$('.tile').on('click', clickToMove)
		
		if(board.detectWin())
		{
			$('.tile').off('click')
			$('#winMessage').show()
		}
	}
})