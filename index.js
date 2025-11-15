var listitems = 15;

var itemsShown = 0;
var maxItemsAdded = 0;
var itemsBefore = 0;
var itemsAfter = 0;
const itemTracker = document.getElementById(`itemtracker`);

function loadMoreItems() {
    displayItems();
}
function displayItems() {
    maxItemsAdded = Math.min(itemsShown + 10, listitems-itemsShown);
    itemsBefore = itemsShown;
    itemsAfter = itemsShown+maxItemsAdded;

    const parentElement = document.getElementById('foodcontainer');

    for (let i = itemsBefore; i < itemsAfter; i++) {
        const foodDiv = document.createElement('div');
        foodDiv.id = `fooditem-${i}`; 
        foodDiv.className = 'fooditem';
        foodDiv.innerHTML = `<img src="food${i}.jpg" alt="Food Item ${i}" width="200" height="150"/>
                    <h3>product.name</h3>
                    <p>Donated by: donor.name</p>
                    <p>Pickup Location: donor.address</p>
                    <button>Request Donation</button>
                    <br>`;
                    
        parentElement.appendChild(foodDiv);
        itemsShown++;
    }

    itemTracker.innerHTML = `<p>Showing ${itemsShown} of ${listitems} items.</p>`;
}

displayItems();
