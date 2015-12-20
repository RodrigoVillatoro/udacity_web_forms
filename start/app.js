/*
 Your code goes here!
 */

/*
 You might find you want to use RegEx. As this quiz is about setCustomValidity
 and not RegEx, here are some RegEx patterns you might find useful:

 match one of the required symbols: /[\!\@\#\$\%\^\&\*]/g
 match a number: /[0-9]/g or /\d/g
 match a lowercase letter: /[a-z]/g
 match an uppercase letter: /[A-Z]/g
 match a character that isn't allowed in this password: /[^A-z0-9\!\@\#\$\%\^\&\*]/g
 */

/*
 Grabbing a few inputs to help you get started...
 */
var firstPasswordInput = document.querySelector('#first');
var secondPasswordInput = document.querySelector('#second');
var submit = document.querySelector('#submit');

function checkField(passwordInput) {
    var possibleErrors = [
        {
            message: "at least 16 characters (longer is better, but at most 100)",
            regex: /^.{16,}$/
        },
        {
            message: "at most 100 characters (minimum 16)",
            regex: /^.{16,100}$/
        },
        {
            message: "at least one of these symbols: !, @, #, $, %, ^, &, *",
            regex: /[\!\@\#\$\%\^\&\*]/g,
        },
        {
            message: "at least one number",
            regex: /\d/g
        },
        {
            message: "at least one lowercase letter",
            regex: /[a-z]/g
        },
        {
            message: "at least one uppercase letter",
            regex: /[A-Z]/g
        },
        {
            message: "Illegal characters",
            regex: /^[A-Za-z0-9\!\@\#\$\%\^\&\*]+$/g
        }
    ], errors = [];
    for(var i = 0; i < possibleErrors.length; i++) {
        var possibleError = possibleErrors[i],
            match = passwordInput.value.match(possibleError.regex)
        if(match === null) {
            errors.push(possibleError.message);
        }
    }
    if (errors.length > 0){
        return "Error: "+errors.join(", ");
    } else {
        return "";
    }
}

/*
 You'll probably find this function useful...
 */
submit.onclick = function () {
    var message = checkField(firstPasswordInput);
    firstPasswordInput.setCustomValidity(message);
    if(firstPasswordInput.value !== secondPasswordInput.value) {
        secondPasswordInput.setCustomValidity("Your password does not match, could you try again?");
    } else {
        secondPasswordInput.setCustomValidity("");
    }
};