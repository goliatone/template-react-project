'use strict';
const slug = require('slug');

slug.defaults.mode = 'rfc3986';
slug.defaults.modes['rfc3986'] = {
    replacement: '-', // replace spaces with replacement
    symbols: true, // replace unicode symbols or not
    remove: null, // (optional) regex to remove characters
    lower: true, // result in lower case
    charmap: slug.charmap, // replace special characters
    multicharmap: slug.multicharmap // replace multi-characters
};

module.exports = [{
        type: 'input',
        name: 'name',
        message: 'Whats is the name of the project?'
    }, {
        type: 'input',
        name: 'moduleName',
        default: function(answer) {
            return slug(answer.name);
        },
        message: 'What is the name of the module? This will be used for the repo URL'
    },
    {
        type: 'input',
        name: 'license',
        message: 'What license?',
        default: function() {
            return 'MIT';
        }
    },
    {
        type: 'input',
        name: 'descripton',
        message: 'Short project descripton'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Author email'
    },
];
