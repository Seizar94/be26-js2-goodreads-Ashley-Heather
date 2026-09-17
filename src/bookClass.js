import { baseURL } from "./firebaseRequest.js";

export class Book {
    #id
    #author
    #title
    #score
    #isRead
    #timesRead
    #readStarted
    constructor(author, title, score, isRead, timesRead, readStarted, id) {
        this.#id = id
        this.#author = author
        this.#title = title
        this.#score = score
        this.#isRead = isRead
        this.#timesRead = timesRead
        this.#readStarted = readStarted
    }

    // Score selection and submission method
    async scoreBook(selectedIndex) {
        const options = {
            method: "PATCH",
            body: JSON.stringify(
                {
                    score: selectedIndex
                }
            ),
            headers: { 
                "content-type": "application/json"
            }
        }
        try {
            const response = await fetch(`${baseURL}/${this.#id}.json`, options)
            if (!response.ok) {
                throw new Error ("patching score has failed")
            }
            const data = await response.json()
            return data
        }
        catch (error) {
            throw error
        }
    }

    // Book removal method
    async remove() {
        const options = {
            method: "DELETE"
        }
        try {
            const response = await fetch(`${baseURL}/${this.#id}.json`, options)
            if (!response.ok) {
                throw new Error ("Removal failed")
            }
            const data = await response.json();
            return "Book Removed!"
        }
        catch (error) {
            throw error
            }
    }
    
    // Toggle isRead method
    async toggleIsRead() {
            const options = {
            method: "PATCH",
            body: JSON.stringify(
                {
                    isRead: !this.getIsRead()
                }
            ),
            headers: {
                "Content-type": "application/json"
            }
        }
        try {
            const response = await fetch (`${baseURL}/${this.#id}.json`, options)
            if(!response.ok) {
                throw new Error ("Could not change reading status")
            }
            const data = await response.json()
            this.#isRead = !this.#isRead
            return "Patch successful"
        }
        catch (error) {
            throw error
        }
    }

    // Toggle readStarted method
    async toggleReadStarted() {
            const options = {
            method: "PATCH",
            body: JSON.stringify(
                {
                    readStarted: !this.getReadStarted()
                }
            ),
            headers: {
                "Content-type": "application/json"
            }
        }
        try {
            const response = await fetch (`${baseURL}/${this.#id}.json`, options)
            if(!response.ok) {
                throw new Error ("Could not change reading status")
            }
            const data = await response.json()
            this.#readStarted = !this.#readStarted
            return "Patch successful"
        }
        catch (error) {
            throw error
        }
    }


    // increment timesRead method
    async increaseTimesRead(timesRead) {
        const options = {
            method: "PATCH",
            body: JSON.stringify(
                {
                    timesRead: timesRead + 1
                }
            ),
            headers: {
                "Content-type": "application/json"
            }
        }
        try {
            const response = await fetch (`${baseURL}/${this.#id}.json`, options)
            if(!response.ok) {
                throw new Error ("Could not increase read count")
            }
            const data = await response.json()
            this.#timesRead = this.#timesRead + 1
            return "Patch successful"
        }
        catch (error) {
            throw error
        }
    }
    getAuthor() {
        return this.#author
    }
    getTitle() {
        return this.#title
    }
    getScore() {
        return this.#score
    }
    getIsRead() {
        return this.#isRead
    }
    getTimesRead() {
        return this.#timesRead
    }
    getReadStarted() {
        return this.#readStarted
    }
}