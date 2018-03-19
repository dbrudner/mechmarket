const expect  = require('chai').expect;
const keyboard = require('../app/models/keyboard')

describe('meme', function() {
    it('should be invalid if name is empty', function(done) {
        const keyboardInstance = new keyboard();

        keyboardInstance.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
});