# MetniMe

## Purpose
MetniMe is a web-application for shared commutes, where users can create a commute and the rest of the users can join the ride, should they desire to do so and there are spaces available.

## Intro
1. The app is based around commutes hosted by users, which can be joined by the rest. Commute creator has the right to edit or delete their commute, while the rest of the community can only join their commute. The active commutes can be found on the Commutes page, and since a vehicle can only have so many seats available, there's a limited amount of people able to join a given commute. Once, the commute is full, the option for joining is going to be closed. Likewise, when a commute takes off, joining will be no longer available even if there are spaces available.

## Views
1. **Login and Register**
First field is supposed to be Email on both forms, which is validated by RegEx, the rest of the form is Password and, additionaly, for the Register it takes Confirm Password.

2. **Host**
This is the place to create commutes, which can only be accessed after successful registration and/or login. The form has various fields, which are all validated with custom checks:
* From and To fields take city names, can't match each other and should not contain any digits.
* Available Seats field takes number of available seats in the commute. Apparently, limited to 4.
* Phone field takes phone number, validated with RegEx, should start with zero, second digit can't be 0 again, and should have length of 10 digits to be valid.
* Date Field is taking dates from today to 1 month in the future. It can't be in the past, or too far in the future.
When all the fields are filled with valid information, the form can be submitted, if there are any invalid fields, it'll be coloured in red, and the submit button of the form is disabled. On successful submission, the commute is created and listed in the Commutes Section, also as the latest on the homepage

3. **Commutes and Home**
Commutes section is the catalog, on which all the commutes are displayed. Home page is kind of the same, except only the latest 3 commutes can be seen. Detailed view of the listed commutes can be accessed by clicking on the icon on the bottom right of each of the commutes.

4. **Commute Details**
We have details overview and past comments for everyone. The other functionalities depend on the User:
* Owners can edit/delete the commute, also they can add comments to their own commute.
* Registered users can join or leave a commute they've previously joined, also to add comments just like the owners.
* Unauthenticated users can only view the detailed information plus reat the past comments.
* Phone is not visible by Visitors who haven't yet joined the commute, except for their owner

5. **Edit Commute**
This is only accessible to the owners of each commute, where they can adjust any of the fields and save the changes without affecting additional data related to it, such as the comments and the registered passengers. The same validation applies, as in the **Host** view.

## Application Architecture
For the most part, each component has its own folder inside the components folder, except for some nested components such as the CatalogItem and LatestCommute, which are found inside their respective parents folder. Each component has its own styles found in the same folder within modular css file. To prevent unauthorized access to commutes and non-authenticated users to interact with it, there are component wrappers inside the common folder:
* CommuteOwner - checks if the user is owner of the commute before edit
* RouteGuard - redirects to login the unathenticated users
* SessionGuard - redirects to home the already authenticated users when Login or Register is being called in the URL

### Shared functionalities
1. Contexts
* AuthContext is responsible for the management of the Authentication State, exports the Login, Register and Logout Handlers and provides additional properties such as the User Email, their Id, their AccessToken, and boolean isAuthenticated, those very properties are passed to the localStorage and the AuthState.
* CommuteContext is responsible for the management of the state of the commutes in the catalog, the home and the details views for each commute. It exposes the functionality for editing, deleting, creating and viewing.

2. Hooks
* useForm makes the forms Controlled, validates there is not empty fields, wraps the onSubmit handler and stops the default behavior of submitted forms. It also populates the Edit form with the coresponding values.
* useLocalStorage is managing the localStorage data, which is updated every time the Authentication state changes and is secondary to it. It only helps to persist the state after refresh.
* useService is providing the AccessToken to the services allowing authorized requests to be made.

3. Reducers
* commuteReducer contains the logic of destructuring the commute object and passing a fresh reference with the updated object to the state.

4. Services
All the services are depending on the requester to make the actual requests
* authService is responsible for sending Authentication requests - Login, Register, Logout
* commentService is responsible for getting and adding comments
* commuteService is providing the CRUD of the commutes plus the count of reserved seats
* passengerService is responsible for reserving and leabing commute seats and ensures one User can only reserver 1 seat
* The requester knows how to make authorized and unauthorized requests abd  returns resolved promises or errors back.

7. In order to simplify the JSX code blocks inside the components and reuse validation, validators were exported as functions, here's what they do:
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
8. This simply removes the empty spaces in between and from both ends of the Date String.