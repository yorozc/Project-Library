let myLibrary = [];
let myLibraryIds = [];

// global variables for elements that are used in multiple functions
const bookForm = document.querySelector(".BookForm");
const addBookForm = document.querySelector("#addBook");
const showForm = document.querySelector(".showForm");
const singleBook = document.querySelector(".book");
const removeBook = document.querySelector(".removeBook");

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
    myLibraryIds.push(this.id)
}

//add error handling to check for emptiness
function addBookToLibrary(event){
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
        let bookTitle = document.createElement("h1");
        let bookAuthor = document.createElement("h4");

        let bottomPart = document.createElement("div"); //contains bookStatus & removeBook
        let bookStatus = document.createElement("img");
        let removeBook = document.createElement("button")

        bookTitle.textContent = myLibrary[i].title;
        bookAuthor.textContent = myLibrary[i].author;

        bookCard.setAttribute("class", "book");
        bookCard.setAttribute("data-id", myLibrary[i].id);

        bottomPart.setAttribute("class", "bottomOfCard")

        // bottom left image of a check or x 
        bookStatus.setAttribute("id", "status");
        bookStatus.setAttribute("src", checkForStatus(myLibrary[i].read))

        removeBook.setAttribute("class", "removeBook");
        removeBook.textContent = "DEL";
        removeBook.type = "button";
        removeBook.style.display = "none";
        
        bottomPart.appendChild(bookStatus);
        bottomPart.appendChild(removeBook)

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bottomPart);
        bookCard.addEventListener("mouseover", () => {
            removeBook.style.display = "flex";
        });
        bookCard.addEventListener("mouseout", () =>{
            removeBook.style.display = "none";
        })

        removeBook.addEventListener("click", () => {
            for (i=0; i < myLibrary.length; i++){
                if (bookCard.getAttribute("data-id") === myLibrary[i].id){
                    myLibrary.splice(i, 1);
                    bookCard.remove()
                }
            }
            
            console.log(myLibrary)
        });

        shelf.appendChild(bookCard);
        bookForm.style.display = "none";
    }
}

function checkForStatus(status){ //checks if book completed is checked or not
    if (status === "on"){
        return "resources/check.png";
    }else{
        return "resources/remove.png";
    }
}

//show the form to add a book when the user presses it
function toggleForm(){
    open = false
    showForm.addEventListener("click", ()=>{
    if (open === false){
        bookForm.style.display = "flex";
        open = true
    }else{
        open = false
        bookForm.style.display = "none";
    }
    })
}

function createDefaultBook(){ //testing purposes so i dont have to make a book over and over again
    title = "Default"
    author = "Test author"
    pages = 222
    completed = "on"
    const defaultBook = new Book(title, author, pages, completed);
    myLibrary.push(defaultBook)
}

function main(){
    toggleForm()
    createDefaultBook()
    displayBookShelf()
}

main()