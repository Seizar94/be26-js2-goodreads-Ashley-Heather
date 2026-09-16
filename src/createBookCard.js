export function getBookCard(book) {

    // Creation of the book cards elements.
    const cardDiv = document.createElement("div")
    const bookTitle = document.createElement("h2")
    const bookAuthor = document.createElement("p")
    const isRead = document.createElement("p")
    const isScored = document.createElement("p")
    const scoreSelect = document.createElement("select")
    const submitScore = document.createElement("button")
    const removeBook = document.createElement("button")
    const finishedBook = document.createElement("button")

    // Element settings
    cardDiv.classList.add("bookCard")
    cardDiv.append(bookTitle, bookAuthor, isRead, isScored, scoreSelect, submitScore, removeBook, finishedBook)
    bookTitle.innerText = book.title
    bookAuthor.innerText = book.author

    // Score selection options
    const PH = new Option("", "1")  
    const op1 = new Option("1", "2")  
    const op2 = new Option("2", "3")
    const op3 = new Option("3", "4") 
    const op4 = new Option("4", "5")   
    const op5 = new Option("5", "6")
    scoreSelect.appendChild(PH)
    scoreSelect.appendChild(op1)
    scoreSelect.appendChild(op2)
    scoreSelect.appendChild(op3)
    scoreSelect.appendChild(op4)
    scoreSelect.appendChild(op5)

    isScored.innerText = "Please rate this book"
    submitScore.innerText = "Submit score"
    removeBook.innerText = "Remove book"
    removeBook.classList.add("cardButton")
    finishedBook.classList.add("cardButton")

    // Element visibility based on relevance. Run on page load.
    if(!book.isRead) {
        isRead.innerText = "This book is unread"
        isScored.classList.add("hidden")
        scoreSelect.classList.add("hidden")
        submitScore.classList.add("hidden")
        finishedBook.innerText = "Finish read!"
    } else if (book.isRead) {
        isRead.innerText = "You have read this book"
        isScored.classList.remove("hidden")
        scoreSelect.classList.remove("hidden")
        submitScore.classList.remove("hidden")
        submitScore.classList.add("disable")
        finishedBook.innerText = "Start Read!"
    }
    if(book.score > 0) {
        scoreSelect.classList.add("hidden")
        submitScore.classList.add("hidden")
        isScored.innerText = `You have rated this book: ${book.score} out of 5!`
    }

    // Disables submit button until the selector has a valid input
    submitScore.disabled = true
    scoreSelect.addEventListener("change", () => {
        if (scoreSelect.selectedIndex > 0) {
            submitScore.disabled = false
        } else submitScore.disabled = true
    })

    // Score submit button functionality
    submitScore.addEventListener("click", async () => {
        try {
            const selectedIndex = scoreSelect.selectedIndex
            await book.scoreBook(selectedIndex)
            scoreSelect.classList.add("hidden")
            submitScore.classList.add("hidden")
            isScored.innerText = `You have rated this book: ${selectedIndex} out of 5!`
        }
        catch(error) {
            throw error
        }
    })

// This function creates a key that allows the ternary code below
// to work correctly on all book cards regardless of current state
function toggleKeyFunction() {
    let toggleKey = true
    if (book.isRead) {
        toggleKey = false
        return toggleKey
    } else if (!book.isRead) {
        let toggleKey = true
        return toggleKey
    }
}

    // toggles the book card information using ternary operators
    finishedBook.addEventListener("click", async () => {
        try {
            await book.toggleIsRead()
            isScored.classList = toggleKeyFunction() ? "hidden" : ""
            scoreSelect.classList = toggleKeyFunction() ? "hidden" : ""
            submitScore.classList = toggleKeyFunction() ? "hidden" : ""
            finishedBook.innerText = toggleKeyFunction() ? "Finish Read" : "Start Read"
            isRead.innerText = toggleKeyFunction() ? "This book is unread" : "You have read this book"

            // Resets the score when starting a new read of a previously rated book
            scoreSelect.selectedIndex = undefined
            const selectedIndex = ""
            isScored.innerText = "Please rate this book"
            submitScore.disabled = true
            await book.scoreBook(selectedIndex)
        }
        catch (error) {
            throw error
        }
    }) 

    // Remove book button functionality
    removeBook.addEventListener("click", async () => {
        try {
            await book.remove()
            cardDiv.remove()
        }
        catch (error) {
            throw error
        }
    })
    return cardDiv
}