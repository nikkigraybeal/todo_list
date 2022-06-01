Todo List allows users to create a user account by logging in and enter and save todo items. 

I built this app to practice my Javascript skills and to learn how to use firebase firestore and authentication. Bonus! I got to learn a little about webpack too. I'm still pretty unclear about it's use but I made it work and can at least navigte the documentation without too much sweating.

How it works: users signup or login and then can use the expandable form to create a new todo with due date and details. Todos are listed in due date order and can be deleted upon completion. Details and due date of todo can be expanded and collapsed for easy viewing.

Where to view and try it: https://todo-list-16832.web.app/

Next steps: I would like to make the div that holds the todo name responsive. I coudn't figure out how to target and style individual todos. Everything I tried would cause ALL of the todo items to expand to fit the longest todo. 

Add error and loading messages. I noticed that previously logged-in users' todos will appear onscreen before the current user's todos are loaded. I haven't thought through why this is happening yet, but I think I can add a "...loading" message in the UI while a new user is being logged in or signed up. 
I would also like to add error messaging for login and signup errors. I think firebase auth has built in error messages, I just need to figure out how to access them and display them in the UI. 

What I learned and what I still need to learn: 

Figma: My first attempt at a wireframe! https://www.figma.com/file/tc57blOv2ceKYHOibxdkdT/todo-list?node-id=0%3A1

JavaScript: I learned how to target dynamically created elements and add click events to them. I'm also feeling a little bit more comfortable with asyncronous functions. More to learn there though! I went into this project hoping to use classes but I couldn't quite wrap my head around the benefit or if it even makes sense. I felt like I had a good handle on OOP fundamentals with Ruby, but I'm having a hard time translating that knowledge to JavaScript and frontend development. I also had a more complicated design to begin with that allowed users to add sub-todos. I ultimately had to abandon including this functionality though because it became too complex and time consuming. I think React would make adding this feature easier so I may try again using that.

Firebase/firestore: I can set up a project, database and authentication. I also learned how to write firestore rules to limit who can access data. I *think* my rules are set up correctly, but I'm not 100% confident. I also set up hosting and deployed the app, but I have a lot to learn in this area. I mostly followed the instructions in the documentation and prayed to the computer gods that it would work. Luckily, it did, but I am woefully foggy on backend concepts at this point! 

Webpack: Well, I kind of understand what it does and, in retrospect, I'm pretty sure this little project doesn't need it. I know React sets webpack up automatically, but I'm glad I at least know how to navigate the docs now and can do a deep dive if necessary. 
