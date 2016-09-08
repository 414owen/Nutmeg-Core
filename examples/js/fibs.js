window.onload = function() {

    for (var key in Nutmeg) {
        eval('var ' + key + '=Nutmeg[key];');
    }

    var fg = '#eee';
    var bg = '#333';

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
            backgroundColor: bg,
            color: fg,
            transition: 'all 0.2s ease',
            hover: {
                color: bg,
                backgroundColor: fg
            }
        }
    });



    var curr = 1;
    var prev = 0;
    body().style(style.base)(
        Array.apply(null, Array(1500)).map(function (fib, ind) {
            var oldc = curr, oldp = prev;
            curr += prev;
            prev = oldc;
            return div(ind + ': ' + oldp).style(style.fib);
        })
    );
};
