;(function(doc, _gm) {

    window.TextureOverlay = function(opt_options, params) {
        // Initialization
        this.setValues(opt_options);
        this.div_ = doc.createElement('div');
        this.div_.id = "textured-map-overlay";
        /*setTimeout(function() {
        //$('#textured-map-overlay').parent().parent().parent().prepend('<div id="michel"></div>');
        $('#textured-map-overlay').css({
            'background' : 'url(texture.png)',
            'height' : '100%',
            'width' : '100%',
            'position' : 'absolute',
            'top' : 0,
            'left' : 0
        });
        }, 2000);*/
        this.div_.style.cssText = 'position: absolute; display: none; background:url(texture.png); width:100px; height:100px;';
        this.div_.className = 'textured-map-overlay';
        this.timer = null;
    };

    TextureOverlay.prototype = new _gm.OverlayView;

    // Implement onAdd
    TextureOverlay.prototype.onAdd = function() {
         var pane = this.getPanes().mapPane, that = this;
         pane.appendChild(this.div_);
       /* 
        google.maps.event.addListener(this.map, 'dragstart', function() {
            if(that.timer) {
                clearInterval(that.timer);
                that.timer = null;
            }
            that.timer = setInterval(function() {
                that.move(that);
            }, 1000/25);
        })
        
        
        
        google.maps.event.addListener(this.map, 'dragend', function() {
            if(that.timer) {
                clearInterval(that.timer);
                that.timer = null;
            }
           
        })
        
        google.maps.event.addListener(this.map, 'zoom_changed', function() {
            that.move(that);
        });
        */
        google.maps.event.addListener(this.map, 'bounds_changed', function() {
            that.move(that);
        })
        
        
        
        
         this.div_.style.visibility = "visible";
         this.div_.style.display = "block"
    };

    TextureOverlay.prototype.hide = function() {
        if (this.div_) this.div_.style.visibility = "hidden";
    };

    TextureOverlay.prototype.show = function() {
        if (this.div_)  this.div_.style.visibility = "visible";
    };

    TextureOverlay.prototype.toggle = function() {
        if (this.div_) this.div_.style.visibility == "hidden" ? this.show() : this.hide();
    };

    // Implement onRemove
    TextureOverlay.prototype.onRemove = function() {
         this.div_.parentNode.removeChild(this.div_);
    };

    // Implement draw
    TextureOverlay.prototype.draw = function() {
        this.move();
    };
    
    TextureOverlay.prototype.move = function(that) {
        that = that || this;
        var NE = that.map.getBounds().getNorthEast(),
         SW = that.map.getBounds().getSouthWest();
         
         var projection = that.getProjection(),
         position = projection.fromLatLngToDivPixel(NE),
         position1 = projection.fromLatLngToDivPixel(SW);
         
         
         
         that.div_.style.left = Math.min(position.x, position1.x)+'px';
         that.div_.style.top = Math.min(position.y, position1.y)+'px';
         that.div_.style.width = Math.max(position1.x, position.x) - Math.min(position.x, position1.x) +'px';
         that.div_.style.height =Math.max(position1.y, position.y) - Math.min(position.y, position1.y) +'px';
    };

})(document, google.maps);
