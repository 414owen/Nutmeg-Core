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

```
<html>
<script src="nutmeg.js"></script>
<script>
nutmeg().global();
document.onload = function() {

body(
	div(
		h1('Nutmeg'),
		'Hello World'
	)
)

}
</script>
<body>
</body>
</html>
```
