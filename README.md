# TODO JS
Make sure your todos get completed by making them throw exceptions if they are past due! For Meteor and NPM.

# Syntax

You can use `TODO`, `FIXME`, and `XXX` as indicators that a feature needs to be completed.  You can then provide a date, datetime, or a version when it should be completed.

Here are some examples:

```js
// If you need to refactor some code before a date
TODO( 'Refactor this code', 'December 25, 2015' );
FIXME( 'Refactor this code', 'Feb 1, 2015' );
XXX( 'Refactor this code', '12/15/2015' );

// If you need to give dates a time before a specific date time
TODO( 'Dates should have a time', 'December 11, 2016 2:12 AM' );
FIXME( 'Dates should have a time', 'January 2, 2016 2:00 PM' );
XXX( 'Dates should have a time', 'September 1, 2013 12:12 AM' );

// If you need to specify a version:
TODO( 'Dates should have a time', 'v1.0' );
FIXME( 'Dates should have a time', 'v3.2.1' );
XXX( 'Dates should have a time', 'v2.12.0' );
 
```

# Options

There are some options you can set:

```
TODO.options( {
    ignore : [], // Example: ['TODO', 'FIXME', 'XXX']
    log : false, // set `true` to use console.log instead of throwing an exception
    currentVersion : 'v.0.0.0' // set to you version number
} );
```

# Tests

Tests are written in Meteor.

You can run tests with:

```cmd
meteor test-packages ./
```