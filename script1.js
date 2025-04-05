// Function to load items from local storage and display them
function loadItems() {
    const travelList = JSON.parse(localStorage.getItem('travelList')) || [];
    const skillsList = JSON.parse(localStorage.getItem('skillsList')) || [];
    const goalsList = JSON.parse(localStorage.getItem('goalsList')) || [];

    travelList.forEach(item => addItemToList(item, 'travel'));
    skillsList.forEach(item => addItemToList(item, 'skills'));
    goalsList.forEach(item => addItemToList(item, 'goals'));
}

// Function to add an item to the appropriate list
function addItemToList(item, category) {
    const listId = category + '-list';
    const list = document.getElementById(listId);
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox"> <span>${item}</span>
        <button class="remove-button" title="Remove Item">
            <img src="trash-icon.png" alt="Remove" class="remove-icon">
        </button>
    `;
    list.appendChild(li);

    // Add event listener to the remove button
    li.querySelector('.remove-button').addEventListener('click', function() {
        removeItem(item, category, li);
    });
}

// Function to remove an item from the list and local storage
function removeItem(item, category, li) {
    // Remove the item from the displayed list
    li.remove();

    // Update the local storage
    const currentList = JSON.parse(localStorage.getItem(category + 'List')) || [];
    const updatedList = currentList.filter(i => i !== item);
    localStorage.setItem(category + 'List', JSON.stringify(updatedList));
}

// Event listener for the form submission
document.getElementById('add-item-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const newItem = document.getElementById('new-item').value;
    const category = document.getElementById('category').value;

    // Add the new item to the list
    addItemToList(newItem, category);

    // Store the new item in local storage
    const currentList = JSON.parse(localStorage.getItem(category + 'List')) || [];
    currentList.push(newItem);
    localStorage.setItem(category + 'List', JSON.stringify(currentList));

    // Clear the input field
    document.getElementById('new-item').value = '';
});

// Load items when the page is loaded
document.addEventListener('DOMContentLoaded', loadItems);