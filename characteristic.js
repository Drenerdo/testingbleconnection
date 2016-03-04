/*jslint node:true,vars:true,bitwise:true,unparam:true */
/*jshint unused:true */

var util = require('util');

var bleno = require('bleno');

var BlenoCharacteristic = bleno.Characteristic;

var FirstCharacteristic = function() {
  FirstCharacteristic.super_.call(this, {
    uuid: 'fc0f',
    properties: ['read', 'write', 'notify'],
    value: null
  });

  this._value = new Buffer("Hello World from ProjectPico!", "utf-8");
  console.log("Characterisitic's value: "+this._value);
    
  this._updateValueCallback = null;
};

util.inherits(FirstCharacteristic, BlenoCharacteristic);

FirstCharacteristic.prototype.onReadRequest = function(offset, callback) {
  console.log('FirstCharacteristic - onReadRequest: value = ' + this._value.toString("utf-8"));

  callback(this.RESULT_SUCCESS, this._value);
};

FirstCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    updateWPASupplicant(JSON.parse(data));
    callback(this.RESULT_SUCCESS);
};

FirstCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('FirstCharacteristic - onSubscribe');

  this._updateValueCallback = updateValueCallback;
};

FirstCharacteristic.prototype.onUnsubscribe = function() {
  console.log('FirstCharacteristic - onUnsubscribe');

  this._updateValueCallback = null;
};

module.exports = FirstCharacteristic;