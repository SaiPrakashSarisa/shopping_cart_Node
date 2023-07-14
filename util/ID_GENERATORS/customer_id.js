const iniqueid = require('generate-unique-id');

exports.generteCustomerId = () => {

    const generated = iniqueid({length : 10, useLetters: false, useNumbers: true});

    return id = 'CUSTOMER' +generated ;
}