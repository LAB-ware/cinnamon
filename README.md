# cinnamon

A unique sound ID with an inaudible frequency is used during live events listened to by the app to generate an NFT to unlock submarined content.

## Demo

#### Brace yourself... HIGH PITCH SOUND 🙉

https://drive.google.com/file/d/17seioe0Mf7tlQ2McOgrVEyJtN-_aVfRk/view?usp=sharing

## Running the Project

### Env

- https://github.com/LAB-ware/environment/blob/main/cinnamon_client.env
- https://github.com/LAB-ware/environment/blob/main/cinnamon_server.env

### Backend

- `npm start` to start the dev environment

### Frontend

- `npm start` to start the web-app

### Walkthrough

| Screen      | Description |
| ----------- | ----------- |
| <img height="400" width="500" alt="Screen Shot 2022-08-28 at 7 46 59 PM" src="https://user-images.githubusercontent.com/10108593/187116962-1aa71f93-d722-4de3-b9c1-8ce0d7322fcb.png"> | Users will be prompted to enter their ETH address or connect to MetaMask wallet and a 6 digit pin at the event they are attending. In our test case, our 6 digit pin is “746282” |
| <img height="400" width="500" alt="Screen Shot 2022-08-28 at 7 47 43 PM" src="https://user-images.githubusercontent.com/10108593/187116964-2f4bbe56-eaff-4db0-9e8f-0f6de45d8d72.png"> | Once the correct pin is entered, users are prompted to the sound recording screen. |
| <img height="400" width="500" alt="Screen Shot 2022-08-28 at 7 48 38 PM" src="https://user-images.githubusercontent.com/10108593/187117578-bbfd9e78-090d-4ca4-a140-b6da637903b7.png"> | With a single press, cinnamon is able to listen and record live audio feed for a continuous 3 seconds. After the recording ends, that audio chunk will be pinned to Piñata and minted into an NFT. Once the user has ownership of the NFT the user will be eligible to unlock exclusive content via submarine. |

### Future Enhancements

* Listen for ultrasonic frequencies (currently limited to mic/speaker capabilities of current device)
* Payment for unlockable content
* Notifications and unlockable content based on geolocation
* Unique unlockable content based on frequency patterns
