(function(){
    $("img.video").each(function() {
        var el, _$rapyd$_Unpack, vType, vID, imgURL, iframeURL, requestURL;
        "\n    Go through each image on this page tagged with the 'video'\n    class and insert the appropriate thumbnail image of the video\n    from the web. \n    Upon clicking, replace the image with an iframe of the video.\n    Allows for faster page loads compared to directly including \n    the iframes.\n    ";
        el = this;
        _$rapyd$_Unpack = this.alt.split("~");
        vType = _$rapyd$_Unpack[0];
        vID = _$rapyd$_Unpack[1];
        if (vType === "youtube") {
            imgURL = "https://i.ytimg.com/vi/" + vID + "/hqdefault.jpg";
            iframeURL = "https://www.youtube.com/embed/" + vID + "?autoplay=1&autohide=1";
            makeContent(el, imgURL, iframeURL);
        } else if (vType === "vimeo") {
            iframeURL = "https://player.vimeo.com/video/" + vID + "?autoplay=1";
            requestURL = "http://vimeo.com/api/v2/video/" + vID + ".json?callback=?";
            $.getJSON(requestURL, function(data) {
                var imgURL;
                imgURL = data[0].thumbnail_large;
                makeContent(el, imgURL, iframeURL);
            });
        }
    });
    function makeContent(el, imgURL, iframeURL) {
        "\n    Insert the given image URL into the src tag of the given\n    image element and replace the element with an iframe on click\n    ";
        $(el).css("background-image", "url(" + imgURL + ")");
        $(el).append("<div class=\"play\"></div>");
        $(el).click(function() {
            var iframe;
            iframe = $("<iframe/>", {
                "frameborder": "0",
                "src": iframeURL,
                "width": $(el).width(),
                "height": $(el).height()
            });
            $(el).replaceWith(iframe);
        });
    }
})();