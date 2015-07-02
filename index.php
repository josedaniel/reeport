<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, height=device-height" />
        <link rel="stylesheet" href="css/style.css" charset="utf-8">
        <title>Reeport</title>
    </head>
    <body>
        <div class="wrapper">
            
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="bower_components/handlebars/handlebars.min.js" charset="utf-8"></script>
        <script src="bower_components/page-slider/lib/page-slider.min.js" charset="utf-8"></script>
        <script src="js/oauth/facebook.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/core.js"></script>
        <script src="js/main.js"></script>
        <script src="js/login.js"></script>
        <script>
        window.onload = function(){
            if(navigator.geolocation)
                navigator.geolocation.getCurrentPosition(handleGetCurrentPosition, onError);
        }

        function handleGetCurrentPosition(location){
            localStorage.setItem('latitude', location.coords.latitude);
            localStorage.setItem('longitude', location.coords.longitude);
        }
        
        function onError() {
            console.log('Geolocation disabled');
        }
    </script>
        
    </body>
</html>

<?php include('templates.php'); ?>
