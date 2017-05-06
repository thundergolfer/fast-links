<<<<<<< HEAD
exports.nlpDecorator = function(text, platform) {
    var request = require('sync-request');
    var api_key = "AIzaSyDSzPlQBcgLbwdRTlmqWQEJbaJcMqNmtV0";

    var res = request('POST', 'https://language.googleapis.com/v1/documents:analyzeEntities?key=' + api_key, {
        json: {
            encodingType: "UTF8",
            document: {
                type: "PLAIN_TEXT",
                content: text
            }
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
    var results = JSON.parse(res.getBody('utf8'));
    console.log(results);
    const entities = results.entities;
    var i = 1;

    // Loop through entities and parse Google's entity to extract relevant information.
    entities.forEach(function(entity) {
        if (entity.hasOwnProperty("metadata")) {
            if (entity.metadata.hasOwnProperty("wikipedia_url")) {

                var new_entity = {
                    link: entity.metadata.wikipedia_url,
                    word: entity.name,
                    ref: i,
                    start_pos: text.indexOf(entity.name) + entity.name.length
                }

                // After producing the relevant information (inside new_entity), update the text based on the platform.
                if (platform === "facebook") {
                    text = text.slice(0, new_entity.start_pos) + "(" + (new_entity.ref).toString() + ")" + text.slice(new_entity.start_pos, text.length - 1);
                    text += "\n";
                    text += "(" + new_entity.ref + "): " + new_entity.word + ": " + new_entity.link;

                } else if (platform === "reddit") {
                    text = text.replace(new_entity.word, "[" + new_entity.word + "](" + new_entity.link + ")");
                }

                i += 1;
            }
        }
    });

    // Return decorated text.
    return text;

}
=======
// Imports the Google Cloud client library
const Language = require('@google-cloud/language')

// Your Google Cloud Platform project ID
const projectId = 'AIzaSyAikcjRGeFF7KqMz1_ocVUMKIHA3_LkAac';

// Instantiates a client
const language = Language({
  projectId: projectId,
  keyFilename: './privatekey.json'
});


exports.nlpDecorator = function(text, platform, callback) {
  // Instantiates a Document, representing the provided text
  const document = language.document({ content: text });

  // Detects entities in the document
  document.detectEntities()
    .then((results) => {
      const entities = results[1].entities;
      var i = 1;

      // Loop through entities and parse Google's entity to extract relevant information.
      entities.forEach(function(entity){
        if(entity.hasOwnProperty("metadata")){
          if(entity.metadata.hasOwnProperty("wikipedia_url")){

          	var new_entity = {
          	  link: entity.metadata.wikipedia_url,
              word: entity.name,
              ref: i,
              start_pos: text.indexOf(entity.name) + entity.name.length
          	}
 
 			// After producing the relevant information (inside new_entity), update the text based on the platform.
            if(platform==="facebook"){
				text = text.slice(0, new_entity.start_pos) + "(" + (new_entity.ref).toString() + ")" + text.slice(new_entity.start_pos, text.length-1);
		        text += "\n";
		    	text += "(" + new_entity.ref + "): " + new_entity.word + ": " + new_entity.link;
			}else if(platform === "reddit"){
				text = text.replace(new_entity.word, "[" + new_entity.word + "](" + new_entity.link + ")" );
			}
            
            i += 1;
          }
        }
      });

      // Return decorated text.
      callback(text);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
}



>>>>>>> 6e2597222db006db3f820b92bca9d60e5c15cacc
