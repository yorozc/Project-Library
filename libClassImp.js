const formVariables = () =>{ 
    const bookForm = document.querySelector(".BookForm");
    const addBookForm = document.querySelector("#addBook");
    const showForm = document.querySelector(".showForm");
    const singleBook = document.querySelector(".book");
    const removeBook = document.querySelector(".removeBook");
    const shelf = document.querySelector(".BookShelf");

    return {
        getBookForm: () => bookForm,
        getAddBookForm: () => addBookForm,
        getShowForm: () => showForm,
        getSingleBook: () => singleBook,
        getRemoveBook: () => removeBook,
        resetAddBookForm: () => addBookForm.reset(),
        getShelf: () => shelf,
    }
}

const myLibrary = (() => { //encapsulation of book list
    let instance;
    const library = [];

    return class{
        constructor(){
            if (instance){
                return instance;
            }
            instance = this;
        }
        addItem(item){
            library.push(item);
        }
    
        getItems(){
            return [...library];
        }
    }
})

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
    const library = new myLibrary(); //may not work
    library.addItem(book);
    console.log(library.getItems());
    displayBookShelf();
    const formVariables = new formVariables();
    formVariables.resetAddBookForm();
}

const displayBookShelf = () => {

}