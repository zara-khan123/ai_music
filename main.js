song1 = "";
song2 = ""
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
updatesong1 = "";
updatesong2 = "";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
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

    updatesong1 = song1.isPlaying();
    updatesong2 = song2.isPlaying();
    if(scoreleftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
    if( updatesong1 == false)
    {
     song1.play();
     document.getElementById("song").innerHTML = "playing peter pan";
    }
    }
    
    if(scorerightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
    if( updatesong2 == false)
    {
     song2.play();
     document.getElementById("song").innerHTML = "playing harry potter";
    }
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
        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist = "+ scoreleftWrist+ "scorerightWrist = "+ scorerightWrist); 

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX +"leftWristY = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX +"rightWristY = " + rightWristY);
    }

    
}