'use strict';

var fs = require('fs')
    , path      = require('path')
    , handlers  = {}

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function(file) {
        handlers[path.basename(file, '.js')] = require(path.join(__dirname, file));
    })

module.exports = handlers;
