# Nutmeg
A tiny clientside Website generator.

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

nutmeg().global();
window.onload = function() {

// Other examples will not include surrounding HTML, or
// the above two functions, but they are both very important!

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

}
</script>
<body>
</body>
</html>
```

### Explanation:

```
// Let's make our elements global so we don't have to type nutmeg.div(), 
// Because Nutmeg is all about syntactic minimalism.
nutmeg().global();

// Important! This function will be called when the browser is ready to use
// Nutmeg.
window.onload = function() {

// Need to attach this stuff to the page somehow, we do that with a body 
// function
body(

	// Elements retain their HTML-y names
	div(

		// Render some text (woah!)
		h1('Nutmeg'),
		'Hello World',

		// The code retains the same basic structure as HTML
		div(
			div(
				"Don't disturb my nest!",
				"Thanks.",
				a('Take me to the nutmeg repo')
                    .href('https://github.com/414owen/Nutmeg')
			)
		)
	),

)
```
