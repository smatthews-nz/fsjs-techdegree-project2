   /******************************************
   Treehouse Techdegree:
   FSJS project 2 - List Filter and Pagination
   Author - Sam Matthews
   May / 2019
   Please reject if does not exceed expectations
   ******************************************/
      
   // Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
   document.addEventListener('DOMContentLoaded', () => {

   const studentsPerPage = 10;
   const list = document.querySelectorAll('li');

   /*** 
     Show page function displays lists at 10 items per page
     Takes a list, and page as arguments
   ***/
   const showPage = (list, page) => {
      const startIndex = (page * studentsPerPage) - studentsPerPage;
      const endIndex = (page * studentsPerPage - 1);

      for(let i = 0; i < list.length; i++){
         
         if (i >= startIndex && i <= endIndex){
            list[i].style.display = "block";
         } else {
            list[i].style.display = "none";
         }

      }

   }

   /*** 
      Dynamically creates page buttons based on the number of items in the list
      Appends the buttons to the bottom of the page in a dynamically appended div
      Loops over all buttons in the list and adds submit and keyup listeners
   ***/
   const appendPageLinks = (list) => {
      //select page element so that the div we create can be appended to the page.
      const page = document.querySelector('.page');
      //calculate numPages required for number of records.
      const numPages = Math.ceil(list.length / studentsPerPage)
      //create div that holds pages and add the class
      const paginationDiv = document.createElement('div');
      paginationDiv.className = 'pagination';
      page.appendChild(paginationDiv);
      //create ul to hold the buttons
      const pageButtonsUL  = document.createElement('ul');
      

      //for loop to create the required number of buttons for the list
      for(let i = 0; i < numPages; i++){
         let li = document.createElement('li');
         let anchor = document.createElement('a');
         anchor.textContent = i + 1;
         anchor.href = "#";
         li.appendChild(anchor);
         pageButtonsUL.appendChild(li);
      }
      //add buttons to the pagination div
      paginationDiv.appendChild(pageButtonsUL);
      //select the buttons
      const pageButtons = document.querySelectorAll('a');
      //set the first button to class of active
      pageButtons[0].classList.add("active");
      //for loop to add event listeners
      for (let i = 0; i < pageButtons.length; i++){
         pageButtons[i].addEventListener('click', (e) => {
            //select the active button
            const button = e.target;
            //when a button is clicked, remove all active classes
            for (let j = 0; j < pageButtons.length; j++) {
               pageButtons[j].className = "";
            }
            //set the clicked button to active class
            button.className = "active";
            //call the function based upon which button is pressed
            showPage(list, button.textContent);
         });

      }
      
   }

   /**
    * Creates search input field and button
    * Appends to the dom
    * adds keyup and submit listeners
    */
   const appendSearchItems = () => {
      //select page header div to append search input and buttons
      const pageHeader = document.querySelector('.page-header');
      //create a div to hold search elements and set class name
      const searchDiv = document.createElement('div');
      searchDiv.className = "student-search";
      //create an input box and set type
      const searchInput = document.createElement('input');
      searchInput.type = "text";
      //append input to search div
      searchDiv.appendChild(searchInput);
      //create search button
      const searchButton = document.createElement('button');
      searchButton.textContent = "Search";
      //append search button to search div
      searchDiv.appendChild(searchButton);
      //append div to the pageHeader
      pageHeader.appendChild(searchDiv);

      //add submit event listener to the search button
      searchButton.addEventListener('submit', (e) => {
         e.preventDefault();
         searchName(searchInput, list);
         console.log("Search button active");
      });
      //add keyup event listener
      searchInput.addEventListener('keyup', () => {
         searchName(searchInput, list);
         console.log("Keyup listener active");
      });
   };


   /**
    * Search method logic
    * takes an input, searches a list of names using .contains() to locate any matches
    * removes original pagination
    * paginates returned results
    * also handles no results returned
    */
   const searchName = (searchInput, names) => {
         console.log("searchName fired");
          //select page element
         const page = document.querySelector('.page');
         //select original pagination 
         const paginationDiv = document.querySelector('.pagination');
         console.log(paginationDiv);
         //remove original pagination
         page.removeChild(paginationDiv);
         console.log(searchInput.value.length);
       
         //if else to check if search value is present
         if(searchInput.value.length > 0){
            //create array to store results
            let searchResults = [];
            for(let i = 0; i < names.length; i++){
               if (names[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())){
                  names[i].style.display = "block";
                  searchResults.push(names[i]);

               } else {
                  names[i].style.display = "none";
               }

            }

            //if search present, and no results found
            if (searchInput.value.length !== 0 && searchResults.length === 0) {
               console.log(searchResults.length);
               console.log("No results found");
               
               //set all names items to hidden
               for(let j = 0; j < names.length; j++){
                  console.log("For loop has run");
                  names[j].style.visibility = "hidden";
               }
               const studentList = document.querySelector('.student-list');
               const li = document.createElement('li');
               li.className = "no-results";
               const h3 = document.createElement('h3');
               h3.textContent = "No results found!";
               li.prepend(h3);
               studentList.prepend(li);
               li.style.display = "visible";
               

            }
            //check which pagination to apply
            if (searchResults.length > 0) {
               showPage(searchResults, 1);
               appendPageLinks(searchResults);
            } else {
               showPage(list, 1);
               appendPageLinks(list);
            }


         } else {
            for(let l = 0; l < names.length; l++){
               names[l].style.visibility = "";
               names[l].style.display = "block";
            }
            showPage(list, 1);
            appendPageLinks(list);
         } 
      }


      showPage(list, 1);
      appendPageLinks(list);

   appendSearchItems();

   // Remember to delete the comments that came with this file, and replace them with your own code comments.
   });