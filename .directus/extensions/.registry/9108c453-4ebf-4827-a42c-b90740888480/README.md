[![npm version](https://badge.fury.io/js/directus-extension-computed-interface.svg)](https://badge.fury.io/js/directus-extension-computed-interface)

# Introduction
A [Directus](https://github.com/directus/directus) extension for automatically calculating the value of a field based on other fields of the same item, on the client side.

- **Support templating, arithmetic operations**. Concat strings, sum, subtract, multiply, modulo, convert to slug, currency, etc.
- **Can be used as an alias field**.
- **Calculation is performed on the client side**, so it would not work if the item is created/updated via direct API calls or hooks.
- **Lightweight**. No third-party libraries.

![](./screenshots/screenshot1.jpeg)
![](./screenshots/screenshot2.jpeg)

# Installation
```
npm i directus-extension-computed-interface
```

# Get Started
1. Go to **Settings**, create a new field with type string or number.
2. In the **Interface** panel, choose **Computed** interface. There are 8 options:
    1. **Template**: Similar to M2M interface, determine how the field is calculated. Learn more about syntax in the next section.
    2. **Field Mode**: Choose how the value is displayed.
        - **null**: Default option. Show an input with the computed value but still allow manual editing.
        - **Display Only**: Show the computed value but will not save it to the database. Usually used for alias fields.
        - **Read Only**: Show an input with the computed value and disallow manual editing.
    3. **Prefix**: a string to prefix the computed value.
    4. **Suffix**: a string to suffix the computed value.
    5. **Custom CSS**: a JSON object for inline style binding. Only works with **Display Only** and **Read Only** mode. You can use this option to customize the appearance of the computed value such as font size, color, etc. Example: `{"color": "red", "font-size": "20px"}`.
    6. **Debug Mode**: Used for debugging the template. It will show an error message if the template is invalid. It will also log to console the result of each component of the template.
    7. **Compute If Empty**: Compute the value if the field is empty. This is useful if you want a value to be computed once such as the created date or a unique ID.
    8. **Initial Compute**: Compute the value when opening the form. This is useful if you want to compute a value based on the current date or other dynamic values.

# Syntax

The template consists of 2 elements: **plain strings** & **expressions**.
- **Plain** strings are string literal, often used for text interpolation.
- **Expressions** can contains operators, field names, numbers & strings. They must be enclosed by `{{` and `}}`.

## Examples
Sum 2 numbers:
```
{{ SUM(a, b) }}
```

Multiply 2 numbers:
```
{{ MULTIPLY(a, b) }}
```

Convert string to slug:
```
{{ SLUG(title) }}
```

Text interpolation:
```
/{{ SLUG(title) }}-{{ id }}
```

Complex calculation:
```
{{ SUM(MULTIPLY(2, x), b) }}
```

Literal strings are enclosed by double quotes (`"`):
```
{{ CONCAT(file, ".txt") }}
```

Use `.` to access nested fields in M2O or M2M fields:
```
{{ CONCAT(CONCAT(user.first_name, " "), user.last_name) }}
```

Combine `AT`, `FIRST`, `LAST`, `JSON_GET` to access nested fields in O2M or JSON fields:
```
{{ JSON_GET(AT(products, 0), "name") }}
{{ JSON_GET(LAST(products), "price") }}
```

**Note**: For M2O, O2M, M2M fields, you can only access the fields of the direct relation. For example, if you have a `user` field that is a M2O relation to the `users` collection, you can only access the fields of the `users` collection. You cannot access the fields of the `roles` collection even though the `users` collection has a M2O relation to the `roles` collection. On the other hand, JSON fields have no such limitation!

## Available operators

### Type conversion

Operator | Description
--- | ---
`INT(a)` | convert to integer
`FLOAT(a)` | convert to float
`STRING(a)` | convert to string
`DATE(a)` | convert to date

### Format

Operator | Description
--- | ---
`SLUG(a)` | transform string to slug (e.g. "This is a title" &#8594; "this-is-a-title")
`CURRENCY(a)` | format number to currency (e.g. 3000 &#8594; "3,000")

### Date

Operator | Description
--- | ---
`DATE_ISO(a)` | transform date or date-like object to ISO string
`DATE_UTC(a)` | transform date or date-like object to UTC string
`DATE_STR(a)` | transform date or date-like object to string with format "YYYY-MM-DD"
`TIME_STR(a)` | transform date or date-like object to string with format "HH:mm:ss"
`YEAR(a)` | get year of a date object, similar to `getFullYear`
`MONTH(a)` | get month of a date object, similar to `getMonth`
`GET_DATE(a)` | get date of a date object, similar to `getDate`
`DAY(a)` | get day of a date object, similar to `getDay`
`HOURS(a)` | get hours of a date object, similar to `getHours`
`MINUTES(a)` | get minutes of a date object, similar to `getMinutes`
`SECONDS(a)` | get seconds of a date object, similar to `getSeconds`
`TIME(a)` | get time of a date object, similar to `getTime`
`LOCALE_STR(a, locale, options)` | transform date or date-like object to string with locale format, `options` is a stringified JSON object. Example: `LOCALE_STR("2023-01-01", "en-US", "{\"weekday\": \"long\", \"year\": \"numeric\", \"month\": \"long\", \"day\": \"numeric\"}")` returns "Sunday, January 1, 2023".

### Arithmetic

Operator | Description
--- | ---
`ABS(a)` | absolute
`SQRT(a)` | square root
`SUM(a)` | sum an array of numbers
`SUM(a, b)` | a + b
`AVERAGE(a)` | average value of an array of number
`SUBTRACT(a, b)` | a - b
`MULTIPLY(a, b)` | a * b
`DIVIDE(a, b)` | a / b
`REMAINDER(a, b)` | a % b
`CEIL(a)` | returns the smallest integer greater than or equal to `a`.
`FLOOR(a)` | returns the largest integer less than or equal to `a`.
`ROUND(a)` | rounds to the nearest integer.
`ROUND(a, n)` | rounds number `a` to `n` number of decimals, (`ROUND(1.23, 1) = 1.2`).
`MAX(a, b)` | max value between `a` and `b`.
`MAX(arr)` | max value of an array of numbers.
`MIN(a, b)` | min value between `a` and `b`.
`MIN(arr)` | min value of an array of numbers.
`POWER(a, b)` | a^b
`EXP(a)` | returns `e^a`, where `e` is Euler's number.
`LOG(a)` | returns the natural logarithm (base `e`) of `a`.

### String

Operator | Description
--- | ---
`STR_LEN(str)` | length of string (deprecated, use `LENGTH` instead)
`LENGTH(str)` | length of string
`FIRST(str)` | first character of string
`LAST(str)` | last character of string
`REVERSE(str)` | reverse string
`LOWER(str)` | to lower case
`UPPER(str)` | to upper case
`TRIM(str)` | removes whitespace at the beginning and end of string.
`CONCAT(strA, strB)` | concat 2 strings `strA` and `strB`.
`LEFT(str, count)` | extract `count` characters from the beginning of the string `str`.
`RIGHT(str, count)` | extract `count` characters from the end of the string `str`.
`MID(str, startAt, count)` | extract `count` characters from `startAt` position of the string `str`.
`ENCODE_URL_COMPONENT(str)` | encode string to URL component.
`REPT(str, count)` | repeat string `count` times.
`JOIN(arr, separator)` | join an array of strings with `separator`.
`SPLIT(str, separator)` | split string `str` by `separator` to an array of strings.
`SEARCH(str, keyword)` | search `keyword` in `str` and return the position of the first occurrence. Return -1 if not found.
`SEARCH(str, keyword, startAt)` | search `keyword` in `str` and return the position of the first occurrence after `startAt`. Return -1 if not found.
`SUBSTITUTE(str, old, new)` | replace all occurrences of `old` in `str` with `new`.
`AT(str, index)` | get character at `index` of `str`.
`INDEX_OF(str, keyword)` | get the position of the first occurrence of `keyword` in `str`. Return -1 if not found.
`INCLUDES(str, keyword)` | check if `str` contains `keyword`.
`SLICE(str, startAt, endAt)` | extract a part of `str` from `startAt` to `endAt`. `endAt` can be negative. Similar to `slice` method of `String`.

### Boolean

Operator | Description
--- | ---
`NULL(a)` | check is null
`NOT_NULL(a)` | check is not null
`NOT(a)` | logical NOT
`EQUAL(a, b)` | a = b
`NOT_EQUAL(a, b)` | a <> b
`GT(a, b)` | a > b
`GTE(a, b)` | a >= b
`LT(a, b)` | a < b
`LTE(a, b)` | a <= b
`AND(a, b)` | logical AND
`OR(a, b)` | logical OR

### Array

Operator | Description
--- | ---
`ARRAY_LEN(a)` | length of array (deprecated, use `LENGTH` instead)
`LENGTH(a)` | length of array
`FIRST(a)` | first element of array
`LAST(a)` | last element of array
`REVERSE(a)` | reverse array
`CONCAT(a, b)` | concat 2 arrays `a` and `b`.
`AT(a, index)` | get element at `index` of `a`.
`INDEX_OF(a, element)` | get the position of the first occurrence of `element` in `a`. Return -1 if not found.
`INCLUDES(a, element)` | check if `a` contains `element`.
`SLICE(a, startAt, endAt)` | extract a part of `a` from `startAt` to `endAt`. `endAt` can be negative. Similar to `slice` method of `Array`.
`MAP(a, expression)` | apply `expression` to each element of `a` and return a new array, each element of `a` must be an object. Example: `MAP(products, MULTIPLY(price, quantity))` returns an array of total price of each product.
`FILTER(a, expression)` | filter `a` with `expression` and return a new array, each element of `a` must be an object. Example: `FILTER(products, GT(stock, 0))` returns an array of products that are in stock.
`SORT(a, expression)` | sort `a` with `expression` and return a new array, each element of `a` must be an object. Example: `SORT(products, price)` returns an array of products sorted by price.

### JSON

Operator | Description
--- | ---
`JSON_GET(a, key)` | get value of `key` in JSON object `a`.
`JSON_PARSE(a)` | parse string `a` to JSON object.
`JSON_STRINGIFY(a)` | stringify JSON object `a`.

### Relational

Operator | Description
--- | ---
`ASUM(a, b)` | Aggregated sum of O2M field. For example: calculate shopping cart total price with `ASUM(products, MULTIPLY(price, quantity))`, where `products` is the O2M field in the shopping cart and `price` & `quantity` are 2 fields of `products`.
`AMIN(a, b)` | Aggregated min of O2M field.
`AMAX(a, b)` | Aggregated max of O2M field.
`AAVG(a, b)` | Aggregated average of O2M field.
`AMUL(a, b)` | Aggregated multiplication of O2M field.
`AAND(a, b)` | Aggregated logical AND of O2M field. Only return `true` if all values are `true`.
`AOR(a, b)` | Aggregated logical OR of O2M field. Only return `true` if at least one value is `true`.
`ACOUNT(a, b)` | Aggregated count of O2M field. Only count true values. For example: count the number of products that are in stock with `ACOUNT(products, GT(stock, 0))`, where `stock` is a field of `products`.

### Condition

Operator | Description
--- | ---
`IF(A, B, C)` | return `B` if `A` is `true`, otherwise `C`
`IFS(A1, B1, A2, B2, ..., An, Bn)` | return `Bi` if `Ai` is the first to be `true`, if none of `Ai` is `true`, return `null`

### Others

Operator | Description
--- | ---
`RANGE(start, end, step)` | create an array of numbers from `start` to `end` with `step` increment/decrement. Example: `RANGE(1, 10, 2)` returns `[1, 3, 5, 7, 9]`.

## Dynamic Variables

There are 2 dynamic variables available that you can use in the expressions:
- `$NOW`: return the current Date object. Example: `{{ YEAR($NOW) }}` returns the current year.
- `$CURRENT_USER`: return the current user's id. Example: `{{ EQUAL($CURRENT_USER, user) }}` checks if the `user` field is the current user.
