## README

### Introduction
This repository contains a simple Node.js server and route controllers built using Express.js for handling HTTP requests. The server is designed to handle basic GET and POST requests and provides basic error handling.

### Installation
1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install dependencies.

### Usage
- Set up environment variables by creating a `.env` file and defining `PORT` and any other required variables.
- Start the server by running `node server.js`.
- The server will run on the specified port, and you can access it through `http://localhost:<PORT>`.

### Server.js
The `server.js` file contains the main server setup, including middleware, routing, error handling, and server startup logic.

### Error Handling
- Custom error handling for 404 Not Found errors.
- General error handling for internal server errors (500).



___
## Folder Structure

#### controllers folder:
- Contains modules responsible for handling business logic and application flow.
- These modules typically contain functions or middleware that interact with data models, perform validations, and orchestrate the flow of data within the application.
- Example: `userController.js`, `authController.js`, etc.

#### routes folder:
- Contains the module responsible for defining application routes and mapping HTTP requests to corresponding controller functions.
- This module utilizes **Express Router** to define routes and associate them with appropriate controller functions.
- Example: `router.js`

#### tests folder:
- Contains test files for unit testing, integration testing, or end-to-end testing of the application.
- These test files utilize testing frameworks like Jest to write and execute tests that verify the functionality of different components of the application.
- Example: `userController.test.js`, etc.
- Currently **npm test** is setup to run the jest tests from this folder