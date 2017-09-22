var plan = 
["####################",
"#     #     #   o  #",
"#     #            #",
"###       #        #",
"#                  #",
"#    #    o        #",
"#    #             #",
"######         #####",
"#              #####",
"####################"];
 
var directions = {
	"n": new Vector(0, 1),
	"ne": new Vector(1, 1),
	"e": new Vector(0, 1),
	"se": new Vector(1,-1),
	"s": new Vector(0, -1),
	"sw": new Vector(-1, -1),
	"w": new Vector(-1, 0),
	"nw": new Vector(-1, 1)
}
//Takes in a legend and a single character and returns the constructor associated with it
function elementFromChar(legend, ch) {
	if(ch == " ") return null;
	var element = new legend[ch]();
	element.originChar = ch;
	return element;
}
//Uses the originChar property assigned in elementFromChar to return a character
function charFromElement(element){
	if(element == null) return " ";
	return element.originChar;
}

function World(map, legend){
	//Create a grid with a width of the size of the first string
	var grid = new Grid(map[0].length, map.length);
	this.grid = grid;
	this.legend = legend;

	//Populate grid with elements from map
	map.forEach(function (line, y) {
		for(let x = 0; x < line.length; x++){
			grid.set(new Vector(x,y), elementFromChar(legend, line[x]));
		}
	});

	this.toString = function() {
		var output = "";
		for (var y = 0; y < this.grid.height; y++) {
			for (var x = 0; x < this.grid.width; x++) {
				let element = this.grid.get(new Vector(x, y));
				output += charFromElement(element);
			}
			output += "\n";
		}
		return output;
	};
}

function Grid(width, height){
	//Declare an array and fill it with false values
	this.space = new Array(width * height);

	//Declare the width and height of the grid
	this.width = width;
	this.height = height;

	//Returns true if the vector is in the bounds of the grid
	this.isInside = function(vector){
		return vector.x >= 0 && vector.x <= this.width &&
		vector.y >= 0 && vector.y <= this.height;
	}
	//Returns the value at the vector in the grid
	this.get = function(vector){
		return this.space[vector.x + vector.y * this.width];
	}
	//Sets the value at the grid
	this.set = function (vector, value){
		this.space[vector.x + vector.y * this.width] = value;
	}
}
function Vector(x,y){
	this.x = x;
	this.y = y;
	this.print = function(){
		console.log(`X: ${this.x}, Y: ${this.y}`);
	}
	this.plus = function(other){
		return new Vector(this.x + other.x, this.y + other.y);
	}
}
function randomElement(array){
	return array[Math.floor(Math.random() * array.length)];
}

var directionNames = "n ne e se s sw w nw".split(" ");
function BouncingCritter() {
	this.direction = randomElement(directionNames)
	this.act = function(view) {
		if (view.look(this.direction) != " ") {
			this.direction = view.find(" ") || "s";
		}
		return {type: "move", direction: this.direction};
	}
}

function Wall(){}
let world = new World(plan, {"#": Wall, "o": BouncingCritter});
console.log(world.toString());



// this.updateHTML = function() {
// 	gridArea.querySelectorAll('div').forEach((n,i) => {
// 		n.dataset.alive = this.space[i];
// 		if(this.space[i].alive) n.classList.add('alive');
// 		else n.classList.remove('alive');
// 	});
// }
// let html = '';
// console.log()
// this.space.forEach((value, i) => {
// 	html += `<div data-x="${i % this.width}" data-y="${Math.floor(i / this.width)}" data-alive="${value}" class="square"></div>`;
// 	if (!((i + 1) % this.width)) html += '<br>';
// });
// gridArea.innerHTML = html;
// this.updateHTML();
// gridArea.addEventListener('click', function(e){
// 	if(!e.target.classList.contains('square')) return;
// 	this.set(new Vector(e.target.dataset.x, e.target.dataset.y), true);
// }.bind(this));
