;(function($, window) {
    
    //variables
    var $map = $('#map'), 
    $w = $(window),
    googlemap = null,
    mapOption = { 
            center : new google.maps.LatLng(45.73841707992849, 4.817676544189453),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom : 3
    },
    name = "textured";
    
    //json to stylise the color of map, generated with http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html
    var style = [ { featureType: "landscape", stylers: [ { visibility: "off" } ] },{ featureType: "transit", stylers: [ { visibility: "off" } ] },{ featureType: "road", stylers: [ { visibility: "off" } ] },{ featureType: "administrative.province", stylers: [ { visibility: "off" } ] },{ featureType: "administrative.land_parcel", stylers: [ { visibility: "off" } ] },{ featureType: "poi", stylers: [ { visibility: "off" } ] },{ featureType: "landscape", stylers: [ { saturation: 97 }, { hue: "#ffaa00" }, { lightness: -45 } ] },{ featureType: "administrative.locality", stylers: [ { saturation: -100 }, { hue: "#005eff" }, { lightness: 21 } ] },{ featureType: "administrative", elementType: "geometry", stylers: [ { visibility: "off" } ] },{ featureType: "administrative.country", stylers: [ { visibility: "on" } ] },{ featureType: "administrative.country", elementType: "labels", stylers: [ { visibility: "simplified" } ] },{ featureType: "water", elementType: "labels", stylers: [ { visibility: "off" } ] },{ },{ featureType: "water", stylers: [ { lightness: -45 }, { saturation: 100 }, { hue: "#0091ff" } ] } ]
    
    
    //resize the map's div to fullscreen, and dispatch the event resize on googlemap
     function _r() {
        $map[0].style.width = $w.width()+'px';
        $map[0].style.height = $w.height()+'px';
        if(googlemap) google.maps.event.trigger(googlemap, 'resize');
    }

    //init
    $w.resize(_r); //listen resize for a full screen map
    _r(); //launch resize first time
    
    
    
    //init the googlemap with the yellow style
    style = new google.maps.StyledMapType(style, {name: name});
    mapOption.mapTypeControlOptions = {mapTypeIds: [google.maps.MapTypeId.SATELLITE, name]};
    googlemap = new google.maps.Map($map[0], mapOption);//instanciate the googlemaps
    googlemap.mapTypes.set(name, style);
    googlemap.setMapTypeId(name);
    
    //add the textured overlay
    var texture = new TextureOverlay({map: googlemap}, {position : new google.maps.LatLng(45.73841707992849, 4.817676544189453)});

})(jQuery, window);



