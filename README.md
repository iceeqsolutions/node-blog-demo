# Node/MongoDB Application - Movie Quotes Blog

![](./public/NodeBlog.png)

<p align="center">
  Node Blog Demo by <a href="https://iceeqsolutions.fi/">iCeeqSolutions</a>
</p>

## About

The Movie Quotes Blog is a Node demo project demonstrating the use of MVC structure, the possibility to connect to an external database (MongoDB) and the use of environment variables to allow database access without sharing the actual connection string.

In MongoDB, we've used triggers to schedule database resets. This way any inserts and deletions are visible only for a short period of time (5 minutes), before resetting the app to its original state. This in turn allows users to freely test the application without consequences.

## Demo

👁️ To test out the app, you need to:
1) Clone the repo
2) Copy the data.json content and upload it to your own MongoDB cluster
3) Add the necessary settings to your .env -file (see .env_EXAMPLE -file)
4) Launch the app


## Built with

- JavaScript (Node with ESM syntax)
- Express
- EJS
- CSS
- dotenv
- MongoDB
- Mongoose
- Prettier

## Features

- Database access with create, read and delete rights
- Responsive design
- Environment variables
- Asynchronous data fetching

<br/><br/>

<p align="center"><a href="https://iceeqsolutions.fi/"><img height="61px" width="300px" src="./public/iCS_Logo_Light.png"></a></p>
<br/><br/>
