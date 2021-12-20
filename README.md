# Rest API Showcase

Showcase of a RESTful API based on an old [Rocketseat video](https://www.youtube.com/watch?v=BN_8bCfVp88) but updated to current **ECMAScript** standards (import, export, etc.) and updating it to use a remote MongoDB server.

## Development Stack

- NodeJS;
- MongoDB;
- Express;
- Handlebars (Email Handler);

## Running it in your local machine

### Requirements

- NodeJS (v12+ recommended)
- Yarn (optional)

### 1- Clone the repository

`git clone https://github.com/FelipeSSDev/RestAPIShowcase.git`

### 2- Download dependencies

`npm install` or `yarn install`

### 3- Create the dotenv file

Create a `.env` file in the project's root with the following format:

```
DB_USER = 'foo'
DB_PASSWORD = 'bar'
DB_CLUSTER_NAME = 'baz'
DB_NAME = 'qux'

HASH_SECRET = 'foo'

MAIL_HOST = 'foo'
MAIL_PORT = bar
MAIL_USER = 'baz'
MAIL_PASSWORD = 'qux'
```

### 4- Run the application

`npm run start` or `yarn start`
