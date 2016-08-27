window.onload = function() {

    for (var key in Nutmeg) {
        eval('var ' + key + '=Nutmeg[key];');
    }

    var timeTaken = 0;
    var timesToLoad = 50;
    var fibNum = 1000;

    function startScreen(num) {
        var bod = body.style(style.base);
        bod.clear();
        bod(
            'This page will render ' + fibNum + ' stylized fibonacci numbers on-screen, then delete them.',
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
            backgroundColor: '#111',
            color: '#ddd'
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


    function randChan() {
        return Math.floor(Math.random() * 255);
    }

    var fibs = (function() {
        var curr = 1;
        var prev = 0;
        return Array.apply(null, Array(fibNum)).map(function (fib) {
            var oldc = curr, oldp = prev;
            curr += prev;
            prev = oldc;
            return oldp;
        });
    })();

    startScreen(5);

    function benchmark(num, r, g, b) {
        body().clear();
        console.log(num);
        var startTime = Date.now();
        var col = 'rgb('+r+','+g+','+b+')';
        body(
            fibs.map(function(fib) {
                return div(fib).style(style.fib, {backgroundColor: col})
            })
        );
        timeTaken += Date.now() - startTime;
        if (num > 1) {
            window.setTimeout(
                function() {
                    benchmark(num - 1, randChan(), randChan(), randChan())
                }
            );
        } else {
            console.log("Page loaded " + timesToLoad + " times.");
            console.log("Average load time: " + timeTaken / timesToLoad + " ms.");
        }
    }
};
