# Simple Blogging Platform
## Project Setup

**Clone the Repository**
   ``` bash
   git clone https://github.com/soubky0/blog-app.git
   cd blog-app
   ```
### Running with docker

1. Create a .env file using .env.docker.example (Optional: you can keep the default configuration and it would work fine):
    - **PORT** is the port that the server would run on
    - **POSTGRES_USER** is the username that will be created in the postgres docker image
    - **POSTGRES_PASSWORD** is the password that will be created in the postgres docker image
    - **POSTGRES_DB** is the db name that will be created in the postgres docker image
    - **DATABASE_URL** contains db info that prisma client would run onto so make sure that it has the same credentials as the env variables and use "db" instead of "localhost" as hostname.
    - **REDIS_URL** is the url for the redis docker image
    - **JWT_SECRET** is used in encrypting the jwt token
3. Run the docker compose build command:
   ``` bash
   docker-compose up --build
   ```
### Running locally
1. Install packages with
``` bash
npm install
```
2. Create a database using psql or pgadmin (you can skip if you have an existing db) 
3. Create a .env file using .env.example (Optional: you can keep the default configuration and it would work fine):
   - **PORT** is the port that the app would run on
   - **DATABASE_URL** use your username in USERNAME placeholder, password in PASSWORD, and the database name you created instead of DATABASE_NAME
   - **JWT_SECRET** is used in encrypting the jwt token
   - **START_PRISMA_STUDIO** change it to true if you want a web ui that visualizes the database
   - **PRISMA_STUDIO_PORT=9090** is the port that would prisma studio would run in
4. Generate prisma client and run migrations
``` bash
npx prisma generate
npm run migrate
```
5. Run docker image of redis
``` bash
 docker run --name redis -p 6379:6379 -d redis
```
6. Start the server
```
npm start
```

### Testing
To run tests:
``` bash
npm test
```
### API Endpoints

The API documentation is available [here](https://documenter.getpostman.com/view/33109124/2sA3QqhDkg).

#### User Endpoints

- Register: POST /api/register
- Login: POST /api/login
- Get User Profile: GET /api/users/:id

#### Post Endpoints

- Create Post: POST /api/posts
- Get All Posts: GET /api/posts
- Get Post by ID: GET /api/posts/:id
- Update Post: PUT /api/posts/:id
- Delete Post: DELETE /api/posts/:id

#### Comment Endpoints
- Create Comment: POST /api/posts/:postId/comments
- Get Comments for Post: GET /api/posts/:postId/comments
- Update Comment: PUT /api/comments/:id
- Delete Comment: DELETE /api/comments/:id
