# MetniMe

## Purpose
MetniMe is a web-application for shared commutes, where users can create a commute and the rest of the users can join the ride, should they desire to do so and there are spaces available.

## Intro
1. The app is based around commutes hosted by users, which can be joined by the rest. Commute creator has the right to edit or delete their commute, while the rest of the community can only join their commute. The active commutes can be found on the Commutes page, and since a vehicle can only have so many seats available, there's a limited amount of people able to join a given commute. Once, the commute is full, the option for joining is going to be closed. Likewise, when a commute takes off, joining will be no longer available even if there are spaces available.

## Validators Explained
1. In order to simplify the JSX code blocks inside the components and reuse validation login, validators were exported as functions, here's what they do:
``` js
// Takes all properties from the errorsObject and returns true, if there's at least 1 error
export const checkForErrors = (object) => {
    return (Object.values(object).some(x => x !== ''));
};

// Takes all properties from the valuesObject and returns true, if there's an empty one
export const hasEmptyProperty = (values) => {
    return (Object.values(values).some(x => x === ''));
};
```

## Dates Explained
1. The form uses input field with type 'datetime-local', which comes with additional tags called min and max.
``` js
// This is the HTML datetime-local format
'YYYY-MM-DDThh:mm'
```
2. The only problem is it uses different format than the JavaScript built-in objcet <strong>Date</strong>, which we convert to the expected HTML format using Date Utils, here's the code:
``` js
export const currentDateTime = () => {
    const date = new Date();
    return `
        ${date.getFullYear()}-
        ${String(date.getMonth() + 1).padStart(2, '0')}-
        ${String(date.getDate()).padStart(2, '0')}T
        ${String(date.getHours()).padStart(2, '0')}:
        ${String(date.getMinutes()).padStart(2, '0')}`.replace(/\s+/g, '').trim();
}
```

3. The reason we convert date values to String, except the getFullYear, is we might end-up with shorter string length in some cases, e.g. 2023-5-15 has to be 2023-05-15, etc., therefore we got to make it universal.
4. That's why we use the prototype method padStart of the String object, which ,in our case, is adding a leading zero but it could be anything, to strings with length shorter than it's first parameter
``` js
padStart('<Desired Length as Integer>', '<Your leading character>');
// Here's an example
'3'.padStart(3, 'x');
// 'xx3'
```
5. Now that we made the time format universal for all dates to match the desired HTML format, save the value to a <strong>const</strong> and pass it to the min tag
6. Increment the months with 2 and pass it another <strong>const</strong> then to the max tag to disable dates further than a month, likewise, it can be done for any other date parameter, to disable future dates, if desired.
``` js
${String(date.getMonth() + 2).padStart(2, '0')}-
```
7. That's pretty much it! But what about the last part:
``` js
.replace(/\s+/g, '').trim();
```
8. This simply removes the empty spaces in between and from both ends of the Date String but hold on, we don't have any, right? Not really, since CRLF is part of the string, as it's multi-line one we have to take care of it. The other way around is to make it one-liner, which is going to be too long.
    * <i>NOTE: Min and Max tags are simply client-side validation, which can be easily disabled on the client's side, should they deem to do so. Therefore, to prevent unexpected behaviours or bad data from being saved (a date in the past), it's a must to have matching validation on the server-side, as the client-side validation can be bypassed but is good to have for better UX and to reduce the amount of requests preventing the bad request from being sent.</i>