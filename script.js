

const itemform = document.getElementById('item-form');
const iteminput = document.getElementById('item-input')
const itemlist = document.getElementById('item-list');
const fromBtn = itemform.querySelector('button');
let isEditMode = false;


// function addItem(e) {
//   e.preventDefault(); 

//    const newitem = iteminput.value;
//   // Validate input
//   if (newitem === '') {
//     alert('Please enter an item');
//     return;
//   }
  
//   const li = document.createElement('li');

//   li.appendChild(document.createTextNode(newitem));
//   const button = document.createElement('button');
  
//   button.className = 'remove-item btn-link text-red';

//   const i = document.createElement('i');

//   i.className = 'fa-solid fa-xmark';

//   button.appendChild(i);

//   li.appendChild(button);

//   document.getElementById('item-list').appendChild(li);

// }

// itemform.addEventListener('submit', addItem);


function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = iteminput.value;

  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // check for edit mode 
    if(isEditMode){
      const itemToEdit = itemlist.querySelector('.edit-mode');

      removeItemFromStorage(isEditMode.textContent);
      itemToEdit.classList.remove('edit-mode');
      itemToEdit.remove();
      isEditMode = false;
    } else{
      if(checkIfItemExists(newItem)){
        alert('That item already exists!');
        return;
      }
    }
 
    // Create item DOM element
    
    addItemToDOM(newItem);

    // Add item to local storage
    addItemToStorage(newItem);

   checkUI();

   iteminput.value = '';
}

  // Create list item
  function addItemToDOM(item) {
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
  
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
  
    // Add li to the DOM
    itemlist.appendChild(li);

  }



function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// Remove Item 

function onclickItem(e){
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else{
    setItemToEdit(e.target);
  }
}
 function checkIfItemExists(item){
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
 }

function removeItem(item) {
  if (confirm('Are you sure?')) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item){
  let itemsFromStorage = getItemsFromStorage();
   
 itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

 localStorage.setItem('items',JSON.stringify(itemsFromStorage));
  
}

// function removeItem(e) {
//   if (e.target.parentElement.classList.contains('remove-item')) {
//      if (confirm('Are you sure?')) {
//       e.target.parentElement.parentElement.remove();

//       checkUI();
//     }
    
//   }
//  }

// RemoveALL Item 


const clear = document.getElementById('clear');

function removeAll(e){
  if(confirm('Are you sur')){
    while(itemlist.firstChild){
      itemlist.removeChild(itemlist.firstChild);

     
    }
    checkUI();
  }
}

 // clear ui  

const itemfilter = document.getElementById('filter');


function checkUI() {
  iteminput.value = '';

  const items = itemlist.querySelectorAll('li');
  
  if (items.length === 0) {
    clear.style.display = 'none';
    itemfilter.style.display = 'none';
  } else{
    clear.style.display = 'block';
    itemfilter.style.display = 'block';

  }
  fromBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  fromBtn.style.backgroundColor = '#333';

  isEditMode = false;
}

// filter item 

function filterItem(e){
 
  const items = itemlist.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  
  items.forEach((item) => {
     const newitems = item.firstChild.textContent.toLowerCase();

     if(newitems.indexOf(text) != -1){
      item.style.display ='flex';
     } else {
     item .style.display = 'none';
     }
  });

  }

 
  function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage();

    // if(localStorage.getItem('items') === null){
    //   itemsFromStorage = [];
      
    // }else{
    //   itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    // }

    // add new item yo array
    itemsFromStorage.push(item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
   
  }

  function getItemsFromStorage() {
    let itemsFromStorage;
  
    if (localStorage.getItem('items') === null) {
      itemsFromStorage = [];
    } else {
      itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
  
    return itemsFromStorage;
  }


  function displayitem(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => addItemToDOM(item));
    checkUI();
  }


function clearItems() {
  while (itemlist.firstChild) {
    itemlist.removeChild(itemlist.firstChild);
  }

  // Clear from localStorage
  localStorage.removeItem('items');

  checkUI();
}


 function setItemToEdit(item) {
  isEditMode = true;
  itemlist
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  fromBtn.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item';
  fromBtn.style.backgroundColor = '#228B22';
  iteminput.value = item.textContent;
}

  // initialize app
 
function init() {
 // Event Listeners
itemform.addEventListener('submit', onAddItemSubmit);
// itemlist.addEventListener('click', removeItem);
clear.addEventListener('click',removeAll);
itemfilter.addEventListener('input',filterItem);
document.addEventListener('DOMContentLoaded', displayitem)
itemlist.addEventListener('click', onclickItem);
  


checkUI();
} 

init();










  