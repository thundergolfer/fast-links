var natural = require('natural'),
    TfIdf = natural.TfIdf,
    tfidf = new TfIdf();

var articles = [
  {title: "Article One",
   body: "Human sexuality is the capacity of humans to have erotic experiences and responses. Someone's sexual orientation can influence that person's sexual interest and attraction for another person"},
  {title: "Philosophy",
   body: "is the study of general and fundamental problems concerning matters such as existence, knowledge, values, reason, mind, and language.[5][6] The term was probably coined by Pythagoras (c. 570 – c. 495 BC). Philosophical methods include questioning, critical discussion, rational argument and systematic presentation."},
  {title: "Football",
   body: "Association football, more commonly known as football or soccer,[3] is a team sport played between two teams of eleven players with a spherical ball. It is played by 250 million players in over 200 countries and dependencies making it the world's most popular sport.[4][5][6][7] The game is played on a rectangular field with a goal at each end. The object of the game is to score by getting the ball into the opposing goal."}
]

tfidf.addDocument("Human sexuality is the capacity of humans to have erotic experiences and responses. Someone's sexual orientation can influence that person's sexual interest and attraction for another person");
tfidf.addDocument("is the study of general and fundamental problems concerning matters such as existence, knowledge, values, reason, mind, and language.[5][6] The term was probably coined by Pythagoras (c. 570 – c. 495 BC). Philosophical methods include questioning, critical discussion, rational argument and systematic presentation.");
tfidf.addDocument("Association football, more commonly known as football or soccer,[3] is a team sport played between two teams of eleven players with a spherical ball. It is played by 250 million players in over 200 countries and dependencies making it the world's most popular sport.[4][5][6][7] The game is played on a rectangular field with a goal at each end. The object of the game is to score by getting the ball into the opposing goal.");

tfidf.tfidfs("Human sexuality is the capacity of humans to have erotic experiences and responses. Someone's sexual orientation", function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});

function rankArticles(comment, articles) {
  TfIdf = natural.TfIdf,
  tfidf = new TfIdf();

  articles.forEach(function(article) {
    tfidf.addDocument(article.body)
  })

  tfidf.tfidfs(comment, function(i, measure) {
    articles[i].score = measure;
  })

  articles.sort(function(a, b){
    var keyA = a.score,
        keyB = b.score;
    // Compare the 2 dates
    if(keyA < keyB) return 1;
    if(keyA > keyB) return -1;
    return 0;
  });

  console.log(articles);
};

var comment = "Human sexuality is the capacity of humans to have erotic experiences and responses. Someone's sexual orientation";
rankArticles(comment, articles);
