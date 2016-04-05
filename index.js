var looper;
var SCREEN_WIDTH = 3000;
var SCREEN_HEIGHT = 2000;
var canvas = document.getElementById('c');
var context = canvas.getContext('2d');

var nodes;
var NUM_NODES = 200;
var minDist = 100;
var springAmount = 0.0001;

//nodes_init();

function nodes_init() {
    createNodes();
	context.lineWidth = 1;
	looper = setInterval(nodes_loop, 1000/31);
}

function createNodes() {
	nodes = [];
	for (var i=0; i<NUM_NODES; i++) {
		var node = {
			radius: 2,
			x: Math.random()*SCREEN_WIDTH,
			y: Math.random()*SCREEN_HEIGHT,
			vx: Math.random()*1,
			vy: Math.random()*1,
			mass: 1,
			update: function() {
				this.x += this.vx;
				this.y += this.vy;
				if (this.x > SCREEN_WIDTH) {
					this.x = 0;
				} else if (this.x < 0) {
					this.x = SCREEN_WIDTH;
				}
				if (this.y > SCREEN_HEIGHT) {
					this.y = 0;
				} else if (this.y < 0) {
					this.y = SCREEN_HEIGHT;
				}
			},
			draw: function() {
				context.fillStyle = "	#696969";
				context.beginPath();
				context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
				context.closePath();
				context.fill();
			}
		};
		nodes.push(node);
	}
}

function nodes_loop() {
	context.clearRect(0, 0, canvas.width, canvas.height);
    for (i=0; i<NUM_NODES; i++) {
        nodes[i].update();
    	nodes[i].draw();
    }
	for (i=0; i<NUM_NODES-1; i++) {
		var node1 = nodes[i];
		for (var j=i+1; j<NUM_NODES; j++) {
			var node2 = nodes[j];
			spring(node1, node2);
		}
	}
}

function spring(na, nb) {
	var dx = nb.x - na.x;
	var dy = nb.y - na.y;
	var dist = Math.sqrt(dx*dx + dy*dy);
    
    //If the distance between 2 nodes are smaller than minimum, connect them
	if (dist<minDist) {
		context.beginPath();
		context.strokeStyle = "rgba(105,105,105	,"+(1-dist/minDist)+")";
		context.moveTo(na.x, na.y);
		context.lineTo(nb.x, nb.y);
		context.stroke();
		context.closePath();
		var ax = dx*springAmount;
		var ay = dy*springAmount;
		na.vx += ax;
		na.vy += ay;
		nb.vx -= ax;
		nb.vy -= ay;
	}
}