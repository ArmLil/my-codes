server side

nodejs(hapi js), sqlite, hapi-swagger, ...

hapi-swager is a plugin to watch and test the API interface in
http://localhost:5000/documentation

if you want to spawn a huge amount of users run spawnTweets.js
node spawnTweets.js

endpoints

***WEB*** respond in html

- [x] / > render all template

/{id} > render single template by id

use the API for these functions
 - /create?
 - /{id}?delete
 - /{id}?update


***API*** respond in JSON

- [x] /api/tweets GET

- [x] /api/tweets POST

- [x] /api/tweets/{id} PUT

- [x] /api/tweets/{id} DELETE

- [x] /api/tweets/{id} GET > single tweet


*** SQL ***

- [x] SELECT TWEETS
- [x] UPDATE TWEETS
- [x] DELETE TWEETS
