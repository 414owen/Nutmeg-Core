window.onload = function() {

    for (var key in Nutmeg) {
        eval('var ' + key + '=Nutmeg[key];');
    }

    var timeTaken = 0;
    var timesToLoad = 50;
    var fibNum = 1000;

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

    function randCol() {
        return 'rgb('+randChan()+','+randChan()+','+randChan()+')';
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

    function benchmark(num, col) {
        body().clear();
        console.log(timesToLoad - num + 1);
        var startTime = Date.now();
        body(
            fibs.map(function(fib) {
                return div(fib).style(style.fib, {backgroundColor: col})
            })
        );
        timeTaken += Date.now() - startTime;
        if (num > 1) {
            window.setTimeout(
                function() {
                    benchmark(num - 1, randCol())
                }, 200
            );
        } else {
            console.log("Page loaded " + timesToLoad + " times.");
            console.log("Average load time: " + timeTaken / timesToLoad + " ms.");
        }
    }

    body.clear().style(style.base)(
        'This page will render ' + fibNum + ' stylized fibonacci numbers on-screen, then delete them.',
        br(),
        'It will do this ' + timesToLoad + ' times.',
        br(),
        'There will be a short delay between page loads.',
        br(),
        button('Start').onclick(benchmark.bind(this, timesToLoad, randCol()))
    );
};
