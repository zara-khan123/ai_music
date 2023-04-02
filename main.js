song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function modelLoaded()
{
    console.log('posenet is intialized');
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill('#0F00FF');
    stroke('0F00FF');

 if(scoreleftWrist > 0.2)  
 {
circle(leftWristX, leftWristY, 20);
number_leftWrist = Number(leftWristY);
remove_decimals = floor(number_leftWrist);
volume = remove_decimals/500;
document.getElementById('volume').innerHTML = "volume = "+volume;
song.setVolume(volume);
 }
    
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
  
    
    if(results.length > 0)
    {  
    console.log(results);

   scoreleftWrist = results[0].pose.keypoints[9].score;
   console.log("scoreleftWrist = "+ scoreleftWrist); 

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX +"leftWristY = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX +"rightWristY = " + rightWristY);
    }

    
}