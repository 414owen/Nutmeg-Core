window.onload = function() {

	eval(Nutmeg.localScope);

    var timeTaken = 0;
    var timesToLoad = 50;
    var fibNum = 1000;

    var style = mergeStyle({
        base: {
            backgroundColor: '#111',
            color: '#eee',
            textAlign: 'center'
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
        return [randChan(), randChan(), randChan()];
    }

    var middleAverage = 127 * 3;
    function contrastCol(col) {
        if ((col[0] + col[1] + col[2]) > middleAverage) {
            return [0, 0, 0];
        } else {
            return [255, 255, 255];
        }
    }

    function colText(col) {
        return 'rgb('+col[0]+','+col[1]+','+col[2]+')';
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

    function benchmark(num) {
        body.clear();
        var back = randCol();
        var text = colText(contrastCol(back));
        back = colText(back);
        console.log(timesToLoad - num + 1);
        var startTime = Date.now();
        body(
            fibs.map(function(fib) {
                return div(fib).style(style.fib, {backgroundColor: back, color: text})
            })
        );
        timeTaken += Date.now() - startTime;
        if (num > 1) {
            window.setTimeout(
                function() {
                    benchmark(num - 1)
                }, 200
            );
        } else {
            var averageTime = timeTaken / timesToLoad;
            var messages = ["Page loaded " + timesToLoad + " times.",
            "Average load time: " + averageTime + " ms."];
            body.clear()(messages[0], br(), messages[1]);
            console.log(messages[0]);
            console.log(messages[1]);
        }
    }

    body.clear().style(style.base)(
        'This benchmark involves rendering ' + fibNum + ' stylized fibonacci numbers on-screen.',
        br(),
        'It will do this ' + timesToLoad + ' times.',
        br(),
        button('Start').onclick(benchmark.bind(this, timesToLoad))
    );
};
