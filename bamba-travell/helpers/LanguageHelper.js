'use strict'

const fs = require('fs');

/**
 * Load the selected language file
 * 
 * @param {*} lang 
 * @param {*} path 
 */
exports.load = async (lang, path) => {
    let translation = {};
    let fullPath =  path + '/' + lang + '.js';

    if (fs.existsSync('./' + fullPath)) {
        translation = require('../' + fullPath);
    } else {
        throw 'Error the language file does not exist'; 
    }
     
    return translation;
};

/**
 * returns the translated line in the selected language
 * 
 * @param {*} line 
 */
exports.lang = async(line)  => {
    let trans = '';

    if(typeof global.translation[line] != 'undefined') {
        trans = global.translation[line];
    }
    
    return trans;
};

/**
 * Retrieve the language that is being used
 */
exports.getLang = async () => {
    return global.lang;
};