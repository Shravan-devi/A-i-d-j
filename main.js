song = "";

function preload()
{
	song = loadSound("music.mp3");
}

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

score_riht_wrist=0;
score_left_wrist= 0;
function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}


function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

    score_left_wrist= results[0].pose.keypoints[9].score;
	score_right_wrist= results[0].pose.keypoints[10].score;
  }
}

function draw() {
	image(video, 0, 0, 600, 500);
	fill("#FF0000");
	stroke("#FF0000");
	if(score_right_wrist>0.2){
		circle(rightWristX,rightWristY,20);
		if(rightWristY>0 && rightWristY<=100){
			document.getElementById("speed").innerHTML= "0.5x speed";
			song.rate(0.5);
		}
		else if(rightWristY>100 && rightWristY<=200){
			document.getElementById("speed").innerHTML="1x speed";
			song.rate(1.0);
		}
		else if(rightWristY>200 && rightWristY<=300){
			document.getElementById("speed").innerHTML="1.5x speed";
			song.rate(1.5);
		}
		else if(rightWristY>300 && rightWristY<=400){
			document.getElementById("speed").innerHTML= "2x speed";
			song.rate(2.0);
		}
		else if(rightWristY>400 && rightWristY<=500){
			document.getElementById("speed").innerHTML= "2.5x speed";
			song.rate(2.5);
		}
	}
	

    if(score_left_wrist>0.2){
        
        
        circle(leftWristX,leftWristY,20);

        in_number_leftWristY= Number(leftWristY);
        removeDecimal= floor(in_number_leftWristY);
        volume= removeDecimal/500;

        song.setVolume(volume)
        document.getElementById("volume").innerHTML = "volume - " + volume;

    }


}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);

}


