prediction_1 = "";
prediction_2 = "";

Webcam.set({
width: 350,
height: 300,
image_format: 'png',
png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot() {
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="captured_img" src="'+data_uri+'"/>'
}); 
}

console.log('ml5 version:  ' , ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/fFwKe6VUh/model.json' , modelLoaded);

function modelLoaded() {
    console.log("MODEL IS LOADED");
}

function speak() {
synth = window.speechSynthesis;
speak_data_1 = "The First Prediction Is" + prediction_1;
speak_data_2 = "The Second Prediction Is" + prediction_2;
utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
synth.speak(utterThis);
}



function check() {
img = document.getElementById("captured_img");
classifier.classify(img , gotResults);
}


function gotResults(error , results) {
if (error) {
    console.error(error);
} else {
console.log(results);
document.getElementById("result_emoji_name").innerHTML = results[0].label;
document.getElementById("result_emoji_name2").innerHTML = results[1].label;
prediction_1 = results[0].label;
prediction_2 = results[1].label;
speak();

if(prediction_1 == "Happy") {
    document.getElementById("update_emoji").innerHTML = "&#128512;";
}

if(prediction_1 == "Sad") {
    document.getElementById("update_emoji").innerHTML = "&#128532;";
}

if(prediction_1 == "Angry") {
    document.getElementById("update_emoji").innerHTML = "&#128545;";
}


if(prediction_2 == "Happy") {
    document.getElementById("update_emoji2").innerHTML = "&#128512;";
}

if(prediction_2 == "Sad") {
    document.getElementById("update_emoji2").innerHTML = "&#128532;";
}

if(prediction_2 == "Angry") {
    document.getElementById("update_emoji2").innerHTML = "&#128545;";
}

}


}


