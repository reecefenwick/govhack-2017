function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide();
        
        // Start the App by calling camera
        callCamera();
    }
        
}
document.addEventListener("app.Ready", onAppReady, false) ;

function callCamera() {
    // Change all styles to default
    $('#kangaroo').hide();
    $('#not-kangaroo').hide();
    $('#go-again').hide();
    $('body').css('background-color', '#919191');
    
    // Use camera plugin to get picture
    navigator.camera.getPicture(annotateImage, cameraError,
    {
        destinationType : Camera.DestinationType.DATA_URL, // base 64 encoded url
        encodingType: Camera.EncodingType.JPG, // jpg encoding type
        quality: 35, // Lowish quality max 4mb through api
        correctOrientation: true // Auto correct the orientation
    });
}

function annotateImage(imageData) {
    // Set background image as image taken
    $('#background-image-container').attr("src", "data:image/png;base64," + imageData);
    
    // Send image to google cloud vision api
    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify({
          "requests": [
            {
              "features": [
                {
                  "maxResults": 10,
                  "type": "LABEL_DETECTION"
                }
              ],
              "image": {
                "content": imageData
              }
            }
          ]
        }),
        dataType: 'json',
        // Success callback
        success: googleApiSuccess,
        error: function(data){
            alert("Sorry - Something went wrong with google cloud vision api: response = " + JSON.stringify(data));
            window.location.reload();
        },
        type: 'POST',
        url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAC1nk-RgPloOYPmOsZKtJxJf7Va-tGYdM'
    });
}

function googleApiSuccess(data) {
    // Set defaults
    var $kangaroo = false;
    var arrayLength = data.responses[0].labelAnnotations.length;
    for (var i = 0; i < arrayLength; i++) {
        $kangaroo = data.responses[0].labelAnnotations[i].description == "kangaroo"; 
        if ($kangaroo) { break; }
    }
    if ($kangaroo) {
        // If 'kangaroo' is present in response
        $('#kangaroo').show();
        $('#go-again').show();
        $('body').css('background-color', '#FFCC00'); // Yellow
        var locationObject = getGeolocationDetails();
    } else {
        // If 'kangaroo' is not present in response
        $('#not-kangaroo').show();
        $('#go-again').show();
        $('body').css('background-color', '#919191'); // Grey
    }
}

function getGeolocationDetails() {
    // Use geolocation plugin to get lat long
    navigator.geolocation.getCurrentPosition(
        function(position) {
            return {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
        }, 
        geolocationErrorCallback
    );
}

function geolocationErrorCallback() {
    alert("Sorry - Something went wrong with geolocation");
    window.location.reload();
}

function cameraError() {
    alert("Sorry - Something went wrong with camera");
    window.location.reload();
}

function getDistance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}