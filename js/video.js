(function(){
"use strict";
function ՐՏ_with__name__(fn, name) {
    fn.__name__ = name;
    return fn;
}
function ՐՏ_Iterable(iterable) {
    var tmp;
    if (iterable.constructor === [].constructor || iterable.constructor === "".constructor || (tmp = Array.prototype.slice.call(iterable)).length) {
        return tmp || iterable;
    }
    if (Set && iterable.constructor === Set) {
        return Array.from(iterable);
    }
    return Object.keys(iterable);
}
function range(start, stop, step) {
    var length, idx, range;
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    step = arguments[2] || 1;
    length = Math.max(Math.ceil((stop - start) / step), 0);
    idx = 0;
    range = new Array(length);
    while (idx < length) {
        range[idx++] = start;
        start += step;
    }
    return range;
}
function ՐՏ_eq(a, b) {
    var ՐՏitr1, ՐՏidx1;
    var i;
    if (a === b) {
        return true;
    }
    if (a === void 0 || b === void 0 || a === null || b === null) {
        return false;
    }
    if (a.constructor !== b.constructor) {
        return false;
    }
    if (Array.isArray(a)) {
        if (a.length !== b.length) {
            return false;
        }
        for (i = 0; i < a.length; i++) {
            if (!ՐՏ_eq(a[i], b[i])) {
                return false;
            }
        }
        return true;
    } else if (a.constructor === Object) {
        if (Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }
        ՐՏitr1 = ՐՏ_Iterable(a);
        for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
            i = ՐՏitr1[ՐՏidx1];
            if (!ՐՏ_eq(a[i], b[i])) {
                return false;
            }
        }
        return true;
    } else if (Set && a.constructor === Set || Map && a.constructor === Map) {
        if (a.size !== b.size) {
            return false;
        }
        for (i of a) {
            if (!b.has(i)) {
                return false;
            }
        }
        return true;
    } else if (a.constructor === Date) {
        return a.getTime() === b.getTime();
    } else if (typeof a.__eq__ === "function") {
        return a.__eq__(b);
    }
    return false;
}

(function(){

    var __name__ = "__main__";

    var ՐՏ_1, ՐՏ_2;
    var makeContent = (ՐՏ_1 = function makeContent(el, imgURL, iframeURL) {
        $(el).attr("src", imgURL);
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
    }, Object.defineProperty(ՐՏ_1, "__doc__", {
        value: "Insert the given image URL into the src tag of the given\nimage element and replace the element with an iframe on click"
    }), ՐՏ_1);
    $("img.video").each((ՐՏ_2 = function() {
        var ՐՏupk1;
        var el, vType, vID, imgURL, iframeURL, requestURL;
        el = this;
        ՐՏupk1 = this.alt.split("~");
        vType = ՐՏupk1[0];
        vID = ՐՏupk1[1];
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
    }, Object.defineProperty(ՐՏ_2, "__doc__", {
        value: "Go through each image on this page tagged with the 'video'\nclass and insert the appropriate thumbnail image of the video\nfrom the web.\nUpon clicking, replace the image with an iframe of the video.\nAllows for faster page loads compared to directly including\nthe iframes."
    }), ՐՏ_2));
})();
})();
