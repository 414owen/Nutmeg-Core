
window.onload = function() {

    for (var key in Nutmeg) {
        eval('var ' + key + '=Nutmeg[key];');
    }

    var style = mergeStyle({
        base: {
            backgroundColor: '#111'
        },
        spaced: {
            margin: '0.5rem',
            padding: '0.5rem'
        },
        bordered: {
            borderRadius: '8px'
        },
        fib: {
            depends: ['spaced', 'bordered'],
            display: 'inline-block',
            backgroundColor: '#333',
            color: '#eee'
        }
    });
    
    var timeTaken = 0;
    var timesToLoad = 50;
    for (var i = 0; i < timesToLoad; i++) {
        var startTime = Date.now();
        var curr = 1;
        var prev = 0;
        body.style(style.base)(
            Array.apply(null, Array(1500)).map(function (fib, ind) {
                var oldc = curr, oldp = prev;
                curr += prev;
                prev = oldc;
                return div(oldp).style(style.fib);
            })
        );
        timeTaken += Date.now() - startTime;
        if (i < timesToLoad - 1) 
            body().clear();
    }
    console.log("Page loaded " + timesToLoad + " times.");
    console.log("Average load time: " + timeTaken / timesToLoad + " ms.");
};
