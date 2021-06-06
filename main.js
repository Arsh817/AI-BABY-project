sound = "";
status = "";
objects = [];

function preload() {
   sound = loadSound("watch.mp3");
}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetector = ml5.objectDetector('cocossd' ,modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    
}

function gotResult(error,results) {
  if(error){
      console.log(error);
      
  }
  else {
      console.log(results);
      objects = results;
  }
}

function draw() {
    image(video,0,0,380,380);

   
    if(status !=""){

        objectDetector.detect(video, gotResult);
        r = random(255);
        g =   random(255);
        b  = random(255);
        for(i = 0; i<objects.length;i++){
            
            
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "No of Objects = "+objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                sound.stop();
                console.log("STOP");
            }else
            {
                document.getElementById("number_of_objects").innerHTML = "Baby not Found";
                sound.play();
                console.log("PLAY");
            }
        }
        if(objects.length==0){
            document.getElementById("number_of_objects").innerHTML = "Baby not Found";
                sound.play();
                console.log("PLAY");
        }
    }
}