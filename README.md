# Secure-Auth-Unity-API<br>

A Node.js-based backend API that provides secure user authentication for Unity applications. It implements bcrypt for password hashing and JWT (JSON Web Tokens) for token-based authentication. Designed for secure login, this project demonstrates the integration of Unity with a PostgreSQL database using modern security standards.

# Overview<br>

This project contains two main components:<br>

**Client Side:** Handles user login and authentication via a Unity frontend.<br>
**Server Side:** Manages backend logic, database interactions, and token-based authentication using bcrypt and JWT.<br>

The user will need to make a few adjustments to the project to align it with their database configuration and schema.<br>

# Server Side<br>

The server-side includes eight key files responsible for authentication, database communication, and token generation.<br>

**File Structure:**<br>
/API<br>
  |-- .env             // Environment variables for database connection and JWT secret.<br>
  |-- server.js                // Main entry point for starting the server.<br>
  |-- db.js                    // Database connection configuration.<br>
  |-- /src<br>
      &nbsp;&nbsp;&nbsp;|-- /BankDetails         // Directory containing all the backend logic related to authentication.<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- auth.js          // Handles bcrypt password comparison and JWT token generation.<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- controller.js    // Controller for processing incoming requests and sending appropriate responses.<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- middleware.js    // Middleware to verify JWT tokens for protected routes.<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- queries.js       // SQL queries for database interactions. Contains placeholders for schema and table name.<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- config.js        // Configuration file for JWT and bcrypt setup.<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- generateHashes.js     // To generate new Hashed passwords if needed<br>
          
#Note: hash codes can be generated and furthermore updated in the postgres database by using below mentioned query:<br>
`UPDATE <Schema.TableName> 
SET password_hash = 'Hashed Value'
WHERE account_number = 'First account number';`<br>

# Steps to Set Up the Server Side:<br>

**# Edit .env File:**<br>
The .env file has been left empty for you to customize based on your own database setup.<br>
You'll need to add the following environment variables:<br>

JWT_SECRET="\<Your JWT Secret>"<br>
BCRYPT_SALT_ROUNDS="\<Your Salt Rounds>" (Default Bcrypt_Salt_Round = 10)<br>
DB_USER="\<Your Database User>"<br>
DB_HOST="\<Your Database Host>"<br>
DB_NAME="\<Your Database Name>"<br>
DB_PASSWORD="\<Your Database Password>"<br>
DB_PORT="\<Your Database Port>"<br>

These values will configure your database connection and password hashing mechanism.<br>

**# Modify queries.js:**<br>
Inside queries.js, replace the placeholders for schema and table names:<br>
"\<your Schema.Tablename>"<br>

This needs to be changed to match your own database structure (e.g., public.Users).<br>
const query = `SELECT * FROM public.Users WHERE account_number = $1`;<br>

# Client Side<br>

The client side is provided in the form of a Unity package that can be directly imported into a Unity project.<br>

**Steps to Set Up the Client Side:**<br>

**Import the Unity Package:**<br>
Download the provided Unity package file from this repository.<br>
In Unity, go to **Assets > Import Package > Custom Package...** and select the package.<br>
This will import the necessary scripts and assets for the login system.<br>

**Configure Backend URL:**<br>
After importing, ensure the backend URL in the Unity login script points to your server’s endpoint.<br>
Example (in Unity script):<br>
string url = `"http://localhost:3000/api/v1/BankDetails";`<br>
Update the URL to match your backend's actual address.<br>

# Test with Unity:<br>
Once everything is configured, you can test the login functionality by running the Unity scene and entering valid credentials.<br>

# Workflow: Frontend and Backend<br>

This section outlines the step-by-step process of how the frontend and backend interact during login.<br>

**Workflow:** <br>How the Frontend and Backend Work Together<br>

**User Interaction (Frontend):**<br>
The user launches the Unity application and enters their Account Number and Password in the login screen.<br>

**Sending Login Credentials:**<br>
Upon clicking "Login," the Unity application sends an HTTP POST request to the backend API (e.g., http://localhost:3000/api/..../login) with the account number and password.<br>

**Backend Receives Request:**<br>
The backend server receives the POST request, extracts the account number and password from the request body, and queries the database to find the user by account number.<br>

**Password Verification:**<br>
The backend fetches the hashed password from the database for the provided account number.<br>
The provided password is compared to the stored hashed password using `bcrypt.compare()`.<br>

**Authentication:**<br>
If the password matches, the backend generates a JWT token, which is signed using the secret from the `.env file`, and sends the token back to the Unity frontend as a response.<br>
If the password does not match, an error response is returned, and the user is informed that the login failed.<br>

**Frontend Receives Token:**<br>
The Unity application receives the JWT token if login is successful.<br>
The token can then be used to authenticate further requests or grant access to other parts of the application.<br>

**Future Requests:**<br>
For any future authenticated requests, the Unity app will attach the JWT token in the headers to prove the user is authenticated.<br>
