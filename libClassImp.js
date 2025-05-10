const formVariables = () =>{ //priv access variables.
    const bookForm = document.querySelector(".BookForm");
    const addBookForm = document.querySelector("#addBook");
    const showForm = document.querySelector(".showForm");
    const singleBook = document.querySelector(".book");
    const removeBook = document.querySelector(".removeBook");

    return {
        getBookForm: () => bookForm,
        getAddBookForm: () => addBookForm,
        getShowForm: () => showForm,
        getSingleBook: () => singleBook,
        getRemoveBook: () => removeBook,
    }
}

const Book = class{ //private
    constructor(title, author, pages, read){
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = ()=>{
            return this.title + " by " + this.author + " , " + 
            this.pages + " pages " + " , " + this.read;
        }
    }

    
}

const addBookToLibrary = (event) =>{
    event.preventDefault();
    const formData = new FormData(addBookForm);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const completed = formData.get("read");
    const book = new Book(title, author, pages, completed); //access book
}