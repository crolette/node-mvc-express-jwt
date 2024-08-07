[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/89tEZwpA)
# "Express JS Tutorial - User Authorization"

**Dave Gray ownership**

This repo is a copy of a repo from [Dave Gray](https://www.davegray.codes/)

Your can find the source [here](https://github.com/gitdagray/user_auth)

✅ [Check out the Dave's Gray YouTube Channel with all of his tutorials](https://www.youtube.com/DaveGrayTeachesCode).

## Description

This repository shares the code applied during a Youtube tutorial made by Dave Gray. To complete the challenge, you can complete the tutorial here: [JWT Authentification in an Express app](https://www.youtube.com/watch?v=favjC6EKFgw&list=PL0Zuz27SZ-6P4vnjQ_PJ5iRYsqJkQhtUu&index=6).  

**The mission:**

We gevi you a pre-made code. It's a simple application made with Express and an architecture MVC (Model-View-Controller). This app stores users in a json file. The users are able to connect to the app via a password. But we would like to add a security layer.

So the goal is to implement a JWT authorization. 

Your implementation should use the [jsonwebtoken NPM package](https://www.npmjs.com/package/jsonwebtoken), specifically the `sign()` and `verify()` method.

- Create a strong secret key, and put it in an [gitignored `.env` file](https://www.npmjs.com/package/dotenv)
- Create a `POST` route in which you can connect to the with an user. Inside that route create a token using the `JWT.sign` method, that contains the username, a passsword, and sign it using your secret key.
- Create a middleware to validate the token, using the `JWT.verify` method.
- Create a token-protected route by using your middleware. To access this route the user should add their token in their `Authorization` request header.

**use the app:**

Install packages: `npm install`

Run the server: `npm run dev`

The routes :
- The homepage: `localhost:3500/`
- Register a user: `localhost:3500/register`
- Login: `localhost:3500/auth`

### Academic Honesty

Avoid plagiargism and adhere to the spirit of this [Academic Honesty Policy](https://www.freecodecamp.org/news/academic-honesty-policy/).
