# coding-challenge
This is a take-home coding challenge that involves creating a Node.js API with MySQL integration and a cron job.
## Overview
The application is built using Node.js and Express, with a MySQL database managed using the Sequelize ORM. The project structure includes the following files:
- `app.js`: The main entry point of the application, setting up the Express server, connecting to the database, and mounting the user API routes.
- `db.js`: Handles the connection to the MySQL database using Sequelize.
- `user.model.js`: Defines the User model and the database schema.
- `user.controller.js`: Defines the API routes and controllers for managing users.
- `db.sql`: Contains the SQL scripts for setting up the database schema and seeding the users table with initial data.
- `cron.js`: Implements a cron job that runs daily to send a report of new users added in the last 24 hours.
- `email.service.js`: Handles the sending of the daily user report email using SendGrid.
## Features
The \"coding-challenge\" application provides the following features:
1. **User API**: Implements a RESTful API for managing users, including endpoints for fetching all users, fetching a single user by ID, creating a new user, updating an existing user, and deleting a user.
2. **Input Validation**: The API validates the input data and handles errors gracefully, such as responding with appropriate error messages for missing or duplicate data.
3. **Cron Job**: Implements a daily cron job that fetches the users created in the last 24 hours and sends a summary report to the admin email address.
4. **Documentation**: Provides a README file with detailed instructions on setting up the project and using the API.
## Getting started
### Requirements
- Node.js (version 12 or higher) [Node.js downloads](https://nodejs.org/en/download)
- MySQL (version 5.7 or higher) which can easily be installed with `brew install mysql` or as a downloadable installer on the [MySQL website](https://www.mysql.com/downloads/).
- SendGrid API key (for sending the daily user report email)
### Quickstart
1. Clone the repository:
```
git clone https://github.com/your-username/coding-challenge.git
```
2. Install the dependencies:
```
cd coding-challenge
npm install
```
3. Set up the MySQL database:
   - Run the following command to create the database and tables:
      ```
      npm run db:migrate
      ```
   - This will create a new database on your machine called `coding_challenge` and seed it with sample data.
4. Configure the environment variables:
   - Create a `.env` file in the project root directory
   - Add the following variables:
      - `SENDGRID_API_KEY`: {Your SendGrid API key}
      - `ADMIN_EMAIL`: {The email address to receive the daily user report}
      - `SENDER_EMAIL`: {The email address to use as the sender for the daily report}
   - OR add the preceding variables to your local environment (ie: `export SENDGRID_API_KEY=tysiuOIUiUHiu23j499kjs)
5. Start the server:
```
npm start
```
6. The server will start running on `http://localhost:3000`