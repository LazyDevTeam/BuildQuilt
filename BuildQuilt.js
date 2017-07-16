var w = window.innerWidth * 0.75, h = window.innerWidth * 0.75;
var tw = 16, th = 16;
var patterns = new Array(8);


var sp = 0;
var rotation = 0;
var rotateImg = new Image();
rotateImg.src = "BuildQuilt.rotate.icon.png";
var area=document.createElement('div');
area.style.height='90vh';
area.style.overflowY='scroll';
for (var i = patterns.length - 1; i >= 0; i--) {
	console.log("Loading image id "+i)
	patterns[i] = new Image();
	patterns[i].src = "BuildQuilt.pattern."+i+".png";
	console.log("Loaded")
	console.log("Adding to screen");
	patterns[i].style.margin = "8pt";
	patterns[i].style.border = "1px solid black"
	patterns[i].id = i;
	patterns[i].onclick = function(){rotation=0;console.log("Selected Pattern: ID "+this.id); sp = parseInt(this.id);}.bind(patterns[i]);
	area.appendChild(patterns[i]);
	area.appendChild(document.createElement("br"));
	console.log("Done adding tiles.")
}
document.body.appendChild(area)
rotateImg.style.margin = "18pt";
rotateImg.style.border = "1px solid black"
rotateImg.style.position = "absolute";
rotateImg.style.right = 0;
rotateImg.style.bottom = 0;
rotateImg.onclick = function(){console.log("Rotation: "+(rotation+=1)%4);}
document.body.appendChild(rotateImg);

console.log("Initializing Canvas...")
var canvas = document.createElement("Canvas");
var context = canvas.getContext('2d');
canvas.style.border = "1px solid black"
canvas.style.position = "absolute"
canvas.style.right = "18pt"
canvas.style.top = "18pt"
canvas.style.width = w+"px"
canvas.style.height = h+"px"
canvas.style.border = '12px solid black'
canvas.width = w;
canvas.height = h;
function clear(){
	console.log("Cleared canvas!")
	context.fillStyle='white';
	context.fillRect(0,0,canvas.width,canvas.height);
	for(var i = 0; i < tw; i++){
		for(var j = 0; j < th; j++){
			context.lineWidth = 2;
			context.strokeRect(i*(w/tw),j*(h/th),w/tw,h/th);
		}
	}
}
document.body.appendChild(canvas);
clear();
console.log("Longest part! ")

canvas.onclick = function(e){
	var rect = canvas.getBoundingClientRect();
	var x = e.clientX - rect.left - tw;
	var y = e.clientY - rect.top - th;
	var xOnGrid = parseInt(x/(w/tw));
	var yOnGrid = parseInt(y/(h/th));
	context.save();
	context.translate((xOnGrid)*(w/tw)+((w/tw)/2),(yOnGrid)*(h/th)+(w/th)/2);
	context.rotate(Math.PI / 2 * rotation);
	context.drawImage(patterns[sp],-(w/tw)/2,-(w/th)/2,w/tw,h/th);
	context.restore();
	console.log("Clicked tile - ("+xOnGrid+", "+yOnGrid+")");
};

console.log("Done setting up canvas functions");

window.onmousemove = function(e){e.preventDefault();}

console.log("Loaded!")

function saveQuilt(){
	return canvas.toDataURI();
}

var a, a2;
function saveButton(){
	var button = document.createElement('button');
	button.innerHTML = ("Save Quilt");
	a = document.createElement('a');
	a.download = "quilt.png";
	a.href='javascript:saveQuilt();'
	a.appendChild(button);
	document.body.appendChild(a);
	button.addEventListener('mousemove',function(){
		a.href=canvas.toDataURL();
	});
	button.style.position = "absolute";
	button.style.right = 0;
	button.style.top = 0;
};
saveButton();
function clearBTN(){
	var button2 = document.createElement('button');
	button2.innerHTML = ("Clear");
	a2 = document.createElement('a');
	a2.download = "quilt.png";
	a2.onclick=clear;
	a2.appendChild(button2);
	document.body.appendChild(a2);
	button2.style.position = "absolute";
	button2.style.right = '50.05vw';
	button2.style.top = 0;
};
clearBTN()
