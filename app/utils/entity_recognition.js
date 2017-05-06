// Imports the Google Cloud client library
const Language = require('@google-cloud/language')

// Your Google Cloud Platform project ID
const projectId = 'AIzaSyAikcjRGeFF7KqMz1_ocVUMKIHA3_LkAac';

// Instantiates a client
const language = Language({
  projectId: projectId,
  keyFilename: './privatekey.json'
});

// The text to analyze, e.g. "Hello, world!"
const text = "A top secret emergency meeting called by Buckingham Palace for today has caused fevered speculation around the world about the future of the Queen and her husband Prince Philip.\nThe Mail revealed last night that Her Majesty's most senior aides have called her entire household from across Britain to London for a 10am summit ahead of a royal announcement.\nBut royal sources have said that internet rumours about the Queen's or the Duke of Edinburgh's health faltering are 'wide of the mark' and the couple are 'fine'.\nThe spokesman refused to say what the meeting is about but added: 'There's no cause for alarm' and the Royal Standard remains at full mast over Buckingham Palace today, meaning there has been no death in the royal family.\nThe Queen met Theresa May in London yesterday to dissolve Parliament for the General Election and Prince Philip opened a new stand at Lords cricket ground and both looked in rude health. Both have royal engagements in the capital later.\nServants from royal residences across the country have been ordered to London and will be addressed this morning at 10am by the Lord Chamberlain, the most senior officer of the Royal Household, as well as Her Majesty’s right-hand man, Private Secretary Sir Christopher Geidt.\n";
function facebookLinkDecorator(text) {
  // Instantiates a Document, representing the provided text
  const document = language.document({ content: text });

  var links = [];
  // Detects entities in the document
  document.detectEntities()
    .then((results) => {
      const entities = results[1].entities;

      var i = 1;
      entities.forEach(function(entity){
        if(entity.hasOwnProperty("metadata")){
          if(entity.metadata.hasOwnProperty("wikipedia_url")){
            var word = entity.name;
            var location = text.indexOf(word) + word.length;
            var link = entity.metadata.wikipedia_url;
            links.push({
              link: link,
              word: word,
              ref: i
            });

            text = text.slice(0, location) + "(" + (i).toString() + ")" + text.slice(location, text.length-1) ;
            i += 1;
          }
        }
        

      });
      links.forEach(function (link_obj){
        text += "\n";
        text += "(" + link_obj.ref + "): " + link_obj.word + ": " + link_obj.link;
      });
      console.log(text);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
   
  

}

facebookLinkDecorator(text);


