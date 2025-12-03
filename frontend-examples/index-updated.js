// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// State variables
let allProducts = [];
let itemsShown = 0;
const itemsPerPage = 10;
const itemTracker = document.getElementById('itemtracker');

/**
 * Fetch all available products from the backend
 */
async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products/available`);
        const data = await response.json();
        
        if (data.success) {
            allProducts = data.data;
            console.log(`Loaded ${allProducts.length} products from database`);
            displayItems();
        } else {
            console.error('Error fetching products:', data.message);
            showError('Failed to load products. Please try again later.');
        }
    } catch (error) {
        console.error('Network error:', error);
        showError('Cannot connect to server. Please make sure the backend is running.');
    }
}

/**
 * Display products on the page
 */
function displayItems() {
    const parentElement = document.getElementById('foodcontainer');
    
    if (!parentElement) {
        console.error('Food container element not found');
        return;
    }
    
    // Calculate how many items to show
    const maxItemsToAdd = Math.min(itemsPerPage, allProducts.length - itemsShown);
    const itemsBefore = itemsShown;
    const itemsAfter = itemsShown + maxItemsToAdd;
    
    // Create and append food items
    for (let i = itemsBefore; i < itemsAfter; i++) {
        const product = allProducts[i];
        const foodDiv = createFoodItemElement(product, i);
        parentElement.appendChild(foodDiv);
        itemsShown++;
    }
    
    // Update the item tracker
    updateItemTracker();
    
    // Hide "Load More" button if all items are shown
    const loadMoreBtn = document.getElementById('loadmore');
    if (loadMoreBtn && itemsShown >= allProducts.length) {
        loadMoreBtn.style.display = 'none';
    }
}

/**
 * Create a food item DOM element
 */
function createFoodItemElement(product, index) {
    const foodDiv = document.createElement('div');
    foodDiv.id = `fooditem-${product.id}`;
    foodDiv.className = 'fooditem';
    
    // Format expiration date
    const expirationDate = new Date(product.expiration_date);
    const formattedDate = expirationDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    // Check if expiring soon (within 3 days)
    const daysUntilExpiration = Math.ceil((expirationDate - new Date()) / (1000 * 60 * 60 * 24));
    const urgencyClass = daysUntilExpiration <= 3 ? 'urgent' : '';
    
    foodDiv.innerHTML = `
        <div class="food-image-placeholder">
            <img src="placeholder-food.jpg" alt="${product.name}" 
                 onerror="this.src='https://via.placeholder.com/200x150?text=${encodeURIComponent(product.name)}'" 
                 width="200" height="150"/>
        </div>
        <h3>${product.name}</h3>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Quantity:</strong> ${product.quantity} units</p>
        <p class="${urgencyClass}"><strong>Expires:</strong> ${formattedDate}</p>
        <p><strong>Donated by:</strong> ${product.donor_name || 'Anonymous'}</p>
        <button onclick="requestDonation(${product.id}, '${product.name}')">Request Donation</button>
    `;
    
    return foodDiv;
}

/**
 * Handle donation request
 */
async function requestDonation(productId, productName) {
    // For now, just show an alert. You can expand this to show a modal or form
    const confirmed = confirm(`Would you like to request ${productName}?`);
    
    if (confirmed) {
        // You'll need to add recipient selection logic here
        // For demonstration, we'll just show a success message
        alert('Request submitted! You will be contacted by the donor shortly.');
        
        // In a full implementation, you would:
        // 1. Get the recipient ID (from login or selection)
        // 2. Call the API to create a request
        // Example:
        // const response = await fetch(`${API_BASE_URL}/recipients/RECIPIENT_ID/request`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ product_id: productId, quantity: 1 })
        // });
    }
}

/**
 * Load more items when button is clicked
 */
function loadMoreItems() {
    displayItems();
}

/**
 * Update the item tracker display
 */
function updateItemTracker() {
    if (itemTracker) {
        itemTracker.innerHTML = `<p>Showing ${itemsShown} of ${allProducts.length} items.</p>`;
    }
}

/**
 * Show error message to user
 */
function showError(message) {
    const parentElement = document.getElementById('foodcontainer');
    if (parentElement) {
        parentElement.innerHTML = `
            <div class="error-message">
                <p>⚠️ ${message}</p>
                <button onclick="location.reload()">Retry</button>
            </div>
        `;
    }
}

// Initialize: Fetch products when page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

// For backward compatibility if displayItems() is called directly
if (typeof window !== 'undefined') {
    window.loadMoreItems = loadMoreItems;
    window.requestDonation = requestDonation;
}
