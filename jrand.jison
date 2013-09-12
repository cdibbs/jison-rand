%lex

str		"'"[^\\']"'"|"\""[^\\"]*"\""

%%

\s+				/* skip whitespace */
[A-Za-z_][A-Za-z0-9_]+		return 'TOKEN';
"/"[^\\/]*"/"			%{ yytext = yytext.substring(1, yytext.length - 2); return 'REGEX'; %}
"{"[^\\}]*"}"			%{ yytext = yytext.substring(1, yytext.length - 2); return 'CODE'; %}
{str}				%{ yytext = yytext.substring(1, yytext.length - 2); return 'STRING'; %}
"%%".*				%{ yytext = yytext.substring(2); return 'INIT'; %}				
<<EOF>>				return 'EOF';

/lex

%%
file
	: declist init EOF
	{ $$ = [$declist, function() { return eval($init) ?? {}; }]; console.log("%j", $$); }
	;

init
	: INIT
	|
	;

declist
	: decl declist
	{ $$ = $declist; $$[$decl[0]] = $decl[1]; }
	| 
	{ $$ = {}; }
	;

decl
	: TOKEN CODE	
	{ $$ = [$1, function() { eval($2); }]; }
	| TOKEN STRING
	{ $$ = [$1, $2]; }
	| TOKEN REGEX
	{ $$ = [$1, new RegExp($2)]; }
	;

