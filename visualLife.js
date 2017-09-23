var gridArea = document.querySelector('#gridArea');

function World(){

}

function Grid(width, height){

	this.grid = new Array(width * height).fill('');
	this.width = width;
	this.height = height;

	//Generate the html elements for the grid when a grid is made
	for(let i = 1; i <= this.grid.length; i++){
		gridArea.innerHTML += `
		<div data-index="${i-1}" class="square"></div>
		${(i % this.width == 0) ? '<br>' : ''} 
		`;
	}

	//Add a listener so when the user clicks a creature is created
	gridArea.addEventListener('click', function(e){
		if(!e.target.classList.contains('square'))
			return;
		if(e.target.classList.contains('active')){
			deactivate(this.grid, e.target);
		}else{
			activate(this.grid, e.target);
		}
	}.bind(this));

}

var directions = {
	'n': new Vector(0,1),
	'ne': new Vector(1,1),
	'e': new Vector(1,0),
	'se': new Vector(1,-1),
	's': new Vector(0,-1),
	'sw': new Vector(-1,-1),
	'w': new Vector(-1,0),
	'nw': new Vector(-1,1)
}

function Vector(x, y) {
	if(typeof x == 'string'){
		this = directions[x];
	}else{
		this.x = x;
		this.y = y;
	}
}

function activate(grid, element){
	grid[parseInt(element.dataset.index, 10)] = '';
	element.classList.add('active');
}

function deactivate(grid, element) {
	grid[parseInt(element.dataset.index, 10)] = '#';
	element.classList.remove('active');
}

var g = new Grid(25,25);