img = "";
status2 = "";
objects = [];
function preload() {
    img = loadImage('ComputerMouse.jpg');
}
function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status2").innerHTML = "Status : Detecting Objects";
}
function modelLoaded() {
    console.log("Model Loaded");
    status2 = true;
    objectDetector.detect(img, gotResults);
}
function draw() {
    image(img, 0, 0, 500, 400);
    if (status2 != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status2").innerHTML = "Status : Objects Detected";
            fill("#0000FF");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#0000FF');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}