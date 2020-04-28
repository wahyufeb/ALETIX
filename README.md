# ALETIX
#
## API Documentation

## Endpoints for Users

#### Users
| Method | Endpoint                | Detail                |
| ------ | ----------------------- | ----------------------- |
| POST   | [host]/v1/user/registration | Registration for New User |
| POST   | [host]/v1/user/login | Login for Users |
| GET    | [host]/v1/user/profile | User Profile Detail |
| POST   | [host]/v1/user/profile/update | Update User Profile |
#

#### Benchs
| Method | Endpoint                | Detail                |
| ------ | ----------------------- | ----------------------- |
| GET    | [host]/v1/benchs/:id_movie | Benchs Schedule Movie |
#

#### Movie Schedule
| Method | Endpoint                | Detail                |
| ------ | ----------------------- | ----------------------- |
| GET    | [host]/v1/movie/schedule | Get All Movie Schedule |
| GET    | [host]/v1/movie/detail/:id_movie | Detail Movie Schedule |
| GET    | [host]/v1/movie/search | Search Movie & Schedule |
#

#### Transactions
| Method | Endpoint                | Detail                |
| ------ | ----------------------- | ----------------------- |
| POST   | [host]/v1/transaction/create | Add New User Transaction (call to MIDTRANS API for payment method) |
| GET    | [host]/v1/transaction/my-transaction | User Transaction |
| GET    | [host]/v1/transaction/my-transaction/detail | User Transaction Detail |
#

## Endpoints for Admin
#### Auth
| Method | Endpoint                | Detail                |
| ------ | ----------------------- | ----------------------- |
| POST   | [host]/v1/admin/auth/registration | Add New Admin |
| POST   | [host]/v1/admin/auth/login | Login for Admin |
| GET    | [host]/v1/admin/auth/profile | Admin Profile |
| POST   | [host]/v1/admin/auth/profile/update | Update Admin Profile |
#

#### Benchs
| Method | Endpoint                | Detail                |
| ------ | ----------------------- | ----------------------- |
| GET    | [host]/v1/admin/bench/  | Get All Benchs |
| POST   | [host]/v1/admin/bench/create | Create New bench |
| POST   | [host]/v1/admin/update/:id_bench| Update Bench |
| DELETE | [host]/v1/admin/bench/delete/id:bench | Delete Bench |
#

#### Movie Schedule
| Method | Endpoint                | Detail                |
| ------ | ----------------------- | ----------------------- |
| GET    | [host]/v1/admin/movie/schedules  | Get All Movie Schedule |
| GET    | [host]/v1/admin/movie/search | Search Movie Gobaly (call to THEMOVIEDB API) |
| POST   | [host]/v1/admin/movie/schedule/create | Create New Movie Schedule (call to THEMOVIEDB API for movies details) |
| POST   | [host]/v1/admin/movie/schedule/update/:id_movie | Update Movie Schedule |
| DELETE | [host]/v1/admin/movie/delete/delete/:id_movie | Delete Movie Shedule |
#

#### Transactions
| Method | Endpoint                | Detail                |
| ------ | ----------------------- | ----------------------- |
| GET    | [host]/v1/admin/transaction/all-transaction  | Get All Users Transaction |
| PUT    | [host]/v1/admin/transaction/approve/:id_transaction | Approve for Users Transaction/Payment |
#



#
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
    -   [x] Create Movie Today model
    -   [x] Create payments model
    -   [x] Create transactions model
    ##
- ##### Create Routes Folder
    -   [x] Create router for users 
    -   [x] Create router for benchs 
    -   [x] Create router for movie today 
    -   [x] Create router for payments 
    -   [x] Create router for transactions 
    ###
-   ##### Create Validation Folder
    -   [x] Initiate Joi for validation
    - Users
        -   [x] Create validation for registration
        -   [x] Create validation for login
        -   [x] Create validation for update user profile
    - Benchs
        -   [x] Create validation for create bench
        -   [x] Create validation for update bench
    - Movie Schedule
        -   [x] Create validation for create and update schedule
    - Transaction
        -   [x] Create validation for create transaction
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
    - Create for movie today controller
        -   [x] Create function for all movies schedule today
        -   [x] Create funciton for create movies schedule
        -   [x] Create function for detail movies schedule
        -   [x] Create funciton for update movies schedule
    - Create for payments controller
        -   []
    - Create for transactions controller
        -   [x] Create function for create new transaction



