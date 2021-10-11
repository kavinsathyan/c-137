objects = []
video = "";
status = "";

function preload()
{
    video = createVideo('video.mp4');
    video.hide();
}

function setup()
{
    canvas = createCanvas(480, 250);
    canvas.center();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : objects Detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects Detected are : "+objects.length;

            fill("#2832C2");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#2832C2");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResults(error, results)
{
    if (error) {
        console.log(error);
    }
    console.log(error);
    objects = results;
}