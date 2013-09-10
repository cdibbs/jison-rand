#!/usr/bin/env node

var ebnfParser = require("ebnf-parser");
var fs = require("fs");
var path = require("path");
var lexParser = require("lex-parser");
var jisonRand = require("./jison-rand").jisonRand;

var version = require('../package.json').version;

var opts = require("nomnom")
  .script('jison-rand')
  .option('file', {
    flag: true,
    position: 0,
    help: 'file containing a Jison grammar'
  })
  .option('lexfile', {
    flag: true,
    position: 1,
    help: 'file containing a Jison lexical grammar'
  })
  .parse();

exports.main = function() {
    if (opts.file) {
        var raw = fs.readFileSync(path.normalize(opts.file), 'utf8');
        var jsonMode = path.extname(opts.file) === '.json' || opts.json;
        var lex;

        if (opts.lexfile) {
            lex = fs.readFileSync(path.normalize(opts.lexfile), 'utf8');
        }
        var grammar = ebnfParser.parse(raw, lex, null, jsonMode);
	if (opts.lexfile) {
            grammar.lex = lexParser.parse(opts.lexfile);
	}
        console.log(jisonRand.gen(grammar));
    } 
};

if (require.main === module)
    exports.main();
