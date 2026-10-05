This app uses firebase realtime database - https://firebase.google.com/docs/database  
deployed page using netlify - https://be26-js2-goodreads.netlify.app  
No other third party APIs are used.

The app is a basic Good Reads web page. It aims to allow users to add books to a clearly displayed list they have curated. Each book is presented in a card that presents the title, author, its read status (unread, being read, finished), what the user scored it out of 5, and how many times the book has been read. The user is also able to remove books they no longer want on their reading list.  
The site uses some basic CSS to keep it easily readable, and minimal HTML.  

The Javascript is broken down into four pages:  
main.js - imports the functions from the other files and combines them to create the web page.  
bookClass.js - contains the class Book which is the base for all cases of book displayed on the page.  
             - contains several methods to interact with the data imported from the database  
firebaseRequest.js - This contains the url for the firebase database, and the functions to both fetch the database and post new books to it.  
createBookCards.js - creates and sets up all HTML elements for each book.  
                   - contains the functions for all buttons found within the display cards to interact with the app.  


all buttons found within the app are self explanitory.  
The "Submit Score" button will be disabled until you select a valid input from the select drop down menu.  

