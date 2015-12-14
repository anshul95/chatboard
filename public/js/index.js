window.onload = function() {
	var myCanvas = document.getElementById("myCanvas");
	var ctx = myCanvas.getContext("2d");
    
	$("#erase_all").on('click', function(){
		ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
	});

    // Fill Window Width and Height
    myCanvas.width = 900;
	myCanvas.height = 500;
	
	console.log(myCanvas.width);
	console.log(myCanvas.height);

	// Set Background Color
    // ctx.fillStyle="#fff";
    // ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
	
    // Mouse Event Handlers
	if(myCanvas){
		var BB=myCanvas.getBoundingClientRect();
		var offsetX=BB.left+233;
		var offsetY=BB.top+33;   
		var isDown = false;
		var canvasX, canvasY;
		ctx.lineWidth = 5;
		

		$(myCanvas)
		.mousedown(function(e){

			// console.log(e.clientY);
			isDown = true;
			ctx.beginPath();
			canvasX = e.clientX - offsetX;
			canvasY = e.clientY - offsetY;
			ctx.moveTo(canvasX, canvasY);
		})
		.mousemove(function(e){
			if(isDown !== false) {
				canvasX = e.clientX - offsetX;
				canvasY = e.clientY - offsetY;
				ctx.lineTo(canvasX, canvasY);
				ctx.strokeStyle = "#000";
				ctx.stroke();
			}
		})
		.mouseup(function(e){
			isDown = false;
			ctx.closePath();
		});
	}
	
	// Touch Events Handlers
	draw = {
		started: false,
		start: function(evt) {

			ctx.beginPath();
			ctx.moveTo(
				evt.touches[0].clientX,
				evt.touches[0].clientY
			);

			this.started = true;

		},
		move: function(evt) {

			if (this.started) {
				ctx.lineTo(
					evt.touches[0].clientX,
					evt.touches[0].clientY
				);

				ctx.strokeStyle = "#000";
				ctx.lineWidth = 5;
				ctx.stroke();
			}

		},
		end: function(evt) {
			this.started = false;
		}
	};
	
	// Touch Events
	myCanvas.addEventListener('touchstart', draw.start, false);
	myCanvas.addEventListener('touchend', draw.end, false);
	myCanvas.addEventListener('touchmove', draw.move, false);
	
	// Disable Page Move
	document.body.addEventListener('touchmove',function(evt){
		evt.preventDefault();
	},false);

};