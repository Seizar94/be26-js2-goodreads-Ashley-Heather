import { getAllBooks, addBook} from "./firebaseRequest.js"
import { Book } from "./bookClass.js"
import { getBookCard } from "./createBookCard.js"
// import { getBookCard } from "./testCode.js"



const form = document.querySelector("form")
const wrapper = document.querySelector("#bookWrapper")

// Loads all books in database on page load
getAllBooks()
    .then(renderAllBooks)
    .catch(error => console.log(error))

// Submit button to add new book to the database
form.addEventListener("submit", async event =>{
    event.preventDefault()

    const newBookTitle = form.querySelector("#title").value
    const newBookAuthor = form.querySelector("#author").value    
    try{
        const data = await addBook(newBookAuthor, newBookTitle)
        const book = new Book(newBookAuthor, newBookTitle, "", false, 0, false, data.name)
        const card = getBookCard(book)
        wrapper.append(card)
        form.querySelector("#title").value = ""
        form.querySelector("#author").value = ""
    }
    catch(error){
        console.log(error)
    }
})

// function to create and display each book in a card
function renderAllBooks(books) {
    for(const id in books){
        const book = new Book(books[id].author, books[id].title, books[id].score, books[id].isRead, books[id].timesRead, books[id].readStarted, id)
        const card = getBookCard(book);
        wrapper.append(card)
    }
}