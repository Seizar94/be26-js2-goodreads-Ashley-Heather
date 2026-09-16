export const baseURL = "https://goodreads-bcf7d-default-rtdb.europe-west1.firebasedatabase.app/books"

export async function getAllBooks(){
    try{
        const response = await fetch(baseURL + ".json");
        if(!response.ok){
            throw new Error("Fetching tasks failed");
        }
    
        const data = await response.json();
        return data;
    }
    catch(error){
        throw error;
    }
}

export async function addBook(newAuthor, newTitle){
    try{
        const option = {
            method: "POST",
            body: JSON.stringify({author: newAuthor, title: newTitle, isRead: false, score: 0}),
            headers: {
                "Content-type": "application/json"
            }
        }
    
        const response = await fetch(baseURL + ".json", option);
    
        if(!response.ok){
            throw new Error("Post failed");
        }
    
        const data = await response.json();
        return data;
    }
    catch(error){
        throw error;
    }
}