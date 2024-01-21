img = ""
status = ""
objects=[]
function preload() {
    img = loadImage("dog_cat.jpg")

}

function setup() {
    canvas = createCanvas(380,380)
    canvas.position(320, 130)

    video=createCapture(VIDEO)
     video.size(380,380)
     video.hide()
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "status:Detecting Objects"
}



function draw() {
    image(video, 0, 0, 380, 380)
    if (status != "") {
        objectDetector.detect(video, got_result)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status:objects Detected"
            document.getElementById("objects").innerHTML="Number Of Objects Detected Are "+objects.length
            fill("red")
            textSize(20)
            text(objects[i].label, objects[i].x,objects[i].y)
           
            noFill()
            stroke("red")
            rect(objects[i].x, objects[i].y,objects[i].width,objects[i].height)
        
            

        }
    }
    


}

function modelLoaded() {
    console.log("model Loaded")
    status = true
    objectDetector.detect(video, got_result)
}

function got_result(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        objects = results
    }
}