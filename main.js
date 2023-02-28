var noseX = 0;
var noseY = 0;
var wristHeightDif = 0;
var wristWidthDif = 0;
var distance = 0;

function preload() {
}

function setup() {
    video = createCapture(VIDEO);
    video.size(510, 385);
    video.position(80, 375);

    canvas = createCanvas(510, 385);
    canvas.position(800, 375);
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    background("wheat");
    stroke("orange");
    fill("orange");
    square(510 - noseX - (distance/2), 385 - noseY - (distance/2), distance);
}

function modelLoaded() {
    console.log("PoseNet is initialized.")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.x;
        wristHeightDif = Math.abs(results[0].pose.leftWrist.y - results[0].pose.rightWrist.y);
        wristWidthDif = Math.abs(results[0].pose.leftWrist.x - results[0].pose.rightWrist.x);
        distance = Math.sqrt((wristHeightDif * wristHeightDif) + (wristWidthDif * wristWidthDif));
    }
}