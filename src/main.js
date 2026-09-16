import { getAllBooks, addBook} from "./firebaseRequest.js"
import { Book } from "./books.js"
import { getBookCard } from "./createBookCard.js"

const form = document.querySelector("form")
const wrapper = document.querySelector("#bookWrapper")

getAllBooks()
    .then(renderAllBooks)
    .catch(error => console.log(error))







form.addEventListener("submit", async event =>{
    event.preventDefault()

    const newBookTitle = form.querySelector("#title").value
    const newBookAuthor = form.querySelector("#author").value    
    try{
        const data = await addBook(newBookAuthor, newBookTitle)
        const book = new Book(newBookAuthor, newBookTitle, "", false)
        const card = getBookCard(book)
        wrapper.append(card)
        form.querySelector("#title").value = ""
        form.querySelector("#author").value = ""
    }
    catch(error){
        console.log(error)
    }
})








function renderAllBooks(books) {
    for(const id in books){
        const book = new Book(books[id].author, books[id].title, books[id].score, books[id].isRead, id)
        const card = getBookCard(book); // getBookCard returns a div
        wrapper.append(card)
    }
}