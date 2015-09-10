//analogTimer

var startingPoint,
	breakPoint, 
	elapsedTime,
	secIntervalID,
	minIntervalID;
	
var startButton = document.getElementById("start"),
	pauseButton = document.getElementById("pause");
	
drawDial();

startButton.onclick = function (){
//start

	startButton.disabled = true;
	pauseButton.disabled = false;
	document.getElementById('js-elapsed-time').innerHTML = "";
	startingPoint = Date.now();
	
//for second hands
	var canvasSec = document.getElementById("canvasSecClockHands");
	var contextSec = canvasSec.getContext("2d");
	var i = 0;
	
//for minute hands
	var canvasMin = document.getElementById("canvasMinClockHands");
	var contextMin = canvasMin.getContext("2d");
	var k = 0;

	function reDrawSecClockHands(){
		contextSec.clearRect(0,0,200,200);
		contextSec.beginPath();
		contextSec.moveTo(100, 100);
		contextSec.lineTo( Math.round(100 + 90*Math.cos( Math.PI * i / 30 - (Math.PI / 2) )),  Math.round(100 + 90*Math.sin( Math.PI * i / 30 - (Math.PI / 2) )));
		contextSec.strokeStyle = "black";
		contextSec.stroke();
		contextSec.closePath();
		i+=0.016;
	}
				
	function reDrawMinClockHands(){
		contextMin.clearRect(0,0,200,200);
		contextMin.beginPath();
		contextMin.moveTo(100,100);
		contextMin.lineTo( Math.round(100 + 50*Math.cos( Math.PI * k / 30 - (Math.PI / 2) + Math.PI*k/360)),  Math.round(100 + 50*Math.sin( Math.PI * k / 30 - (Math.PI / 2) + Math.PI*k/360)));
		contextMin.strokeStyle = "black";
		contextMin.stroke();
		contextMin.closePath();
		k+=0.016;
	}
					
	secIntervalID = setInterval(reDrawSecClockHands, 1000/60);
					
	setTimeout(reDrawMinClockHands, 0);
				
	minIntervalID = setInterval(reDrawMinClockHands, 1000);
//end
}
				
pauseButton.onclick = function(){
//start
	pauseButton.disabled = true;
	startButton.disabled = false;
	breakPoint = Date.now();
	elapsedTime = (breakPoint - startingPoint) / 1000;
	clearInterval(secIntervalID);
	clearInterval(minIntervalID);
	//alert("Elapsed time: " + elapsedTime + " sec.");
	if( isNaN(elapsedTime) ){
		document.getElementById('js-elapsed-time').innerHTML = 0 + " sec";
	} else {
		document.getElementById('js-elapsed-time').innerHTML = elapsedTime + " sec";
	}
//end
}
				
	function drawDial(){
		var canvas = document.getElementById("canvasClock");
		var context = canvas.getContext("2d");
		//circle
		context.beginPath();
		context.arc(100, 100, 100, 0, Math.PI * 2, true);
		context.strokeStyle = "#000";
		context.stroke();
		context.closePath();
		var canvasSec = document.getElementById("canvasSecClockHands");
		var contextSec = canvasSec.getContext("2d");
		contextSec.beginPath();
		contextSec.moveTo(100, 100);
		contextSec.lineTo( 100,  10);
		contextSec.strokeStyle = "black";
		contextSec.stroke();
		contextSec.closePath();
	}
	
