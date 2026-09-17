// Page creates each book card and the functionality of the buttons contained within.
export function getBookCard(book) {

    const cardDiv = document.createElement("div")
    const bookTitle = document.createElement("h2")
    const bookAuthor = document.createElement("p")
    const isReadText = document.createElement("p")
    const isScored = document.createElement("p")
    const scoreSelect = document.createElement("select")
    const submitScore = document.createElement("button")
    const removeBook = document.createElement("button")
    const startRead = document.createElement("button")
    const isReadToggle = document.createElement("button")

    elementSettingsOnLoad()
    submitButtonDisabledStatus()
    startReadButton()
    isReadToggleButton()
    submitScoreButton()
    removeBookButton()

    function elementSettingsOnLoad() {
        cardDiv.classList.add("bookCard")
        cardDiv.append(bookTitle, bookAuthor, isReadText, isScored, scoreSelect, submitScore, startRead, isReadToggle, removeBook)
        bookTitle.innerText = book.getTitle()
        bookAuthor.innerText = book.getAuthor()

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
        startRead.innerText = "Start Read"
        startRead.classList.add("cardButton")
        isReadToggle.classList.add("cardButton")
        removeBook.innerText = "Remove book"
        removeBook.classList.add("cardButton")

        // Element visibility. Run on page load.
        if (!book.getIsRead()) {
            isReadText.innerText = "This book is unread"
            isScored.classList.add("hidden")
            scoreSelect.classList.add("hidden")
            submitScore.classList.add("hidden")
            isReadToggle.innerText = "Finish Read"
        } else if (book.getIsRead()) {
            isReadText.innerText = "You have finished reading"
            isScored.classList.remove("hidden")
            scoreSelect.classList.remove("hidden")
            submitScore.classList.remove("hidden")
            submitScore.classList.add("disable")
            startRead.classList.add("hidden")
            isReadToggle.innerText = "Start New Read"
        }
        if (book.getReadStarted()) {
            isReadText.innerText = "You are currently reading this book"
            startRead.classList.add("hidden")
        }
        if (book.getTimesRead() > 0) {
            isReadText.innerText = `You have read this book ${book.getTimesRead()} times`
        }
        if (book.getScore() > 0) {
            scoreSelect.classList.add("hidden")
            submitScore.classList.add("hidden")
            isScored.innerText = `You have rated this book: ${book.getScore()} out of 5!`
        }
    }

    function submitButtonDisabledStatus() {
        submitScore.disabled = true
        scoreSelect.addEventListener("change", () => {
            if (scoreSelect.selectedIndex > 0) {
                submitScore.disabled = false
            } else submitScore.disabled = true
        })
    }

    function submitScoreButton() {
        submitScore.addEventListener("click", async () => {
            try {
                const selectedIndex = scoreSelect.selectedIndex
                await book.scoreBook(selectedIndex)
                scoreSelect.classList.add("hidden")
                submitScore.classList.add("hidden")
                isReadText.innerText = `You have read this book ${book.getTimesRead()} times`
                isScored.innerText = `You have rated this book: ${selectedIndex} out of 5!`
            }
            catch(error) {
                throw error
            }
        })
    }

    function startReadButton() {
        startRead.addEventListener("click", async () => {
            try {
                await book.toggleReadStarted()
            isReadText.innerText = "You are currently reading this book"
            startRead.classList.add("hidden")
            }
            catch (error) {
                throw error
            }
        })
    }

    function toggleKeyFunction() {
        let toggleKey = book.getIsRead()
        toggleKey = !toggleKey
        return toggleKey
    }
    function isReadToggleButton() {
        isReadToggle.addEventListener("click", async () => {
            try {
                let timesRead = book.getTimesRead()
                await book.toggleIsRead()
                isScored.classList = toggleKeyFunction() ? "hidden" : ""
                scoreSelect.classList = toggleKeyFunction() ? "hidden" : ""
                submitScore.classList = toggleKeyFunction() ? "hidden" : ""
                startRead.classList = toggleKeyFunction() ? "" : "hidden"
                isReadToggle.innerText = toggleKeyFunction() ? "Finish Read" : "Start New Read"
                isReadText.innerText = toggleKeyFunction() ? `You have read this book ${book.getTimesRead()} times` : "You have finished reading"
                
                // Resets the score when starting a new read of a previously rated book
                scoreSelect.selectedIndex = undefined
                const selectedIndex = ""
                isScored.innerText = "Please rate this book"
                submitScore.disabled = true
                await book.scoreBook(selectedIndex)

                if (!toggleKeyFunction()) {
                    await book.increaseTimesRead(timesRead)
                }
            }
            catch (error) {
                throw error
            }
        }) 
    }

    function removeBookButton() {
        removeBook.addEventListener("click", async () => {
            try {
                await book.remove()
                cardDiv.remove()
            }
            catch (error) {
                throw error
            }
        })
    }
    
    return cardDiv
}