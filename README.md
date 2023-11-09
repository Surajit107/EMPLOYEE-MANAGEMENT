###### IPANGRAM MERN TEST ######



# Getting Started with Create React App

This project was bootstrapped with [Create React App].

## Available Scripts

In the project directory, you can run:

### `npm start` (React JS)
### `npm run dev` (Node JS server)

Runs the frontend app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed! 

## Admin Credentials:-
email - [admin@gmail.com]
password - [admin@123]

You can use this admin credentials to login as an admin or you can signup as an user and login.


#### Project Description ####

## Frontend
-- Signup/login page for employees and managers.
-- Page to create, update, and delete the departments (Only managers[super admin] can do that).
-- Page to show all employees.
-- Page for show employees details. (For managers and employees both).
-- Filter button to filter employees according to their location and name in ascending and
descending order. (It is done using the API endpoint not with client-side
javascript code).
-- Managers can assign the departments to employees.


## Backend
-- Login/signup route.
-- Create, read, update, and delete routes for the departments. (Only managers[super admin] can do
that).
-- Create, read, update, and delete employees. (Update and delete only managers[super admin] can do
that).
-- Two endpoints to filter employees. (Need to integrate at the task 5 in frontend)
        a. Give employees an array according to employees' location in ascending order.
        (employees whose locations start with A came at the top)
        b. Give employees in ascending and descending order of their names according to
        the selected filter.


## Note:-
-- Code quality and form validation (node.js side).
-- Used MongoDB ad database.
-- An employee can only see their data, not others.
-- Managers can see departments with assigned employees.
-- Implement the pagination in the front end with the help of backend data.