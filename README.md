# HERD
## A project to connect volunteers with each other and more opportunities to give back.

A platform to connect volunteers with volunteering opportunities in their city. Built with Javascript/React  on the front-end and NodeJS/Express on the backend connected to a PostgreSQL Database and Amazon Web Services S3 file hosting service.  
Deployed at [join-the-herd.herokuapp.com](https://join-the-herd.herokuapp.com/).

## Screenshots

![Main Page](https://github.com/Nschulz88/HERD_Client/blob/master/docs/MainPage.png)
![Slideout](https://github.com/Nschulz88/HERD_Client/blob/master/docs/SlideOut.png)
![Forms](https://github.com/Nschulz88/HERD_Client/blob/master/docs/Forms.png)

## Important
This project consists of two seperate github repos:
[Client Repo](https://github.com/Nschulz88/HERD_Client)
[Server Repo](https://github.com/Nschulz88/HERD_Server)

## Running the project from Github
1. Clone each repository
2. In separate terminal windows use command "npm install" to install all dependencies for Client and Server.
3. In the Server terminal window use command "knex:migrate latest" to structure the database.
4. Copy the example.env to a new .env and update it with your AWS Key and Token, Google Maps API Key and Twilio Key & Token.  
4. In the Server terminal window use command "node server.js to run the database.
5. In the Client terminal window use command "npm run start" to begin the app.
6. The app will open automatically on your browser.

## Contributors
[Sam Schantz](https://github.com/samvschantz)
[Natalie Schulz](https://github.com/Nschulz88)
[Dominic Bartlomowicz](https://github.com/Dominic-Bartlomowicz)