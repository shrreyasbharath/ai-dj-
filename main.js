song1 = "";
song2 = "";
LeftWristX = 0;
RightWristX = 0;
LeftWristY = 0;
RightWristY = 0;
ScoreLeftWrist = 0;
ScoreRightWrist = 0;
song1_status = "";
song2_status = "";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas  = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#FF0000")
    stroke("#FF0000")
    
    if(ScoreRightWrist > 0.2)
        {
            circle(RightWristX, RightWristY, 20);
            song2.stop();

            if(song1_status == false)
                {
                    song1.play();
                    document.getElementById("song").innerHTML = "Playing Harry Potter theme!"
                }
        }

    if(ScoreLeftWrist > 0.2)
        {
            circle(leftWristX, LeftWristY, 20);
            song1.stop();

            if(song2_status == false)
                {
                    song2.play();
                    document.getElementById("song").innerHTML = "Playing peter pan theme!"
                }
        }
}

function play()
{
    song1.play();
    song1.volume(1);
    song1.rate(1);
}

function modelLoaded()
{
    console.log("PoseNet Is Iniatialized")
}

function gotPoses(results)
{
    if(results.length > 0)
        {
            console.log(results);
            ScoreRightWrist = results[0].pose.keypoints[9].score;
            ScoreLeftWrist = results[0].pose.keypoints[10].score;
            console.log("ScoreRightWrist = " + ScoreRightWrist + "ScoreLeftWrist" + ScoreLeftWrist);

            LeftWristX = results[0].pose.leftWrist.x
            LeftWristY = results[0].pose.leftWrist.y
            console.log("leftWristX = " + leftWristX + "leftWristY = " + LeftWristY);

            RightWristX = results[0].pose.rightWrist.x
            RightWristY = results[0].pose.rightWrist.y
            console.log("rightWristX = " + RightWristX + " rightWristY = " + RightWristY);

        }
}
