// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    // track.stop();
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

function init() {

  if(window.DeviceOrientationEvent) {
    document.getElementById("text").innerHTML = "Supports orientation events";
    window.addEventListener("deviceorientation", orientationCallback, true);
  } else {
    document.getElementById("log").innerHMTL = "No orientation event support";
  }
}

function orientationCallback(eventData) {
document.getElementById("text").innerHTML = eventData.gamma + " " + eventData.beta;
var tilt = eventData.gamma;
var pitch = eventData.beta;

if(tilt < -90){
  tilt = -90;
}

if(tilt > 90){
  tilt = 90;
}

if(pitch < -90){
  pitch = -90;
}

if(pitch > 90){
  pitch = 90;
}

var d = document.getElementById("center");
var x0 = (window.innerWidth - d.offsetWidth) /2;
var y0 = (window.innerHeight - d.offsetHeight) / 2;
d.style.top = y0;
d.style.left = x0;

var c = document.getElementById("ball");
var x = (window.innerWidth - c.offsetWidth) /2;
var y = (window.innerHeight - c.offsetHeight) / 2;
var dx = x * tilt/90;
var dy = y * pitch/90;

c.style.top = y + dy;
c.style.left = x + dx;

}

//alert("javascript loaded");
window.onload = init;
