var decorator = require('./entity_recognition');

decorator.nlpDecorator("hello my name is Barrack Obama.", "facebook", function(t){
	console.log(t);
});

decorator.nlpDecorator("hello my name is Barrack Obama.", "reddit", function(t){
	console.log(t);
});