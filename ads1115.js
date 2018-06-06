const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi()
});

const pga = 6114;

board.on('ready', function() {
  const virtual = new five.Board.Virtual(new five.Expander({ controller: 'ADS1115' }));
  virtual.io.REGISTER.PIN_DATA = 0b10100011; /second byte of config 

  const sensor = new five.Sensor({
    pin: 0,
    board: virtual,
    freq: 250
  });

  sensor.on('data', function() {
    const voltage = this.value * pga / 32768;
    console.log(voltage / 1000);
  });

});
