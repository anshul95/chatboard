$(document).ready(function(){
	var myCanvas = document.getElementById("myCanvas");
	var ctx = myCanvas.getContext("2d");
	var color = '#000000';
	var brush_size = 4;
    
	$("#erase_all").on('click', function(){
		ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
	});

	$("#color_tray>div").on('click', function(){
		color = $(this).data('color');
		brush_size = $(this).data('size');
	});

    // Fill Window Width and Height
    if(window.innerWidth > 1000){
	    myCanvas.width = 900;
		myCanvas.height = 500;
	}else{
	    myCanvas.width = window.innerWidth - 38;
		myCanvas.height = 500;
	}

	$('#board').on('shown.bs.modal', function (e) {
		if(myCanvas){
			var BB=myCanvas.getBoundingClientRect();
			var offsetX=BB.left;
			var offsetY=BB.top;   
			var isDown = false;
			var canvasX, canvasY;

			$(myCanvas)
			.mousedown(function(e){
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
					ctx.strokeStyle = color;
					ctx.lineWidth = brush_size;
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

					ctx.strokeStyle = color;
					ctx.lineWidth = brush_size;
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

	});
});
