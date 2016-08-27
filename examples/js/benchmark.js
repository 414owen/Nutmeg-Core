
window.onload = function() {

    for (var key in Nutmeg) {
        eval('var ' + key + '=Nutmeg[key];');
    }

    var timeTaken = 0;
    var timesToLoad = 50;
    var fibs = 1000;

    function startScreen(num) {
        var bod = body;
        bod.clear();
        body(
            'This page will render ' + fibs + ' stylized fibonacci numbers on-screen, then delete them.',
            br(),
            'It will do this ' + timesToLoad + ' times.',
            br(),
            'It will start in ' + num + ' seconds'
        )
        if (num === 0) {
            benchmark(timesToLoad);
        }
        else if (num >= 0) {
            window.setTimeout(
                function() {
                    startScreen(num - 1)
                }, 1000
            );
        }
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
            color: '#eee'
        }
    });

    startScreen(5);

    function randChan() {
        return Math.floor(Math.random() * 255);
    }

    function benchmark(num, r, g, b) {
        body().clear();
        console.log(num);
        var curr = 1;
        var prev = 0;
        var startTime = Date.now();
        body.style(style.base)(
            Array.apply(null, Array(fibs)).map(function (fib, ind) {
                var oldc = curr, oldp = prev;
                curr += prev;
                prev = oldc;
                return div(oldp).style(style.fib, {backgroundColor: 'rgb('+r+','+g+','+b+')'});
            })
        );
        timeTaken += Date.now() - startTime;
        if (num > 1) {
            window.setTimeout(
                function() {
                    benchmark(num - 1, randChan(), randChan(), randChan())
                }, 100
            );
        } else {
            console.log("Page loaded " + timesToLoad + " times.");
            console.log("Average load time: " + timeTaken / timesToLoad + " ms.");
        }
    }
};
