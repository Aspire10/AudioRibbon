var mic;

function setup(){
  createCanvas(1920,1080);
  mic = new p5.AudioIn()
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  noCursor();
}
function draw(){
  background(0);
  micLevel = mic.getLevel();
  var spectrum = fft.analyze();
  fill(7);
  stroke(7);
  rect(0,height/2, width, height/2);
  for(var i=11; i<97; i+=20/i){
	var size = (110/i)*(width/2000);
	var freq = pow(fft.getEnergy(pow(1.11,i),pow(1.11,i+1)),1.05)-(80*35/(int(i)+22))*(height/1080);
	var freqNext = pow(fft.getEnergy(pow(1.11,i+1),pow(1.11,i+2)),1.05)-(80*35/(int(i)+22))*(height/1080);
	if(freq<0) freq=0;
	if(freqNext<0) freqNext=0;
	fill(freq*1.2-80);
	strokeWeight(2);
	stroke(freq*1.1-100);
	line((i-10)*(width/86)+(.003125*width), (.6)*height-(.9*freq), (i-9)*(width/86)+(.003125*width), (.6)*height-(.9*freqNext));
	line((i-10)*(width/86)-(.003125*width), (.7)*height-(.9*freq), (i-9)*(width/86)-(.003125*width), (.7)*height-(.9*freqNext));
	if(mouseY>0 && mouseY<height){
		if(mouseX>(i-10)*(width/86)-(.0528*width) && mouseX<(i-10)*(width/86)+((1/19.2)*width)){
			line((i-10)*(width/86)+(.003125*width), (.6)*height-(.9*freq)-((((.55)*height)-mouseY)/((.45)*height))*pow((.0528*width)-abs(mouseX-(i-10)*(width/86)),2)/50, (i-10)*(width/86)-(.003125*width), (.7)*height-(.9*freq)-((((.55)*height)-mouseY)/((.45)*height))*pow((.0528*width)-abs(mouseX-(i-10)*(width/86)),2)/50);
		}else{
			line((i-10)*(width/86)+(.003125*width), (.6)*height-(.9*freq), (i-10)*(width/86)-(.003125*width), (.7)*height-(.9*freq));
		}
	}else{
		line((i-10)*(width/86)+(.003125*width), (.6)*height-(.9*freq), (i-10)*(width/86)-(.003125*width), (.7)*height-(.9*freq));
	}
	stroke(0);
	fill(micLevel*255+10);
	textSize(24);
	text("Audio Ribbon", 20, height-20);
  }
}

function mousePressed() {
  var fs = fullscreen();
  fullscreen(!fs);
}