define([
    "backbone"
], function(Backbone) {
    var BrowseView = Backbone.View.extend({
        events: {
            click: "browse"
        },

        initialize: function() {
            // arrow keys browse tracks
            $(document).on("keyup", function(event) {
                if ( event.which == 39 || event.which == 40 ) { 
                    $(".track-next").trigger("click");
                } else if ( event.which == 37 || event.which == 38 ) { 
                    $(".track-prev").trigger("click");
                }   
            });
        },

        browse: function(event) {
            var browsePrev = this.options.prev,
                items = this.options.items,
                itemIndex = items.getNowPlayingIndex();

            // ignore if trying to browse before first item or past last
            if ( ( itemIndex === 0 && browsePrev ) ||
                ( itemIndex == items.length && !browsePrev ) ) { 
                return;
            }   

            var nextItemIndex = itemIndex + ( browsePrev ? -1 : 1 );
            items.at(nextItemIndex).get("view").activate();
        }  
    }); 

    return BrowseView;
});
