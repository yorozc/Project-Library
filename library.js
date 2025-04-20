

function Book(title, author, pages, read){
    this.id = crypto.randomUUID(); //create random id 
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = ()=>{
        return this.title + " by " + this.author + " , " + 
        this.pages + " pages " + " , " + this.read;
    }
}

//add error handling to check for emptiness
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
    console.log(myLibrary);
    displayBookShelf();
    addBookForm.reset();//resets form after submitting
}

function displayBookShelf(){
    const shelf = document.querySelector(".BookShelf");
    shelf.innerHTML = "";
    for (i=0; i < myLibrary.length; i++){
        //add delete button and something to show it completed
        let bookCard = document.createElement("div");
        let bookCover = document.createElement("img");
        let bookTitle = document.createElement("h1");
        let bookAuthor = document.createElement("h4");

        bookTitle.textContent = myLibrary[i].title;
        bookAuthor.textContent = myLibrary[i].author
        bookCard.setAttribute("class", "book");
        bookCard.setAttribute("data-id", myLibrary[i].id);
        bookCard.appendChild(bookCover);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);

        shelf.appendChild(bookCard);
        bookForm.style.display = "none";
    }
}

//show the form to add a book when the user presses it
const showForm = document.getElementById("showForm");
const bookForm = document.querySelector(".BookForm");

showForm.addEventListener("click", ()=>{
    bookForm.style.display = "flex";
})

title = "Default"
author = "Test author"
pages = 222
completed = "on"
const defaultBook = new Book(title, author, pages, completed);
const myLibrary = [];
myLibrary.push(defaultBook)
displayBookShelf()