# E-commerce shopping site
This is a sample application that demonstrates an E-commerce app. The application loads products a MongoDB database and displays them. Users can select items and add them to their shopping cart

# Tech Stack
Next.js
Node.js
Express.js
MongoDB
JWT (JSON Web Tokens) for authentication
Supertest (for testing)

## Description

The E-commerce app is a full-stack web application built using Node.js, Express.js, MongoDB, and Next.js. It provides a user-friendly interface for users to browse products, add them to their shopping cart.

## Features
- User registration
- User authentication login
- Product listing
- Shopping cart functionality (add, update, remove items)

## Getting Started

server folder contails the node app: command to run->  npm run dev it runs on 8080 port
client folder contains the client app: command to run->  npm run dev it runs on 3000 port

To run node test cases: command-> npx jest

Additional: 

I have added redux files in both formate one is thunk and other is inside reducer directly

Created an extra get cart details as per user API that gives the list of cart items for the user

Added postman collectoin JSON file in server folder ecommerce app.postman_collection.json

Database: 

- MongoDB URL : mongodb+srv://mihirgajjar:oQZjPeNJvNgkB5jV@cluster0.xl8o0uw.mongodb.net/e-commerece
