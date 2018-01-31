endpoints

***WEB*** respond in html

- [x] / > render all template

/{id} > render single template by id

use the API for these functions
/create?
/{id}?delete
/{id}?update


***API*** respond in JSON

- [x] /api/tweets GET

- [x] /api/tweets POST

- [ ] /api/tweets/{id} PUT

- [ ] /api/tweets/{id} DELETE

- [x] /api/tweets/{id} GET > single tweet


*** SQL ***

- [ ] SELECT TWEETS
- [ ] UPDATE TWEETS
- [ ] DELETE TWEETS


Lesson 5 notes
https://hapijs.com/api
https://github.com/glennjones/hapi-swagger
https://www.npmjs.com/package/vision#jade
https://hapijs.com/tutorials/views

Lesson 5 continued use
https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest


- [ ] added xhr create /api/tweet POST
- [ ] when create is completed, you have to update the tweets, which means you need to run a loadTweets function, that will pull again from the api
