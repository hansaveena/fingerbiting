navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia 
                            || navigator.msGetUserMedia

const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const audio = document.getElementById("stopitaudio");
const context = canvas.getContext("2d");

let model = null;

const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79   // confidence threshold for predictions.
}

handTrack.startVideo(video).then(status => {
        console.log("video started", status);
        if (status) {
          navigator.getUserMedia({ video: {}},
             stream => {
                  video.srcObject = stream
                  setInterval(runDetection,1000)
        }, err => console.log(err))
        } 
    });

function runDetection() {
    model.detect(video).then(predictions => {
        console.log("Predictions: ", predictions);
        //model.renderPredictions(predictions, canvas, context, video);
            if(predictions.length > 0 ){
                audio.play();
            }
            requestAnimationFrame(runDetection);    
    });
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
});
