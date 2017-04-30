// Imports the Google Cloud client library
const Language = require('@google-cloud/language');

// Your Google Cloud Platform project ID
const projectId = 'fast-links-extension';

// Instantiates a client
const language = Language({
  projectId: projectId
});

// The text to analyze
const text = "Michelangelo Caravaggio, Italian painter, is known for 'The Calling of Saint Matthew'.";

// Detects the sentiment of the text
language.detectEntities(text)
  .then((results) => {
    const entities = results[0];

    console.log(`Text: ${text}`);
    console.log(`Entities:`)
    console.log(entities);
    console.log(results[1]);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
