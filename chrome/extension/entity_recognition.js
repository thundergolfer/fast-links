var googleNER = (text, api_key) => {
  var request = require('sync-request');
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

  return entities;
};

var facebookLinkInsert = (text, link_entity) => {
  var new_entity = link_entity;
  text = text.slice(0, new_entity.start_pos) + "(" + (new_entity.ref).toString() + ")" + text.slice(new_entity.start_pos, text.length - 1);
  text += "\n";
  text += "(" + new_entity.ref + "): " + new_entity.word + ": " + new_entity.link;

  return text;
};

var redditLinkInsert = (text, link_entity) => {
  return text.replace(link_entity.word, "[" + link_entity.word + "](" + link_entity.link + ")");
}

var buildTextEntityFromGoogleNerEntity = (entity, index, text) => {
  return {
      link: entity.metadata.wikipedia_url,
      word: entity.name,
      ref: index,
      start_pos: text.indexOf(entity.name) + entity.name.length
  }
}

exports.nlpDecorator = function(text, platform) {
    var request = require('sync-request');
    var api_key = "AIzaSyDSzPlQBcgLbwdRTlmqWQEJbaJcMqNmtV0";

    var entities = googleNER(text, api_key);

    var i = 1; // becomes a footnote number if needed

    entities.forEach(function(entity) {
        if (entity.hasOwnProperty("metadata")) {
            if (entity.metadata.hasOwnProperty("wikipedia_url")) {
                var new_entity = buildTextEntityFromGoogleNerEntity(entity, i, text);
                // After producing the relevant information (inside new_entity), update the text based on the platform.
                if (platform === "facebook") text = facebookLinkInsert(text, new_entity);
                else if (platform === "reddit") text = redditLinkInsert(text, new_entity);

                i += 1;
            }
        }
    });

    return text;
}

module.exports.redditLinkInsert = redditLinkInsert;
module.exports.facebookLinkInsert = facebookLinkInsert;
