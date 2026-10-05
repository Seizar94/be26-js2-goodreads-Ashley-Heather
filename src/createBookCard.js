export function getBookCard(book) {

    const cardDiv = document.createElement("div")
    const bookTitle = document.createElement("h2")
    const bookAuthor = document.createElement("p")
    const isReadText = document.createElement("p")
    const isScoredText = document.createElement("p")
    const scoreSelect = document.createElement("select")
    const submitScoreBtn = document.createElement("button")
    const removeBookBtn = document.createElement("button")
    const startReadBtn = document.createElement("button")
    const isReadToggleBtn = document.createElement("button")

    elementSettingsOnLoad(book, cardDiv, bookTitle, bookAuthor, isReadText, isScoredText, scoreSelect, submitScoreBtn, startReadBtn, isReadToggleBtn, removeBookBtn)
    submitButtonDisabledStatus(book, scoreSelect, submitScoreBtn)
    startReadButton(book, isReadText, startReadBtn)
    isReadToggleButton(book, isReadText, isScoredText, scoreSelect, submitScoreBtn, startReadBtn, isReadToggleBtn, toggleIsReadKey)
    submitScoreButton(book, isReadText, isScoredText, scoreSelect, submitScoreBtn)
    removeBookButton(book, cardDiv, removeBookBtn)

    return cardDiv
}

function elementSettingsOnLoad(book, cardDiv, bookTitle, bookAuthor, isReadText, isScoredText, scoreSelect, submitScoreBtn, startReadBtn, isReadToggleBtn, removeBookBtn) {
    cardDiv.classList.add("bookCard")
    cardDiv.append(bookTitle, bookAuthor, isReadText, isScoredText, scoreSelect, submitScoreBtn, startReadBtn, isReadToggleBtn, removeBookBtn)
    bookTitle.innerText = book.getTitle()
    bookAuthor.innerText = book.getAuthor()

    // Score selection options
    const blankOption = new Option("", "1")  
    const option1 = new Option("1", "2")  
    const option2 = new Option("2", "3")
    const option3 = new Option("3", "4") 
    const option4 = new Option("4", "5")   
    const option5 = new Option("5", "6")
    scoreSelect.appendChild(blankOption)
    scoreSelect.appendChild(option1)
    scoreSelect.appendChild(option2)
    scoreSelect.appendChild(option3)
    scoreSelect.appendChild(option4)
    scoreSelect.appendChild(option5)

    isScoredText.innerText = "Please rate this book"
    submitScoreBtn.innerText = "Submit score"
    startReadBtn.innerText = "Start Read"
    startReadBtn.classList.add("cardButton")
    isReadToggleBtn.classList.add("cardButton")
    removeBookBtn.innerText = "Remove book"
    removeBookBtn.classList.add("cardButton")

    // Element visibility. Run on page load.
    if (!book.getIsRead()) {
        isReadText.innerText = "This book is unread"
        isScoredText.classList.add("hidden")
        scoreSelect.classList.add("hidden")
        submitScoreBtn.classList.add("hidden")
        isReadToggleBtn.innerText = "Finish Read"
    } else if (book.getIsRead()) {
        isReadText.innerText = "You have finished reading"
        isScoredText.classList.remove("hidden")
        scoreSelect.classList.remove("hidden")
        submitScoreBtn.classList.remove("hidden")
        submitScoreBtn.classList.add("disable")
        startReadBtn.classList.add("hidden")
        isReadToggleBtn.innerText = "Start New Read"
    }
    if (book.getReadStarted()) {
        isReadText.innerText = "You are currently reading this book"
        startReadBtn.classList.add("hidden")
    }
    if (book.getTimesRead() > 0 && book.getReadStarted() === false) {
        isReadText.innerText = `You have read this book ${book.getTimesRead()} times`
    }
    if (book.getScore() > 0) {
        scoreSelect.classList.add("hidden")
        submitScoreBtn.classList.add("hidden")
        isScoredText.innerText = `You have rated this book: ${book.getScore()} out of 5!`
    }
}

function submitButtonDisabledStatus(book, scoreSelect, submitScoreBtn) {
    submitScoreBtn.disabled = true
    scoreSelect.addEventListener("change", () => {
        if (scoreSelect.selectedIndex > 0) {
            submitScoreBtn.disabled = false
        } else submitScoreBtn.disabled = true
    })
}

function submitScoreButton(book, isReadText, isScoredText, scoreSelect, submitScoreBtn) {
    submitScoreBtn.addEventListener("click", async () => {
        try {
            const selectedIndex = scoreSelect.selectedIndex
            await book.scoreBook(selectedIndex)
            scoreSelect.classList.add("hidden")
            submitScoreBtn.classList.add("hidden")
            isReadText.innerText = `You have read this book ${book.getTimesRead()} times`
            isScoredText.innerText = `You have rated this book: ${selectedIndex} out of 5!`
        }
        catch(error) {
            throw error
        }
    })
}

function startReadButton(book, isReadText, startReadBtn) {
    startReadBtn.addEventListener("click", async () => {
        try {
            await book.toggleReadStarted()
        isReadText.innerText = "You are currently reading this book"
        startReadBtn.classList.add("hidden")
        }
        catch (error) {
            throw error
        }
    })
}

function toggleIsReadKey(book) {
    let toggleIsReadKey = book.getIsRead()
    toggleIsReadKey = !toggleIsReadKey
    return toggleIsReadKey
}

function isReadToggleButton(book, isReadText, isScoredText, scoreSelect, submitScoreBtn, startReadBtn, isReadToggleBtn, toggleIsReadKey) {
    isReadToggleBtn.addEventListener("click", async () => {
        try {
            let timesRead = book.getTimesRead()
            await book.toggleIsRead()
            isScoredText.classList = toggleIsReadKey(book) ? "hidden" : ""
            scoreSelect.classList = toggleIsReadKey(book) ? "hidden" : ""
            submitScoreBtn.classList = toggleIsReadKey(book) ? "hidden" : ""
            startReadBtn.classList = toggleIsReadKey(book) ? "" : "hidden"
            isReadToggleBtn.innerText = toggleIsReadKey(book) ? "Finish Read" : "Start New Read"
            isReadText.innerText = toggleIsReadKey(book) ? `You have read this book ${book.getTimesRead()} times` : "You have finished reading"
            
            // Resets the score when starting a new read of a previously rated book
            scoreSelect.selectedIndex = undefined
            const selectedIndex = ""
            isScoredText.innerText = "Please rate this book"
            submitScoreBtn.disabled = true
            await book.scoreBook(selectedIndex)

            if (!toggleIsReadKey(book)) {
                await book.increaseTimesRead(timesRead)
            }
        }
        catch (error) {
            throw error
        }
    }) 
}

function removeBookButton(book, cardDiv, removeBookBtn) {
    removeBookBtn.addEventListener("click", async () => {
        try {
            await book.remove()
            cardDiv.remove()
        }
        catch (error) {
            throw error
        }
    })
}