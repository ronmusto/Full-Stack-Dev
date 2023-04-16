# Full-Stack-Dev

# Architecture
Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
Why did the backend use a NoSQL MongoDB database?

The express HTML page was designed to be a customer facing web application which was static and unchangeable by the user. Javascript was what allowed me to add logic to the website, an example being creating routes and controllers for the various paths through the site. The SPA was the most functional and served as an admin page with a secure login and the ability to edit the customer facing site without having to know how to code. MongoDB was the ideal solution for the database here as NoSQL is much better to work with when the data is not related like in this case. The data for users and the trip information did not need to be in a relational state like in a traditional SQL database. 

#Functionality
How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.

JSON is different from Javascript primarily because JSON is a way to store and send information while Javascript is a full programming language that lets me direct the logic of what happens to the information in the JSON file. JSON is necessary to tie the front and back end together because this is the medium through which they send information to communicate with each other. A major example of refactoring to improve efficiency would be changing most of the html in the site to a handlebars layout which allowed us to save hundreds of lines of code throughout the website. Being able to reuse something like the header saved quite a bit of time and made it so that people can make changes easier in the future by simply changing the header UI file and that will update on every webpage.

#Testing
Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

In this application we used the methods GET, PUT, POST and DELETE to interact with the API of the website. Everything but GET must be protected by front and back end security to ensure that people without authorization are only able to retrieve information from the web application and not to change it. The GET request depending on what is attached to it is what tells the API which endpoint to send you to, which would be something like /api/trips.

#Reflection
How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

This was the first time that I have developed with a full stack like MEAN so this has been invaluable to my growth as a developer as I now know the process of working with multiple languages and software to get them all to tie together into one neat application. I think that having the ability to build a secure web application will greatly increase my career potential as I can now use this same logic to build other kinds of web applications to serve whatever purpose I may have in the future.
