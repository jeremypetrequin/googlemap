;(function($, window) {
    
    //variables
    var pos1 = new google.maps.LatLng(45.73841707992849, 4.817676544189453),
    pos2 = new google.maps.LatLng(45.741412212759705, 4.8923492431640625),
    pos3 = new google.maps.LatLng(45.71265230517708, 4.876213073730469),
    $map = $('#map'), 
    $w = $(window),
    googlemap = null,
    allreadyLoaded = false;
    
    
    //animate to the third point
    function panTo3() {
        googlemap.panTo(pos3, 1500, panTo1);
    }
    
    //animate to the second point
    function panTo2() {
        googlemap.panTo(pos2, 1500, panTo3);
    }

    //animate to the first point
    function panTo1() {
        googlemap.panTo(pos1, 1500, panTo2);
    }
    
    //resize the map's div to fullscreen, and dispatch the event resize on googlemap
     function _r() {
        $map[0].style.width = $w.width()+'px';
        $map[0].style.height = $w.height()+'px';
        if(googlemap) google.maps.event.trigger(googlemap, 'resize');
    }

    //init
    $w.resize(_r); //listen resize for a full screen map
    _r(); //launch resize first time
    googlemap = new google.maps.Map($map[0], { //init the googlemaps
            center : pos1,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom : 15
    });
    google.maps.event.addListener(googlemap, 'tilesloaded', function() { //wait the pan in viewport is loaded
        if(!allreadyLoaded) {
            //create the 3 points
            new google.maps.Marker({position : pos1,map : googlemap});
            new google.maps.Marker({position : pos2,map : googlemap});
            new google.maps.Marker({position : pos3,map : googlemap});
    
            panTo2();//launch the first anim
        }
        allreadyLoaded = true;
    }); 
    
    
    
   
})(jQuery, window);



