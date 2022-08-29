# cinnamon

A unique sound ID with an inaudible frequency is used during live events listened to by the app to generate an NFT to unlock submarined content.

## Running the Project

### Frontend

* `npm start` to start the web-app

### Backend

* `npm start` to start the dev environment
* `npm start:prod` to ttart the prod environment

### Walkthrough

* Users will be prompted to enter a 6 digit pin at the event they are attending. In our test case, our 6 digit pin is “123456”.

* Once the correct pin is entered, users are prompted to the sound recording screen.  With a long-press, cinnamon is able to listen to live audio feed and detect patterns in frequencies within the feed. If the frequency captured matches the desired frequency stored by the event host, that audio chunk will be minted into an NFT that is makes the user eligible to unlock exclusive content via submarine. These NFTs will be stored in Piñata. 


### Env

* https://github.com/LAB-ware/environment/blob/main/cinnamon_server.env

### APIs

* https://fakerjs.dev/

### Tools

* Run `python config-set.py server/.env` to migrate env vars to Heroku (first-time only)
