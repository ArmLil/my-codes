'use strict'

const loadTweets = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/tweets', true)

  xhr.onload = function(){
    if(this.status == 200){
      let tweets = JSON.parse(this.responseText)
      let output = '<h4>Tweets</h4>'
      if(tweets.tweets) {
        tweets.tweets.map(tweet => {
          output += `
          <li>
            <form id=tweet-${tweet.id}>
              <label for="user" style="color: ${tweet.colour}"> username: &nbsp ${tweet.user} &nbsp</label>
              <input name="user" type="text" placeholder="update username" autofocus="" >
              <label for="tweet" style="color:${tweet.colour}"> tweet: &nbsp ${tweet.tweet} &nbsp</label>
              <input name="tweet" type="text" placeholder="update tweet" autofocus="">
              <button class="tweetUpdate">Update</button>
              <a name="${tweet.id}" href="${tweet.id}" style="color:${tweet.colour}">id: ${tweet.id} <br> </a>
            </form>
            <button onclick="loadDelete(${tweet.id})">Delete</button>
          </li>`;
        })
      }
      const usersList = document.getElementById("users")
      users.innerHTML = output // after this point that means the ouput is in the DOM

      // load an array with the items
      let tweetsArr = document.getElementsByClassName('tweetUpdate')
      for (let i = 0; i < tweetsArr.length; i++){
          tweetsArr[i].addEventListener('click', loadUpdate)
      }
    }
  }
  xhr.send()
}

loadTweets()
/////////////////////////////////////////////////////////////////////////////

document.getElementById('create').addEventListener('click', loadCreate)
function loadCreate(event){
  event.preventDefault()
  let inputUsername = document.getElementById('inputUsername')
  inputUsername = inputUsername ? inputUsername.value : ''
  let inputTweet = document.getElementById('inputTweet')
  inputTweet = inputTweet ? inputTweet.value : ''
  const params = `user=${inputUsername}&tweet=${inputTweet}`;

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/tweets', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onload = function(){
    loadTweets()
    console.log(this.responseText);
  }
  xhr.send(params); // this build out the post request query
}

///////////////////////////////////////////////////////////////////////////

function loadUpdate(event){
  event.preventDefault()
  let id = event.target.parentElement.id
  id = id ? id.split('-')[1] : null
  let user = event.target.parentElement.querySelector('input[name="user"]')
  let tweet = event.target.parentElement.querySelector('input[name="tweet"]')
  user = user ? user.value : ''
  tweet = tweet ? tweet.value : ''

  if(!id) return window.alert('no id')

  const params = `user=${user}&tweet=${tweet}`;
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', `/api/tweets/${id}`, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onload = function(){
    loadTweets()
    console.log(this.responseText);
  }

  xhr.send(params); // this build out the post request query
}

//////////////////////////////////////////////////////////////////////////

const loadDelete = (id) => {
  console.log('clicked delete button')
  event.preventDefault()

  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', `/api/tweets/${id}`, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onload = function(){
    console.log(this.responseText);
    loadTweets()
  }

  xhr.send(id); // this build out the post request query
}
