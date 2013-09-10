var randExp = require("randexp");

var jisonRand = (function() {
    "use strict";

    var optDefaults = {
        weights : null, // rule weights e.g., { "name" : [1, 9], "subname" : [5, 5] }
        recWeight : null, // recursive weight, 0 - 1.0, applied to all rules
        startRule : null
    };

    function buildString(bnf, lex, start, opts) {
        var b = bnf[start];
        var rule = b[Math.floor(Math.random()*b.length)];
        
    }

    var JisonRand = function() {
    };
    JisonRand.prototype.gen = function(grammar, opts) {
        var start = grammar.start;
        if (opts) {
            for (var opt in opts) {
                if (optDefaults[opt] != null) { opts[opt] = optDefaults[opt]; }
            }
            var start = opts.startRule;
        }
        var bnf = grammar.bnf;
        var lex = grammar.lex;
        if (! start) {
            start = lex[Math.floor(Math.random()*lex.length)];
        }

        console.log(JSON.stringify(grammar, null, 4));
        
        return buildString(bnf, lex, start, opts);
    }

    return new JisonRand();
})();

exports.jisonRand = jisonRand;
