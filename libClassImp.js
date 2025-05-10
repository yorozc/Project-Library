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

    return class{
        #library = [];
        constructor(){
            if (instance){
                return instance;
            }
            instance = this;
        }
        addItem(item){
            this.#library.push(item);
        }
    
        getItems(){
            return [...this.#library];
        }
    };
})();

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
    const formVars = formVariables();
    const formData = new FormData(formVars.getAddBookForm());
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
    const formVars = formVariables();
    const library = new myLibrary();
    const libraryList = library.getItems();
    const shelf = formVars.getShelf();
    shelf.innerHTML = "";
    for (i=0; i < libraryList.length; i++){
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
            for (i=0; i < libraryList.length; i++){
                if (bookCard.getAttribute("data-id") === libraryList[i].id){
                    libraryList.splice(i, 1);
                    bookCard.remove()
                }
            }
            
            console.log(library.getItems());
        });

        shelf.appendChild(bookCard);
        bookForm.style.display = "none";
    }
}

function toggleForm(){
    const formVars = formVariables();
    const bookForm = formVars.getBookForm();
    open = false
    formVars.getShowForm().addEventListener("click", ()=>{
    if (open === false){
        bookForm.style.display = "flex";
        open = true
    }else{
        open = false
        bookForm.style.display = "none";
    }
    })
}

toggleForm();
displayBookShelf();