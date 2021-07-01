nosex=0;
nosey=0;
leftwristx = 0;
rightwristx = 0;
difference = 0;

function setup(){
     video = createCapture(VIDEO);
     video.size(600, 600);
     video.position(90, 285);

     canvas = createCanvas(550, 550);
     canvas.position(740, 150);

     poseNet = ml5.poseNet(video, modelLoaded);
     poseNet.on('pose', gotPoses);
}

function gotPoses(results){
     if (results.length > 0) {
          console.log(results);
          nosex = results[0].pose.nose.x;
          nosey = results[0].pose.nose.y;
          leftwristx = results[0].pose.leftWrist.x;
          rightwristx = results[0].pose.rightWrist.x;
          difference = floor(leftwristx - rightwristx);
          console.log("leftwrist=" + leftwristx + "rightwrist=" + rightwristx + "difference=" + difference);
     }
}

function modelLoaded(){
     console.log("Posenet is Initialized");
}

function draw(){
     word = document.getElementById("name").value;
     color = document.getElementById("color").value;
     console.log(word);
     background("#8fdfd6");
     fill(color);
     stroke(color);
     textSize(difference);
     text(word,nosex,nosey);
     document.getElementById("size").innerHTML = "Font size is:" + difference + "px";
}