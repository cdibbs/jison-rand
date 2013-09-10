%lex
%%
word		[a-zA-Z]{1,10}

{word}		return "WORD";
","		return "COMMA";
";"		return "SEMICOLON";
"."|"!"|"?"	return "EOS";

/lex

%start sentence

%%
sentence
	: thought EOS
	| thought SEMICOLON sentence EOS
	;

thought
	: thought-fragment COMMA thought
	| thought-fragment
	;

thought-fragment
	: WORD thought-fragment
	| WORD
	;
