var futureDate = new Date();
futureDate.setDate( futureDate.getDate() + 2 );
futureDate.setHours( 0, 0, 0, 0 );
futureDate = futureDate.toString();

var pastDate = new Date();
pastDate.setDate( pastDate.getDate() - 2 );
pastDate.setHours( 0, 0, 0, 0 );
pastDate = pastDate.toString();

var futureDateTime = new Date();
futureDateTime.setDate( futureDateTime.getDate() + 2 );
futureDateTime = futureDateTime.toString();

var pastDateTime = new Date();
pastDateTime.setDate( pastDateTime.getDate() - 2 );
pastDateTime = pastDateTime.toString();

var pastVersion   = 'v0.5.0';
var futureVersion = 'v1.5.0';

Tinytest.add( 'TODO exists and is callable', function ( test ) {
  test.isNotNull( TODO );
  test.isTrue( typeof TODO === 'function' );
} );

Tinytest.add( 'FIXME exists and is callable', function ( test ) {
  test.isNotNull( FIXME );
  test.isTrue( typeof FIXME === 'function' );
} );

Tinytest.add( 'XXX exists and is callable', function ( test ) {
  test.isNotNull( XXX );
  test.isTrue( typeof XXX === 'function' );
} );

Tinytest.add( 'TODO options has defaults', function ( test ) {
  TODO.options.reset();
  test.isNotNull( TODO.options() );
  test.instanceOf( TODO.options(), Object );
  test.equal( TODO.options().currentVersion, 'v0.0.0' );
  test.equal( TODO.options().ignore, [] );
  test.equal( TODO.options().log, false );
} );

Tinytest.add( 'TODO option defaults can be overriden', function ( test ) {
  TODO.options.reset();
  TODO.options( {
    currentVersion : 'v1.0.0'
  } );

  test.equal( TODO.options().currentVersion, 'v1.0.0' );
  test.equal( TODO.options().ignore, [] );
  test.equal( TODO.options().log, false );

  TODO.options.reset();
  TODO.options( {
    log : true
  } );

  test.equal( TODO.options().currentVersion, 'v0.0.0' );
  test.equal( TODO.options().ignore, [] );
  test.equal( TODO.options().log, true );

  TODO.options.reset();
  TODO.options( {
    ignore : ['FIXME']
  } );

  test.equal( TODO.options().currentVersion, 'v0.0.0' );
  test.equal( TODO.options().ignore, ['FIXME'] );
  test.equal( TODO.options().log, false );

  TODO.options.reset();
} );

Tinytest.add( 'TODO throws exception using date', function ( test ) { 
  TODO.options.reset();
  var exceptionThrown = false;

  try {
    TODO( 'exception should be thrown', pastDate );
  } catch ( e ) {
    exceptionThrown = true;
  }

  test.isTrue( exceptionThrown );
} );

Tinytest.add( 'TODO does not throw exception using date', function ( test ) { 
  TODO.options.reset();
  var exceptionThrown = false;

  try {
    TODO( 'no exception should be thrown', futureDate );
  } catch ( e ) {
    exceptionThrown = true;
  }

  test.isFalse( exceptionThrown );
} );

Tinytest.add( 'TODO throws exception using datetime', function ( test ) { 
  TODO.options.reset();
  var exceptionThrown = false;

  try {
    TODO( 'exception should be thrown', pastDateTime );
  } catch ( e ) {
    exceptionThrown = true;
  }

  test.isTrue( exceptionThrown );
} );

Tinytest.add( 'TODO does not throw exception using datetime', function ( test ) { 
  TODO.options.reset();
  var exceptionThrown = false;

  try {
    TODO( 'no exception should be thrown', futureDateTime );
  } catch ( e ) {
    exceptionThrown = true;
  }

  test.isFalse( exceptionThrown );
} );

Tinytest.add( 'TODO throws exception using version', function ( test ) { 
  TODO.options.reset();
  TODO.options( {
    currentVersion : 'v1.0.0'
  } );
  var exceptionThrown = false;

  try {
    TODO( 'exception should be thrown', pastVersion );
  } catch ( e ) {
    exceptionThrown = true;
  }

  test.isTrue( exceptionThrown );
  TODO.options.reset();
} );

Tinytest.add( 'TODO does not throw exception using version', function ( test ) { 
  TODO.options.reset();
  TODO.options( {
    currentVersion : 'v1.0.0'
  } );
  var exceptionThrown = false;

  try {
    TODO( 'no exception should be thrown', futureVersion );
  } catch ( e ) {
    exceptionThrown = true;
  }

  test.isFalse( exceptionThrown );
  TODO.options.reset();
} );

Tinytest.add( 'TODO is ignored', function ( test ) {
  TODO.options.reset();
  TODO.options( {
    ignore : ['TODO']
  } );

  var exceptionThrown = false;

  try {
    TODO( 'no exception should be thrown', pastDate );
  } catch ( e ) {
    exceptionThrown = true;
  }

  test.isFalse( exceptionThrown );
  TODO.options.reset();
} );

Tinytest.add( 'TODO checkes for invalid date', function ( test ) {
  TODO.options.reset();

  var exceptionThrown = false;

  try {
    TODO( 'exception should be thrown', 'bad date' );
  } catch ( e ) {
    exceptionThrown = true;
  }

  test.isTrue( exceptionThrown );
  TODO.options.reset();
} );

Tinytest.add( 'TODO throws correct message using date', function ( test ) { 
  TODO.options.reset();
  var exceptionThrown = false;
  var exceptionThrownCorrectly = false;

  try {
    TODO( 'exception should be thrown', pastDate );
  } catch ( e ) {
    exceptionThrown = true;
    exceptionThrownCorrectly = e.message.indexOf( 'exception should be thrown' ) > -1;
  }

  test.isTrue( exceptionThrown );
  test.isTrue( exceptionThrownCorrectly );
} );
