song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist = 0;
song1Status="";
song2Status="";

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('posenet is initialised');
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist =  results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX=" + leftWristX + " leftWristY=" + leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX=" + rightWristX + " rightWristY=" + rightWristY);
    }
}
function draw(){   
fill("#FF0000");
stroke("FF0000");
song1Status=song1.isPlaying();
song2Status=song2.isPlaying();
if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    song2.stop();

if(song1Status==false){
    song1.play();
    document.getElementById("song1").innerHTML="playing-harrypottersong"
    }
}
if(scorerightWrist > 0.2){
    circle(rightWristX, rightWristY, 20);
    song1.stop();

if(song2Status==false){
    song2.play();
    document.getElementById("song2").innerHTML="playing-peterpansong"
    }
}
}