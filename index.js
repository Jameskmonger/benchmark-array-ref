'use strict';

var MIN_SAMPLES = 1000;
var Benchmark = require('benchmark');
Benchmark.options.minSamples = MIN_SAMPLES;

var suite = new Benchmark.Suite();

var noop = function (val) { };

suite.add('Reference array twice', function() {
    var array = [1, 2, undefined, 4];

    for (var i = 0; i < array.length; i++) {
        if (array[i] !== undefined) {
            noop(array[i]);
        }
    }
})
.add('Reference array once', function() {
    var array = [1, 2, undefined, 4];

    for (var i = 0; i < array.length; i++) {
        var arrayValue = array[i];

        if (arrayValue !== undefined) {
            noop(arrayValue);
        }
    }
})
.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true, 'minSamples': MIN_SAMPLES });
