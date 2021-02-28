# Introduction
Form Validation is a quick way of identifying and validating forms when submitting a form.
There are two ways you can validate the form, manually 1-by-1 or via the form element.

# Validation 1-by-1

You start off with setting up an array of ID to check

```js
const inputs = ['full_name', 'reg_email', 'reg_phone', 'first_line', 'post_code']
```

Then you initialise the class using the following code:

```js
const parser = new ValidateForm()
let validatedCount = 0
inputs.forEach((item) => {
const parsedData: any = parser.parse(<HTMLInputElement>document.getElementById(item))
if (parsedData.status) {
    validatedCount++
}
})

```

This will then verify all the fields and let you know which one has errors, it will also inject css classes to the failed or validated form fields.
The defaults CSS classes are valid `is-valid` and invalid `is-invalid`.

# Validate all fields in the form

```js
// element.target is the Input element
const form: HTMLInputElement = element.target
const parser = new ValidateForm()
parser.parse(form)

```

# Types of validation

length of field:

```html
<input....
data-validate="length"
data-value="3"
.../>

```

Email address:

```html
<input....
data-validate="email"
data-value="0"
.../>

```


Phone Number address:

```html
<input....
data-validate="phoneNumber"
data-value="0"
.../>

```