# cinnamon

A unique sound ID with an inaudible frequency is used during live events listened to by the app to generate an NFT to unlock submarined content.

## Running the Project

### Frontend

* `npm start` to start the web-app

### Backend

* `npm start` to start the dev environment
* `npm start:prod` to start the prod environment

### Walkthrough

* Users will be prompted to enter a 6 digit pin at the event they are attending. In our test case, our 6 digit pin is “123456”.
<img width="auto" height="400" alt="Screen Shot 2022-08-28 at 7 46 59 PM" src="https://user-images.githubusercontent.com/90666446/187102648-70b7843f-3270-4b2f-be46-cb33192141e3.png">

* Once the correct pin is entered, users are prompted to the sound recording screen.  
<img width="auto" height="400" alt="Screen Shot 2022-08-28 at 7 47 43 PM" src="https://user-images.githubusercontent.com/90666446/187102684-8b8fa8f0-ad50-4328-b87f-eae30d6dfe4e.png">

* With a single press, cinnamon is able to listen to live audio feed and detect patterns(beacons) in frequencies within the feed for a continuous 3 seconds. If the audio chunk contains the frequency matching the desired frequency stored by the event host, that audio chunk will be minted into an NFT that makes the user eligible to unlock exclusive content via submarine. These NFTs will be stored in Piñata. 
<img width="auto" height="400" alt="Screen Shot 2022-08-28 at 7 48 38 PM" src="https://user-images.githubusercontent.com/90666446/187102745-edbc5430-b610-40f5-ba63-7cc6e764bc21.png">



### Env

* https://github.com/LAB-ware/environment/blob/main/cinnamon_server.env

### APIs

* https://fakerjs.dev/

### Tools

* Run `python config-set.py server/.env` to migrate env vars to Heroku (first-time only)
