// Task 1: Create a Book Class

class Book {    //Book class
    #title;
    #author;
    #ISBN;
    #_isAvailable;
    
    constructor(title, author, ISBN) {
        this.#title = title;
        this.#author = author;
        this.#ISBN = ISBN;
        this.#_isAvailable = _isAvailable;     //Title, Author, and ISBN of the book as well as book availability status
    } 

    getDetails() {
        return 'Title: ${this.#title}, Author: ${this.#author}, ISBN: ${this.ISBN} ;   // Getter for Details 
    }
    
    get isAvailable() {         //Getter fo isAvailable
        return this.#_isAvailable;
    }

    set isAvailable(status) {       //Setter for isAvailable updates status
        if (typeof status === 'boolean') {
            this.#_isAvailable = status;
        } else {
            console.error("Availability status must be a boolean value.");
        }
    }
}

//Task 2: Create a Section Class

class Section {
    #name;
    #books;

    constructor(name) {         //Constructor to initialize Section name and array of books
        this.#name = name;
        this.#book = [];
    }
    addBook(book) {
        if (book instanceof Book) {
            this.#books.push(book);
        } else {
            console.error ('Only book objects can be added to the section');
        }
    }

    getAvailableBooks() {
        return this.#books.filter(book => book._isAvailable).length;
    }

    listBooks() {       //Method to list books in the section with their title and availability
        return this.#books.map(book => {
            return 'Title: ${book,getDetails()}, Available; ${book.isAvailable ? 'Yes' ; 'No'}'
        }).join('\n');
    }


// Task 5: Handle Books Borrowing and Returning

    calculateTotalBooksAvailable() {
        let availableBooks = this.getAvailableBooks();
        console.log('Total books available in ${this.#name} section: ${availableBooks}');
        return availableBooks;   //get the amount of available books
    }
}

//Task 3: Create a Patron Class

class Patron {
    #name;
    #borrowedBooks;
    
    constructor(name) {
        this.#name = name;
        this.#borrowedBooks = [];
    }

    borrowBook(book) {
        if (book.isAvailable) {
            book.isAvailable = false;
            this.#borrowedBooks.push(book);
            console.log('${this.#name} borrowed "${book.getDetails()}".');
        } else {
            console.log('Sorry, "${book.getDetails()} is unavailable.');
        }
    }

    returnBook(book) {
        const bookIndex = this.#borrowedBooks.indexOf(book);
        if (bookIndex !== -1) {
            book.isAvailable = true;   //Marking book as available
            this.#borrowedBooks.splice(bookIndex, 1);
            console.log('"${book.getDetails()}" is not in ${this.#name}s borrowed books.');
        }
    }

    listBorrowedBooks() {
        if (this.#borrowedBooks.length === 0) {
            return '${this.#name} has not borrowed any books.';
        } 
        return this.#borrowedBokks.map(book => book.getDetails()).join('\n');
    }
}

//Task 4: Create a VIPPatron Class that Inherits from Patron

class VIPPatron extends Patron {
    #priority;

    constructor(name) {
        super(name);
        this.#priority = true;   //VIP patrons have priority
    }

    borrowBook(book, competingPatron = null) {
        if (competingPatron && competingPatron instanceof Patron) {   //Check if competing patron is trying to borrow same book
            console.log('${this.name} has priority over ${competingPatron.name} for borrowing "${book.getDetails()}".');
        }
        super.borrowBook(book);
    }
}

// Task 6: Create and Manage Sections and Patrons

let book1 = new Book('The Hunger Games', 'Suzanne Collins', '9780439023481');
let book2 = new Book('Harry Potter and the Chamber of Secrets', 'J. K. Rowling', '9781408810552');
let book3 = new Book('Lord of the Flies', 'William Golding', '9780399501487');
let book4 = new Book('Diary of a Wimpy Kid', 'Jeff Kinney', '9781410498779');
let book5 = new Book('Between the World and Me', 'Ta-Nehisi Coates', '9781416971719');   // Book objects

let fictionSection = new Section('Fiction');
let nonfictionSection = new Section('non-Fiction');

fictionSection.addBook(book1);
fictionSection.addBook(book2);
fictionSection.addBook(book3);
fictionSection.addBook(book4);

nonfictionSection.addBook(book5);    //adding books to sections

let regularPatron1 = new Patron('Nicki Minaj');
let regularPatron2 = new Patron('Lady Gaga');
let vipPatron1 = new VIPPatron('Doja Cat');     //Patrons

regularPatron1.borrowBook(book5);
vipPatron1.borrowBook(book1, regularPatron1);

console.log('Before returns:');
    fictionSection.calculaateTotalBooksAvailable();
    nonfictionSection.calculaateTotalBooksAvailable();

regularPatron1.returnBook(book5);
vipPatron1.returnBook(book1);

console.log('After returns:');
    fictionSection.calculaateTotalBooksAvailable();
    nonfictionSection.calculaateTotalBooksAvailable();
