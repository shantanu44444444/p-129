song = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;

function preload() {
    song = loadSound("remix.mp3");
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("My PoseNet Model Is Started !!");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(" scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 400, 400);

    fill("#32a887");
    stroke("#32a8a8");

    if(scoreLeftWrist>0.2){

    circle(leftWristX, leftWristY, 20);
    inNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(inNumberleftWristY);
    leftWristY_divide_1000 = remove_decimals / 1000;
    volume = leftWristY_divide_1000 * 2;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);

    }
}

function Play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.stop();
}