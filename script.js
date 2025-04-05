// Function to load saved goals from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadGoals);

// Function to add a new item to the selected category
function addItem() {
    let inputField = document.getElementById("bucket-input");
    let newGoal = inputField.value.trim();
    let category = document.getElementById("category-select").value;

    if (newGoal !== "") {
        let listId = category + "-list"; // e.g., travel-list, learning-list, life-list
        let list = document.getElementById(listId);

        // Create new list item
        let listItem = createListItem(newGoal, category);

        // Append to correct list
        list.appendChild(listItem);

        // Save to local storage
        saveGoal(newGoal, category);

        // Clear input field
        inputField.value = "";
    } else {
        alert("Please enter a valid goal!");
    }
}

// Function to create a new list item
function createListItem(goal, category) {
    let listItem = document.createElement("li");
    listItem.textContent = goal;

    // Add a remove button
    let removeButton = document.createElement("button");
    removeButton.textContent = "❌";
    removeButton.onclick = function () {
        removeGoal(goal, category);
        listItem.remove();
    };

    listItem.appendChild(removeButton);
    return listItem;
}

// Function to save goals to local storage
function saveGoal(goal, category) {
    let goals = JSON.parse(localStorage.getItem(category)) || [];
    goals.push(goal);
    localStorage.setItem(category, JSON.stringify(goals));
}

// Function to load goals from local storage
function loadGoals() {
    let categories = ["travel", "learning", "life"];

    categories.forEach(category => {
        let goals = JSON.parse(localStorage.getItem(category)) || [];
        let list = document.getElementById(category + "-list");

        goals.forEach(goal => {
            let listItem = createListItem(goal, category);
            list.appendChild(listItem);
        });
    });
}

// Function to remove goals from local storage
function removeGoal(goal, category) {
    let goals = JSON.parse(localStorage.getItem(category)) || [];
    goals = goals.filter(item => item !== goal);
    localStorage.setItem(category, JSON.stringify(goals));
}
