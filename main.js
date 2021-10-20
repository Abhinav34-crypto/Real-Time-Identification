//Javascript Code//
status=false;
function setup(){
    canvas= createCanvas(300 , 300);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(300, 300);
    video.hide();
    classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/TMbETZF2A/model.json' , modelLoaded);
}

function draw(){
   image(video , 0, 0 , 300 , 300);
   classifier.classify(video ,gotResult)   
}

function modelLoaded(){
    console.log('Model Loaded')
    status=true;
}

function gotResult(error,results){
   
 if(error){
   console.error(error);
 }else{
     console.log(results);
     document.getElementById("result_object_name").innerHTML=results[0].label;
     Prediction = results[0].label;
     document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3);
     accuracy=results[0].confidence.toFixed(3);
     speak();
 }

}                                                                  

function speak(){
 var synth= window.speechSynthesis;
 speak_data= Prediction +'Accuracy is '+ accuracy;
 var utterThis= new SpeechSynthesisUtterance(speak_data);
 utterThis.rate= 1;
 synth.speak(utterThis);
}