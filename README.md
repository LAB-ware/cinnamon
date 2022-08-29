# cinnamon

A unique sound ID with an inaudible frequency is used during live events listened to by the app to generate an NFT to unlock submarined content.

## Running the Project

### Env

- https://github.com/LAB-ware/environment/blob/main/cinnamon_client.env
- https://github.com/LAB-ware/environment/blob/main/cinnamon_server.env

### Frontend

- `npm start` to start the web-app

### Backend

- `npm start` to start the dev environment

### Mobile

- You can use ngrok to open a tunnel to port 3000 or whichever port you decide to run the app in
- Under the same network you can also enter the IP address the node server is running on

### Walkthrough

- Users will be prompted to enter a 6 digit pin at the event they are attending. In our test case, our 6 digit pin is `746282`.

  <img width="auto" height="400" alt="Screen Shot 2022-08-28 at 7 46 59 PM" src="https://user-images.githubusercontent.com/90666446/187102648-70b7843f-3270-4b2f-be46-cb33192141e3.png">

- Once the correct pin is entered, users are prompted to the sound recording screen.

  <img width="auto" height="400" alt="Screen Shot 2022-08-28 at 7 47 43 PM" src="https://user-images.githubusercontent.com/90666446/187102684-8b8fa8f0-ad50-4328-b87f-eae30d6dfe4e.png">

- With a single press, cinnamon is able to listen and record live audio feed for a continuous 3 seconds. After the recording ends, that audio chunk will be pinned to Piñata and minted into an NFT. Once the user has ownership of the NFT the user will be eligible to unlock exclusive content via submarine.

  <img width="auto" height="400" alt="Screen Shot 2022-08-28 at 7 48 38 PM" src="https://user-images.githubusercontent.com/90666446/187102745-edbc5430-b610-40f5-ba63-7cc6e764bc21.png">
