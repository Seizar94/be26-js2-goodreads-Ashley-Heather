import { baseURL } from "./firebaseRequest.js";

export class Book {
    #id
    constructor(author, title, score, isRead, id) {
        this.#id = id
        this.author = author
        this.title = title
        this.score = score
        this.isRead = isRead
    }
    // Score selection and submission method
    async scoreBook(selectedIndex) {
        // console.log("async function test on book: ", + book)
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
        }
        catch (error) {
            throw error
            }
    }
    // Toggle isRead method
    async toggleIsRead() {
            const options = {
            method: "PATCH",
            body: JSON.stringify({isRead: !this.isRead}),
            headers: {
                "Content-type": "application/json"
            }
        }
        try {
            const response = await fetch (`${baseURL}/${this.#id}.json`, options)
            if(!response.ok) {
                throw new Error ("Could to change reading status")
            }
            const data = await response.json()
            this.isRead = !this.isRead
            return "Patch successful"
        }
        catch (error) {
            throw error
        }
    }
}