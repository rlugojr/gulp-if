/*jshint node:true */

"use strict";

var through = require('through');
var match = require('gulp-match');

module.exports = function (condition, child, branch) {
    if (!child) {
        throw new Error('gulp-if: child action is required');
    }

    var process = function(file) {

        if (!branch) {
            child.once('data', this.emit.bind(this, 'data'));
        }

        if (match(file, condition)) {
            child.write(file);
            return;
        }

        this.emit('data', file);
    };

    var end = function() {
        child.end();
        this.emit('end');
    };

    return through(process, end);
};
