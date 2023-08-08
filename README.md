# Picture Encryption Application

This is an application to encrypt or decrypt pictures by shuffling its pixels, optionally with or without entering a password. You can upload your own or use a provided sample picture. After the de-/ encryption process you can download the newly created picture.

## Run locally

In order to start both, the frontend and the backend server, we need two terminals. These commands are tested in a Linux (Debian) environment.

Open a Terminal and clone the project:
```ssh
git clone git@github.com:Philippovitsch/picture-encryption-application.git
```

Navigate to the backend directory to start the backend:
```ssh
mvn spring-boot:run
```

In a second terminal navigate to the frontend folder to install the dependencies and to start the frontend:
```ssh
npm install && npm run dev
```

When both servers are running, open the following link in your browser to open the application: http://localhost:5173/.

## Screenshots

Landing page with the encrypted picture already created:
![image](https://raw.githubusercontent.com/Philippovitsch/picture-encryption-application/master/screenshots/5-encrypt-sample-picture.jpg)

Modal Window with the original picture:
![image](https://raw.githubusercontent.com/Philippovitsch/picture-encryption-application/master/screenshots/4-modal-sample-picture.jpg)

Modal Window with the encrypted picture:
![image](https://raw.githubusercontent.com/Philippovitsch/picture-encryption-application/master/screenshots/6-modal-encrypted-picture.jpg)

More screenshots are available in the [screenshots](https://github.com/Philippovitsch/picture-encryption-application/tree/master/screenshots) folder...
