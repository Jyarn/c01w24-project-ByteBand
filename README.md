# GoHere App

## Description
A mobile app developed for people with Inflammatory Bowel Diseases for the purpose of helping them easily locate nearby washrooms.

## Tools Used
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
<img src="https://mma.prnewswire.com/media/1519349/prismic_logo_Logo.jpg?p=twitter" width="107px" height="27.5px">

## Setup
Clone the repository by running the command in your terminal:
```shell
git clone https://github.com/Jyarn/c01w24-project-ByteBand.git
```

### Install packages
Navigate to the project root and go to the backend directory. Install the required packages by running:
```shell
npm install
```
Once done, navigate back to the project root and go to the frontend directory. Install the required packages by running:
```shell
npm install
```

### Configure constants
The app requires certain constants in order to run. Of these, the most important is the server URL, which contains its host and port.

To configure the default server URL, run the command at the project root:
```shell
sh config-const
```
This will configure server URL to be at host **localhost** and port **4000**, along with other constants.

In cases where the server and the app are hosted on different devices, the server needs to be hosted on something other than **localhost**. To configure the URL to contain some other host and/or port, run:
```shell
sh config-const <your-host> <your-port>
```
This will configure server URL to be at host **your-host** and port **your-port**, along with other constants.

Instructions and documentation for the script can also be found by running:
```shell
sh config-const -h
```

### Start the backend
After completing the previous steps, navigate to the project root and run
```shell
sh startserver
```
which will start the MongoDB database as well as the server.

### Launch the app
After starting the backend, navigate to the frontend directory and run the command
```shell
npm start
```
to launch the app.