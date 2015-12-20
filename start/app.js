/*
 Based on teacher's answer...
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

function IssueTracker() {
  this.issues = [];
}

IssueTracker.prototype = {
  add: function(issue) {
    this.issues.push(issue)
  }, 
  retreive: function() {
    var message = '';
    switch(this.issues.length) {
      case 0:
        // Do nothing (message is already "")
        break;
      case 1:
        message = this.issues[0];
        break;
      default:
        message = this.issues.join('\n');
        break;
    }
    return message;
  }
};

submit.onclick = function() {
  
  var firstPassword = firstPasswordInput.value;
  var secondPassword = secondPasswordInput.value;
  
  // Make UnputTracker for each input
  var firstInputIssuesTracker = new IssueTracker();
  var secondInputIssuesTracker = new IssueTracker();
  
  // Step through all requirements
  function checkRequirements() {
    
    if (firstPassword.length < 16) {
      firstInputIssuesTracker.add('fewer than 16 characters');
    } else if (firstPassword.length > 100) {
      firstInputIssuesTracker.add('greater than 100 characters');
    }
    
    if (!firstPassword.match(/[\!\@\#\$\%\^\&\*]/g)) {
      firstInputIssuesTracker.add('missing a symbol (!, @, #, $, %, ^, &, *)');
    } 
    
    if (!firstPassword.match(/\d/g)) {
      firstInputIssuesTracker.add('missing a number');
    }
    
    if (!firstPassword.match(/[a-z]/g)) {
      firstInputIssuesTracker.add('missing a lowercase letter');
    }

    if (!firstPassword.match(/[A-Z]/g)) {
      firstInputIssuesTracker.add('missing an uppercase letter');
    }
    
    if (firstPassword.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g)) {
      firstInputIssuesTracker.add('includes illegal character')
    }
  
  };  // end checkRequirements
    
  // If first and second passwords match, check requirements
  if (firstPassword === secondPassword && firstPassword.length > 0) {
    checkRequirements();
  } else {
    secondInputIssuesTracker.add('Passwords must match!');
  }
  
  // Get validation messages
  var firstInputIssues = firstInputIssuesTracker.retreive();
  var secondInputIssues = secondInputIssuesTracker.retreive();
  
  // Set custom validity
  firstPasswordInput.setCustomValidity(firstInputIssues);
  secondPasswordInput.setCustomValidity(secondInputIssues);

}; // end onclick
