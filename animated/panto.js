/**
 * a snippet that overide googlemap method "panto", to add params : time and callback
 * be careful, its a very beta test, can lag on some computer, and the pan doesn't load if you go fast
 * sample at http://jeremypetrequin.fr/projets/googlemap/animated
 * 
 * @author badger
 * @website http://jeremypetrequin.fr
 */
;(function(gm) {
    if(!gm) throw ("googlemap missing");
    
    Math.linearEquation =  function(x1, x2, y1, y2) {
        var coeff = (y2 -y1) / (x2 - x1), 
        a = y1 - coeff * x1;
        return function(t) {
           return coeff * t + a;
        };
    }

     /**
      * @params to : object google.maps.LatLng
      * @params time : time of the anim, default : 1000 (in millisecond)
      * @params callBack : function called at the end ot the animation
      */
     gm.Map.prototype.panTo = function(to, time, callBack) {
                if(!to) return;
                time = time || 1000;
                callBack = callBack || function() {};
                var that = this, 
                i = 0,
                from = that.getCenter(),
                eq = {lat : Math.linearEquation(0, time, from.lat(), to.lat()), lng : Math.linearEquation(0, time, from.lng(), to.lng())},
                interval = setInterval(function() {
                    i+=1000/25;
                    that.setCenter(new gm.LatLng(eq.lat(i), eq.lng(i)));
                    if(i >= time) {
                        clearInterval(interval);
                        interval = null;
                        callBack();
                    }
                }, 1000/25);
        };
})(google.maps);