/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
Author - Sam Matthews
May / 2019
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
document.addEventListener('DOMContentLoaded', () => {

const studentsPerPage = 10;
const list = document.querySelectorAll('li');

/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
console.log(list);



/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
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
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (list) => {
   //select page element so that the div we create can be appended to the page.
   const page = document.querySelector('page');
   //calculate numPages required for number of records.
   let numPages = Math.ceil(list.length / studentsPerPage)
   //create div that holds pages and add the class
   const paginationDiv = document.createElement('div');
   paginationDiv.className = 'pagination';
   //create ul to hold the buttons
   const pageButtonsUL  = document.createElement('ul');

   //for loop to create the required number of buttons for the list
   for(let i = 0; i < numPages; i++){
      let li = document.createElement('li');
      let anchor = document.createElement('a');
      anchor.textContent = i;
      anchor.href = "#";
      li.appendChild(anchor);
      pageButtonsUL.appendChild(li);
   }


   paginationDiv.appendChild(pageButtonsUL);
   page.appendChild(paginationDiv);
}

showPage(list,1);
appendPageLinks(list);

// Remember to delete the comments that came with this file, and replace them with your own code comments.
});