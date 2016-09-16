# Nutmeg

A tiny website generator.
All nutmeg code is client-side javascript.

## Table of Contents

* [Nutmeg](#nutmeg)
  * [Why?](#why)
  * [What's wrong with?](#whats-wrong-with)
  * [What does it look like?](#what-does-it-look-like)
    * [Structure](#structure)
    * [Modifiers](#modifiers)
    * [Style](#style)
    * [Repetition](#repetition)
  * [Getting set up](#getting-set-up)


## Why

* Neater syntax than HTML
* Avoid code repetition
* Better abstraction
* Improve maintainability
* Reduce code size
* Reduce bandwidth usage
* Reduce load time

## What's wrong with?

* Pre-processors:
    * Produce *large* amounts of code
* The big guys (React / Angular / Other)
    * Try to do too many things
    * Are massive libraries/frameworks
    * Dictate code style / data flow

## What does it look like?

### Structure

Nutmeg's goal is to have the cleanest syntax possible, as such, nutmeg has no  
closing tags. Every element is a javascript function.

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
                a('Take me to the nutmeg repo').href('https://github.com/414owen/Nutmeg')
            )
        )
    )
)
```

### Modifiers

Modifiers change a nutmeg element, then return the element. This allows us to  
chain modifiers together very neatly. We have already seen a modifier above.

```js
var upper = h1();

...

form(
    result,
    input()
        .placeholder('Type here')
        .onkeyup(function(e) {
            result.clear()(e.target.value)
        }),
    button('Submit').onclick(function(e) {console.log(e)})
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

Also, as the modifiers return a nutmeg element, we can call the modified element  
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
better system, involving dependencies, pseudo-elements and all sorts of fun, we  
create a style object.

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

This structure, on its own does nothing. We would apply it with the `.style`  
modifier, for example:

```js
div.style(style.example)('Hello World')
```

With regards to dependencies, you can have as many as you want, and they will be  
applied recursively in the order they are declared, so you can overwrite styles  
from your dependencies easily.

### Repetition

Nutmeg parameters can be other nutmeg elements, anything that can be stringified  
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
)

// body is taking an array of nutmeg elements
body(
    fibs.map(function(fib) {
        // div is taking a number
        return div(fib).style({margin: '20px'});
    })
);
```

## Getting set up


* Create your html page
* Include the nutmeg library using a script tag or otherwise
* Paste this into your javascript file:

```js
window.onload = function() {
    // Declare all nutmeg functions locally
    for (var key in Nutmeg) {
        eval('var ' + key + '=Nutmeg[key];');
    }

    // * Insert your nutmeg code here *

}
```

* Write some code
 
You can of course use your own way of running code when the document is ready,  
and you don't have to declare nutmeg functions locally, you can do something  
like: 

```js
var n = Nutmeg;
n.body(
    'Hello World',
    n.br(),
    n.input.type('file')
)
```
