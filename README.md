# one-degree-backend
---

## Background
6 degrees of separation is the idea that all people are six or fewer connections from each other. That means that two random people on earth are connected by atmost 6 connections. 

Now, If two random people are connected by 6 or fewer connections; that means that your employer, startup investor or romantic partner is one or two degrees away. Now the question becomes *"How do we create meaningful connections by connecting people who are one or two degrees away from each other as they are likely to have many things in common but most importantly help each other in different ways? "*. I present to you **ONE DEGREE**

## ONE DEGREE
One Degree is a messaging web application that connects people through mutual friends. The mutual friend will suggest two people to connect with each other by giving them a reason why they should connect. This will help them skip the small talk and benefit from being connected as they will know what they have in common and why it was important from both to connect. The suggested friends will choose to accept or decline the invitation and they will be able to chat if and only if they both accepted to connect. 
If you suggest people connect and they do; you will gain matching points. You will also be able to browse new people and you will be able to connect with send a connection directly if you think you are a good match with someone else.

## API
The api is built using Nodejs/Express and uses MongoDB as the database
### Getting started
To get started consuming the API; you will need to:
1. Clone the backend repository: https://github.com/Nosenti/one-degree-backend
2. Inside the cloned folder; run `npm install` using the terminal (assuming you have nodejs installed already)
3. Check the example.env file to see the environment variables you need to run the application; create and include them in your .env file.
4. run `npm start` or `npm run dev` for development
5. The server will start locally on the **port 5000**
