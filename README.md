
<p align="center">
  <img src="/images/200_200_logo.png">
</p>

# Fast Linking - Google Chrome Extension

`Painlessly embed references into your online comments and posts`g

-----

### Facebook Hackathon 2017:

This project was worked on during a 24 hour Facebook regional hackathon and **earned 2nd Place**. The team consisted of [Avrami](https://github.com/Hammer-Inc), [Apoorv](https://github.com/akan57), [Abdullah](https://github.com/AbdullahShabbir), and [myself](https://github.com/thundergolfer).


------

### Idea

 - #### Improve social comments on various social platforms such as Facebook or Reddit by decorating user comments with links and citations.
 - #### **510,000** messages sent **per minute**
 - #### **4.75 billion pieces** of contact shared **per day.**##


![alt](/images/improved_two.png)
![alt](/images/improved_one.png)


-------

# Development Information

##### Google Cloud NLP API

Interaction with the GCloud NLP API is handled through the *Node.js Client*. The GCloud project is a `fast-links-extension` project in my GCloud account. ["Cloud Natural Language API Client"](https://cloud.google.com/natural-language/docs/reference/libraries) was the article used to get the basics setup.

`app/utils/entity_recognition.js` currently houses the NLP code.
