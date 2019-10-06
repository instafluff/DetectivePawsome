// import * as WEE from './eventemitter.js'

class KeyboardClass extends EventEmitter {
  constructor() {
    super();
  }
  keydown( key ) {
    this.emit( "keydown", key );
  }
  keyup( key ) {
    this.emit( "keyup", key );
  }
  update( keys ) {
    this.emit( "update", keys );
  }
}

let keyboard = new KeyboardClass();

var kbState = {};

window.addEventListener( "keydown", ( e ) => {
  keyboard.emit( "keydown", e.key );
  kbState[ e.key ] = 1;
} );
window.addEventListener( "keyup", ( e ) => {
  keyboard.emit( "keyup", e.key );
  delete kbState[ e.key ];
} );

function updateKeyboardStatus() {
  keyboard.emit( "update", kbState );
  requestAnimationFrame( updateKeyboardStatus );
}

requestAnimationFrame( updateKeyboardStatus );
