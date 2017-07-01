# Nutmeg

A 1:1 mapping of HTML code to JavaScript functions.  
All Nutmeg code is client-side JavaScript.  
For an example of Nutmeg in action, see my personal site: [owen.cafe](https://owen.cafe).  
To try it out yourself, check out the Live Nutmeg Editor [here](https://owen.cafe/nutmeg/demo/).  
There are slides from a presentation about Nutmeg [here](https://owen.cafe/nutmeg/).


It is now recommended to use [Nutmeg-Router](https://github.com/414owen/Nutmeg-Router)
for building your Nutmeg projects.

## Table of Contents

* [Nutmeg](#Nutmeg)
  * [Why?](#why)
  * [What's wrong with this other thing I use?](#whats-wrong-with-this-other-thing-i-use)
  * [What does it look like?](#what-does-it-look-like)
    * [Structure](#structure)
    * [Modifiers](#modifiers)
    * [Style](#style)
    * [Repetition](#repetition)
  * [Getting set up](#getting-set-up)


## Why

* Functions are neater than xml-esque code
* Avoid code repetition
* Better abstraction
* Improve maintainability
* Reduce code size
* Reduce bandwidth usage
* Reduce load time

## What's wrong with this other thing I use?

* Pre-processors:
    * Produce *large* amounts of code
* The big guys (React / Angular / Other)
    * Try to do too many things
    * Are massive libraries/frameworks
    * Dictate code style / data flow

## What does it look like?

### Structure

Nutmeg's goal is to have the cleanest syntax possible, as such, Nutmeg has no  
closing tags. Every element is a JavaScript function.

```js
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
                a('Take me to the Nutmeg repo').href('https://github.com/414owen/Nutmeg')
            )
        )
    )
)
```

However, the basic structure of HTML is maintained. Elements enclose other  
elements.

### Modifiers

Modifiers change a Nutmeg element, then return the element. This allows us to  
chain modifiers together very neatly. There are modifiers for changing  
attributes and properties of elements. We have already seen a modifier above.

```js
var result = div();

...

form(
    result,
    input()
        .placeholder('Type here')
        .onkeyup(function(e) {
            result.clear()(e.target.value)
        }),
    button('Submit').onclick(console.log)
)
```

There is a shortcut to calling modifiers, which doesn't involve creating the  
element explicitly first.

```js
// create input, then apply modifier
input().placeholder('hello')

// is the exact same as
input.placeholder('hello')
```

Also, as the modifiers return a Nutmeg element, we can call the modified element  
to add children. This allows modifiers to be used before and after adding  
children.

```js
// create element with children
div(
    'The answer is: ',
    42
).style({fontSize: '42px'})

// is the exact same as
div.style({fontSize: '42px'})(
    'The answer is: ',
    42
)

// is the exact same as
div('The answer is: ')
    .style({fontSize: '42px'})(42)
```

### Style

As seen above, styles can be applied directly using object literals. For a  
better system, involving dependency management, pseudo-elements and all sorts  
of fun, we create a style object with mergeStyle().

```js
var style = mergeStyle({
    base: {
        backgroundColor: '#ccc',
        fontSize: '20px'
    },
    bordered: {
        borderRadius: '8px',
        border: '1px solid #111'
    },
    example: {
        depends: ['bordered', 'base'],
        padding: '20px'
    }
});
```

This structure, on its own, does nothing. We would apply it to an element with  
the `.style` modifier, for example:

```js
div.style(style.example)('Hello World')
```

With regards to dependencies, you can have as many as you want, and they will  
be applied in the order they are declared, so you can overwrite styles from  
your dependencies easily.

Your dependencies can of course have dependencies, and all styles are resolved  
by mergeStyle with a depth first search.

### Repetition

Nutmeg parameters can be other Nutmeg elements, anything that can be stringified  
(eg. numbers), or array-like objects of these. To show this, we will generate an  
array of the first 500 fibonacci numbers, and append it to body.

```js
// Generate an array of the first 500 fibonacci numbers
var curr = 1;
var prev = 0;
var fibs = Array.apply(0, Array(500)).map(
    function (fib, ind) {
        var oldc = curr, oldp = prev;
        curr += prev;
        prev = oldc;
        return oldp;
    }
);

// body is taking an array of Nutmeg elements
body(
    fibs.map(function(fib) {
        // div is taking a number
        return div(fib).style({margin: '20px'});
    })
);
```

## Getting set up

* Create your html page
* Include the Nutmeg library using a script tag or otherwise
* Paste this into your JavaScript file:

```js
window.onload = function() {

    // Declare all Nutmeg functions locally
	eval(Nutmeg.localScope);

    // * Insert your Nutmeg code here *
}
```

* Write some code

You can of course use your own way of running code when the document is ready,  
and you don't have to declare Nutmeg functions locally, you can do something  
like:

```js
var n = Nutmeg;
n.body(
    'Hello World',
    n.br(),
    n.input.type('file')
)
```
