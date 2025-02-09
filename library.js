const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = ()=>{
        return this.title + " by " + this.author + " , " + 
        this.pages + " pages " + " , " + this.read;
    }
}

function addBookToLibrary(event){
    const addBookForm = document.querySelector("#addBook")
    event.preventDefault();
    const formData = new FormData(addBookForm);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const completed = formData.get("read");

    const newBook = new Book(title, author, pages, completed);
    myLibrary.push(newBook);
    addBookForm.reset();//resets form after submitting
}

console.log(myLibrary);