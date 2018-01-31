Originaly was implemented in https://github.com/ArmLil/pure-node/tree/master/lesson-5.1
This is a fullstack project which uses

nodejs(hapi js), Jade/pug, sqlite, hapi-swagger, ...

hapi-swager is a plugin to watch and test the API interface in
http://localhost:5000/documentation


The project also includes AJAX (xhr) calls with javascript code switched to templates/tweets.pug file

To run this project clone it from github.
After clone you need to move to  lesson-fullstack-5.0 then install node_modules
cd path/to/todo-ajax-fullstack-5.1
npm install

endpoints

***WEB*** respond in html

- [x] / > render all template

 - /{id} > render single template by id

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
