const errorDiv = document.getElementById('error');

//handle search button
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //------ clear data
    searchField.value = '';
    //-------- error handle
    if(searchText === ''){
        errorDiv.innerHTML = `<h6 class= "text-center text-danger"> search field can not be empty</h6>`;
        const totalFound = document.getElementById('total-books');
        totalFound.textContent = '';
        const displaySearch = document.getElementById('search-result')
        displaySearch.textContent = '';
        return;
    }
        
    //load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data))

}

//display search result data
const displaySearchResult = (myBooks) => {
//error handling
    if(myBooks.numFound === 0){
        errorDiv.innerHTML = `<h5 class="text-center text-danger">write the correct book name</h5>`;
        const totalFound = document.getElementById('total-books');
        totalFound.textContent = '';
        const displaySearch = document.getElementById('search-result')
        displaySearch.textContent = '';
        return;
            }
            else{
               errorDiv.textContent = '';
            }

    const searchResult = document.getElementById('search-result');
    searchResult.innerText = '';

 
    //total search result
    const books = myBooks.docs
    const totalBooks = document.getElementById('total-books');
    totalBooks.innerHTML = `
   <h3 class="text-center text-secondary">Total books found ${myBooks.numFound}</h3>
   `;
    
        books.forEach(book => {
        console.log(book);
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body text-center">
              <h5 class="card-title"> Name: ${book.title}</h5>
              <h6> Author: ${book.author_name}</h6>
              <p>Publisher: <small> ${book.publisher[0]} </small></p>
              <small> First Published Year: ${book.first_publish_year}</small>
            </div>
        </div>
        `;
        searchResult.appendChild(div);

    });
    

}
