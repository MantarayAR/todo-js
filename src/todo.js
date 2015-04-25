/**
 * TODO JS
 *
 * Make sure your TODOs in JavaScript get done my making them throw exceptions!
 *
 * Inspired by https://github.com/andyw8/do_by
 *
 * Does not support alpha, beta,... versioning.  We will accept a pull request
 * that adds in this functionality.
 *
 * Usage:
 * 
 * ```js
 * TODO.options( {
 *   ignore : [], // ['TODO', 'FIXME', 'XXX'] => ignore these functions
 *   log : false, // true => `console.log` instead of `throw new Error`
 *   currentVersion : 'v0.0.0' // 'v1.0.1' => Make sure it starts with a 'v'
 * } )
 *
 * TODO( 'Finish refactoring this code', 'December 25, 2015' );
 *
 * TODO( 'Dates can have time!', 'December 25, 2015 2:12 PM' );
 *
 * TODO( 'Implement email alerts', 'v1.0.2' );
 *
 * FIXME( 'Need to change the index', '12/15/2015' );
 *
 * XXX( 'This needs to be documented', 'v1.2' );
 * ```
 *
 * @author MantarayAR http://github.com/mantarayar
 * @author Ivan Montiel http://github.com/idmontie
 * @license MIT
 */

var that = this;

+function () {
  'use strict';
  var TODO, FIXME, XXX;

  /**
   * Return 1 if a > b
   * Return -1 if a < b
   * Return 0 if a == b
   * @author http://stackoverflow.com/questions/6832596/how-to-compare-software-version-number-using-js-only-number
   */
  var versionCheck = function ( a, b ) {
    if (a === b) {
      return 0;
    }

    var aComponent = a.split( '.' );
    var bComponent = b.split( '.' );

    var len = Math.min( aComponent.length, bComponent.length );

    // loop while the components are equal
    for ( var i = 0; i < len; i++ ) {
      // A bigger than B
      if ( aComponent[i] > bComponent[i] ) {
        return 1;
      }

      // B bigger than A
      if ( aComponent[i] < bComponent[i] ) {
        return -1;
      }
    }

    // If one's a prefix of the other, the longer one is greater.
    if ( aComponent.length > bComponent.length ) {
      return 1;
    }

    if ( aComponent.length < bComponent.length ) {
      return -1;
    }

    // Otherwise they are the same.
    return 0;
  }

  var itFailed = function ( message, by ) {
    var m = message + ' is past due! Should have been completed by ' + by + '. On line ' + (new Error).lineNumber;
    // only throw if not log
    if ( TODO.options().log ) {
      console.log( m );
    } else {
      throw new Error( m );
    }
  };

  var check = function ( message, by, level ) {
    if ( TODO.options().ignore.indexOf( level ) > -1) {
      // Ignore this check
      return;
    }

    // Determine what type of "by" we are checking: date or version
    if ( by.indexOf( 'v' ) === 0 ) {
      // Checking version
      if ( versionCheck( by, TODO.options().currentVersion ) === -1 ) {
        itFailed.call( this, message, by );
      }
    } else {
      // Checking date
      var timeToCheckAgainst = new Date();
      var date = new Date( Date.parse( by ) );

      // check for invalid date
      if ( 'Invalid Date' == date ) {
        throw new Error( 'Invalid Date! ' + by );
      }

      // only set the hours to zero if no time is provided in the TODO
      if ( date.getMinutes() == 0 && date.getHours() == 0 ) {
        timeToCheckAgainst.setHours( 0, 0, 0, 0 );
      }

      if ( date < timeToCheckAgainst ) {
        itFailed.call( this, message, by );
      }
    }
  };

  /**
   * @param message String
   * @param by String - date in a normal format or a version
   */
  TODO = function () {
    var message = arguments[0];
    var by = arguments[1] || false;

    check.call( this, message, by, 'TODO' );
  };

  /**
   * @param message String
   * @param by String - date in a normal format or a version
   */
  FIXME = function () {
    var message = arguments[0];
    var date = arguments[1] || false;

    check.call( this, message, date, 'FIXME' );
  };

  /**
   * @param message String
   * @param by String - date in a normal format or a version
   */
  XXX = function  () {
    var message = arguments[0];
    var date = arguments[1] || false;

    check.call( this, message, date, 'XXX' );
  };

  TODO._defaults = {
    ignore : [],
    log : false,
    currentVersion : 'v0.0.0'
  };

  TODO._options = false;

  /**
   * Options to set
   */
  TODO.options = function () {
    if ( arguments.length === 0 ) {
      return this._options || this._defaults;
    }

    var options = {};

    if ( typeof arguments === 'object' ) {
      for ( var property in this._defaults ) {
        if ( this._defaults.hasOwnProperty( property ) ) {
          options[property] = arguments[0][property] || this._defaults[property]
        }
      }
    }

    this._options = options;
  };

  TODO.options.reset = function () {
    TODO._options = TODO._defaults;
  }

  // Metoer support
  if ( typeof Meteor !== 'undefined' ) {
    that.TODO  = TODO;
    that.FIXME = FIXME;
    that.XXX   = XXX;
  }

  // support require modules
  if ( typeof module !== 'undefined' ) {
    module.exports = {
      TODO : TODO,
      FIXME : FIXME,
      XXX : XXX
    }
  }
}();
