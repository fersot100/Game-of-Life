const gridArea = document.querySelector('#gridArea');
let playing = false;
function Grid(width, height){

	this.map = new Array(width * height).fill('');
	this.width = width;
	this.height = height;

	this.play = function(){
		if (playing){
			this.turn();
			setTimeout(this.play.bind(this), 500);
		}
		
	}

	this.clear = function() {
		this.map.fill();
		console.log(this.htmlNodes.length)
		this.htmlNodes.forEach(e => {
			deactivate(this.map, e);
		});
	}

	this.turn = function(){
		console.log('Turn');
		this.map.forEach((e,i) => {
			let pos = this.itov(i);
			let neighbors = 0;
			for (let dir in directions){
				let check = pos.plus(dir);
				if(this.map[this.vtoi(check)] == '#')
					neighbors++;
			}
			
			if(e == '#'){
				if(neighbors < 2 || neighbors > 3){
					deactivate(this.map, this.htmlNodes[i]);
					console.log('Deactivate', i);
				}	
			}else {
				if(neighbors == 3){
					activate(this.map, this.htmlNodes[i]);
					console.log('Activate', i)
				}	
			}
		});
	}

	this.itov = function (i) {
		return new Vector(i % this.width, Math.floor(i / this.width));
	}
	this.vtoi = function (vector){
		return vector.x + vector.y * this.width;
	}
	this.getValue = function (vector){
		return this.map[vector.x + vector.y * this.width];
	}

	this.setValue = function (vector, value){
		this.map[vector.x + vector.y * this.width] = value;
	}

	//Generate the html elements for the grid when a grid is made
	for(let i = 1; i <= this.map.length; i++){
		gridArea.innerHTML += `
		<div data-index="${i-1}" class="square"></div>
		${(i % this.width == 0) ? '<br>' : ''} 
		`;
	}

	this.htmlNodes = gridArea.querySelectorAll('.square');
	//Add a listener so when the user clicks a creature is created
	gridArea.addEventListener('click', function(e){
		if(!e.target.classList.contains('square'))
			return;
		if(e.target.classList.contains('active')){
			deactivate(this.map, e.target);
		}else{
			activate(this.map, e.target);
		}
	}.bind(this));


}

function Vector(x, y) {
	if(typeof x == 'string'){
		return directions[x];
	}else{
		this.x = x;
		this.y = y;
		this.plus = function(v){
			return new Vector(
				this.x + v.x,
				this.y + v.y
				);
		}
	}
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

function activate(grid, element){
	grid[parseInt(element.dataset.index, 10)] = '';
	element.classList.add('active');
}

function deactivate(grid, element) {
	grid[parseInt(element.dataset.index, 10)] = '#';
	element.classList.remove('active');
}

var g = new Grid(25,25);

document.querySelector('#play').addEventListener('click',e => {
	
	if(!playing){
		playing = true;
		g.play();
		e.target.innerText = 'Stop'
	}else{
		e.target.innerText = 'Play'
		playing = false;
	}

});
document.querySelector('#clear').addEventListener('click', e=> {
	g.clear();
})
