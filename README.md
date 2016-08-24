# Nutmeg
A tiny client-side website generator.

## Why?

* Avoid code repetition
* Better abstraction
* Improve maintainability
* Reduce code size
* Reduce bandwidth usage
* Reduce load time
* It's cool

## What's wrong with?

* Pre-processors:
    * Produce *large* amounts of code
* The big guys (React / Angular / Other)
    * Try to do too many things
    * Are massive libraries
    * Dictate code style / data flow

## Examples:

### Basics:

```
<html>
<script src="nutmeg.js"></script>
<script>

// Other examples will not include surrounding HTML
nutmeg(

// Nutmeg takes the page code as a function parameter
function() { 
body(
    div(
        h1('Nutmeg'),
            'Hello World',
            div(
                div(
                "Don't disturb my nest!",
                br(),
                "Thanks.",
                br(),
                a('Take me to the nutmeg repo').href('https://github.com/414owen/Nutmeg')
            )
        )
    )
)}

);

</script>
<body>
</body>
</html>
```

### Repetition:

Nutmeg parameters can be other nutmeg elements, anything that can be
stringified (eg. numbers), or array-like objects of these. To show this, we
will find generate an array of the first 1000 fibonacci numbers, and append it
to body.

```
var curr = 1;
var prev = 0;
body(
    Array(750).fill(0).map(function (fib, ind) {
        var oldc = curr, oldp = prev;
        curr += prev;
        prev = oldc;
        return div(oldp);
    })
);
```

### Styles:

Now, this doesn't look very nice. I think we'll need some spacing. Styles in
Nutmeg are javascript objects, these objects can have dependencies, so you can
create complicated styles by only adding one or two lines of code. 
Remember, javascript doesn't support dashes ('-') in object names, so all
properties look like camel-cased CSS.

```
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
```

Dependencies make your styles easy to think about, you no longer have to put a
class in five different places of your css file to avoid reuse, then search for
the occurances when you want to change it. Instead you have one occurance of
your style, and can navigate to its dependencies easily if you need to. 

Now we'll go ahead and apply this style to all of our 'fib' divs above.

``` 
...
body.style(style.base)(
... 
        return div(oldp).style(style.fib);
...  
```
