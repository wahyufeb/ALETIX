# ALETIX
#
## API Documentation

## Endpoints for Users

#### Users

| Method | Endpoint                | Detail                |
| ------ | ----------------------- | ----------------------- |
| POST   | [host]/v1/user/registration | Registration for Users |
| POST   | [host]/v1/user/login | Login for Users |
| GET    | [host]/v1/user/profile | Insert Book to Database |
| POST   | [host]/v1/user/profile/update | Update User Profile |

#### Benchs

| Method | Endpoint                | Detail                |
| ------ | ----------------------- | ----------------------- |
| GET    | [host]/v1/benchs/ | Show All Benchs |
| POST   | [host]/v1/bench/create | Create new Bench |
| POST   | [host]/v1/bench/update | Update for Bench |
| DELETE | [host]/v1/bench/delete | Delete for Bench |



## Endpoints for Admin
COMING SOON

#### Steps for Building Rest API with NodeJS & ExpressJS
- ##### Basic Setup
    -   [x] NPM init
    -   [x] Create database (using MySQL) in this project, my database name is aletix
    -   [x] Installing package with NPM in this project I installing
        - express
        - nodemon
        - dotenv
        - sequelize
        - random-string
        - mysql2
        - morgan
        - jsonwebtoken 
        - joi 
        - body-parser
        - bcrypt
    -   [x] Create .env for environment
    ##
- ##### Create file server.js
    -   [x] Require some package
    -   [x] Initiate some package
    -   [x] Call middleware body-parser for allowing req body
    -   [x] Express Listen for port 5000
    ##
- ##### Create Config Folder
    -   [x] Create config for configuring to database
    ##
- ##### Create Models Folder
    -   [x] Create index.js for initiate Sequelize
    -   [x] Create Sequelize model in models folder for create structure table
    -   [x] Create users model
    -   [x] Create benchs model
    -   [x] Create payments model
    -   [x] Create transactions model
    ##
- ##### Create Routes Folder
    -   [x] Create for users router
    -   [x] Create for benchs router
    -   [] Create for payments router
    -   [] Create for transactions router
    ###
-   ##### Create Validation Folder
    -   [x] Initiate Joi for validation
    - Users
        -   [x] Create validation for registration
        -   [x] Create validation for login
        -   [x] Create validation for update user profile
    - Benchs
        -   [x] create validation for create bench
        -   [x] create validation for update bench
    ###
-   #### Create Helper Folder
    -   [x] Create helper for uploading photo using Multer
    -   [x] Create helper for verify JWT to access some routes
    ###
- ##### Create Controllers Folder
    - Create for users controller
        -   [x] Create function for Registration
        -   [x] Create function for Login
        -   [x] Generate JWT after login process
        -   [x] Create function for user profile
        -   [x] Create funciton for update user profile
        -   [x] Create function for uploading user photo
    - Create for benchs controller
        -   [x] Create function for show all benchs
        -   [x] Create function for create bench
        -   [x] Create function for update bench
        -   [x] Create function for delete bench
    - Create for payments controller
        -   []
    - Create for transactions controller



