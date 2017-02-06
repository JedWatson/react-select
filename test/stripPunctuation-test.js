'use strict';
/* global describe, it, beforeEach */
const expect = require('chai').expect;
const stripPunctuation = require('../lib/utils/stripPunctuation');

describe('Value component', function() {
    it('it should removed punctuation from strings', function() {
        var cases = [
            'I\'m a little teatpot',
            'Im a little teatpot.',
            'Im, a little teatpot',
            'Im/ a little teatpot',
            'Im a little# teatpot',
            'Im a little% teatpot',
            'Im a little teatpot^',
            'Im a little teatpot;',
            'Im a little teatpot*',
            'Im a little teatpot:',
            '{Im a little teatpot}',
            'Im a little= teatpot',
            'Im -a -little -teatpot',
            'Im ~a ~little ~teatpot',
            '(Im a little teatpot)',
            '`Im a little teatpot`'
        ];
        var expected = 'Im a little teatpot';
        cases.forEach( tcase => expect(stripPunctuation(tcase)).to.eql(expected) );
    });
});
