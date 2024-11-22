# Inkwell API

This is an API built for the purpose of supporting the front end website Inkwell, see front end repo [here](https://github.com/Auchendale/inkwell-frontend).

A hosted version of the API can be found here: https://inkwell-backend-kvij.onrender.com/api/

Due to the free service used to host the API it can be slow to respond at first, if you have issues accessing the API please wait one minute and then refresh.

## Cloning this Repo

In order to clone this repo. Navigate to your destination directory and run:

> git clone https://github.com/Auchendale/inkwell-backend.git

## Installing Dependencies

In order to run this API you will require npm and certain dependencies. In your terminal run: 

> npm install --dev

## Setting up Databases
In order to set up the databases to run this .api you will need to add a .env file to the root of the directory: 
* .env

These files should contain:
>DATABASE_URL = mongodb+srv://charliesolomon99:InkWell1@cluster0.cmhbo.mongodb.net/

## Seeding Databases

In order to seed the development database run:

 > npm run seed

 ## Host Locally

 In order to host the API locally run:

 > npm run start

 ## Testing

 The test suite can be run with:

 > npm test endpoints 

## Using the API
A list of all endpoints and their functions can be found [here](https://inkwell-backend-kvij.onrender.com/api/)

## Minimum Requirements

In order to run this API you must have minimum version of node of 22.2.0 