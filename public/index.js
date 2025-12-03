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
        const response = await fetch(`${API_BASE_URL}/products`);
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
    
    // Clear existing items
    parentElement.innerHTML = '';
    
    // Calculate how many items to show
    const maxItemsToShow = Math.min(itemsPerPage, allProducts.length);
    
    // Create and append food items
    for (let i = 0; i < maxItemsToShow; i++) {
        const product = allProducts[i];
        const foodDiv = createFoodItemElement(product);
        parentElement.appendChild(foodDiv);
    }
    
    itemsShown = maxItemsToShow;
    
    // Update the item tracker
    updateItemTracker();
    
    // Hide "Load More" button if all items are shown
    const loadMoreBtn = document.getElementById('loadmore');
    if (loadMoreBtn) {
        if (itemsShown >= allProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

/**
 * Create a food item DOM element with Edit and Delete buttons
 */
function createFoodItemElement(product) {
    const foodDiv = document.createElement('div');
    foodDiv.className = 'fooditem';
    foodDiv.id = `product-${product.id}`;
    foodDiv.setAttribute('data-product-id', product.id);
    
    // Format expiration date
    const expirationDate = new Date(product.expiration_date);
    const formattedDate = expirationDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    // Check if expiring soon (within 3 days)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expDate = new Date(expirationDate);
    expDate.setHours(0, 0, 0, 0);
    const daysUntilExpiration = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
    const urgencyClass = daysUntilExpiration <= 3 ? 'urgent' : '';
    
    foodDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Quantity:</strong> <span id="qty-${product.id}">${product.quantity}</span> units</p>
        <p class="${urgencyClass}"><strong>Expires:</strong> ${formattedDate}</p>
        <div style="display: flex; gap: 10px; margin-top: 10px;">
            <button onclick="requestDonation(${product.id}, '${product.name.replace(/'/g, "\\'")}')" style="flex: 1; background-color: #2e8b57; color: white; border: none; padding: 8px; border-radius: 5px; cursor: pointer;">Request</button>
            <button onclick="editProduct(${product.id})" style="flex: 1; background-color: #f0ad4e; color: white; border: none; padding: 8px; border-radius: 5px; cursor: pointer;">Edit</button>
            <button onclick="deleteProduct(${product.id})" style="flex: 1; background-color: #d9534f; color: white; border: none; padding: 8px; border-radius: 5px; cursor: pointer;">Delete</button>
        </div>
    `;
    
    return foodDiv;
}

/**
 * Edit a product (UPDATE operation)
 */
async function editProduct(productId) {
    console.log('Editing product:', productId);
    
    // Find the product in our array
    const product = allProducts.find(p => p.id === productId);
    if (!product) {
        alert('Product not found');
        return;
    }
    
    // Prompt for new quantity
    const newQuantity = prompt(`Edit quantity for ${product.name}:\n(Current: ${product.quantity})`, product.quantity);
    
    if (newQuantity === null) return; // User cancelled
    
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 0) {
        alert('Please enter a valid quantity (0 or greater)');
        return;
    }
    
    try {
        console.log('Sending PUT request to:', `${API_BASE_URL}/products/${productId}`);
        
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: product.category,
                name: product.name,
                expiration_date: product.expiration_date.split('T')[0], // Format as YYYY-MM-DD
                quantity: quantity
            })
        });
        
        const data = await response.json();
        console.log('Server response:', data);
        
        if (data.success) {
            alert('Product updated successfully!');
            // Update the display
            const qtyElement = document.getElementById(`qty-${productId}`);
            if (qtyElement) {
                qtyElement.textContent = quantity;
            }
            // Update our local array
            product.quantity = quantity;
        } else {
            alert('Error updating product: ' + data.message);
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('Cannot connect to server.');
    }
}

/**
 * Delete a product (DELETE operation)
 */
async function deleteProduct(productId) {
    console.log('Deleting product:', productId);
    
    // Find the product in our array
    const product = allProducts.find(p => p.id === productId);
    if (!product) {
        alert('Product not found');
        return;
    }
    
    const confirmed = confirm(`Are you sure you want to delete "${product.name}"?\n\nThis action cannot be undone.`);
    
    if (!confirmed) return;
    
    try {
        console.log('Sending DELETE request to:', `${API_BASE_URL}/products/${productId}`);
        
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        console.log('Server response:', data);
        
        if (data.success) {
            alert('Product deleted successfully!');
            // Remove from display
            const element = document.getElementById(`product-${productId}`);
            if (element) {
                element.remove();
            }
            // Remove from our local array
            allProducts = allProducts.filter(p => p.id !== productId);
            itemsShown--;
            updateItemTracker();
        } else {
            alert('Error deleting product: ' + data.message);
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('Cannot connect to server.');
    }
}

/**
 * Handle donation request
 */
/**
 * Handle donation request with quantity selection
 */
async function requestDonation(productId, productName) {
    // Find the product in our array
    const product = allProducts.find(p => p.id === productId);
    if (!product) {
        alert('Product not found');
        return;
    }
    
    // Check if product is still available
    if (product.quantity <= 0) {
        alert('Sorry, this product is no longer available.');
        return;
    }
    
    // Ask how many units they want to request
    const requestedQty = prompt(
        `How many units of ${productName} would you like to request?\n\nAvailable: ${product.quantity} units`,
        Math.min(1, product.quantity)
    );
    
    if (requestedQty === null) return; // User cancelled
    
    const quantity = parseInt(requestedQty);
    
    // Validate the quantity
    if (isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid quantity (greater than 0)');
        return;
    }
    
    if (quantity > product.quantity) {
        alert(`Sorry, only ${product.quantity} units are available.`);
        return;
    }
    
    // Confirm the request
    const confirmed = confirm(
        `Confirm your request:\n\nProduct: ${productName}\nQuantity: ${quantity} units\n\nThe available quantity will be reduced.`
    );
    
    if (!confirmed) return;
    
    try {
        // Calculate new quantity after request
        const newQuantity = product.quantity - quantity;
        
        // Update the product quantity in the database
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: product.category,
                name: product.name,
                expiration_date: product.expiration_date.split('T')[0],
                quantity: newQuantity
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert(`Request successful!\n\nYou requested ${quantity} units of ${productName}.\nRemaining: ${newQuantity} units\n\nThe donor will contact you shortly.`);
            
            // Update the display
            const qtyElement = document.getElementById(`qty-${productId}`);
            if (qtyElement) {
                qtyElement.textContent = newQuantity;
            }
            
            // Update our local array
            product.quantity = newQuantity;
            
            // If quantity reaches 0, optionally remove or gray out the item
            if (newQuantity === 0) {
                const productElement = document.getElementById(`product-${productId}`);
                if (productElement) {
                    productElement.style.opacity = '0.5';
                    productElement.innerHTML += '<p style="color: red; font-weight: bold; margin-top: 10px;">OUT OF STOCK</p>';
                }
            }
        } else {
            alert('Error processing request: ' + data.message);
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('Cannot connect to server. Please try again.');
    }
}

/**
 * Load more items when button is clicked
 */
function loadMoreItems() {
    const parentElement = document.getElementById('foodcontainer');
    if (!parentElement) return;
    
    const currentCount = itemsShown;
    const maxItemsToAdd = Math.min(itemsPerPage, allProducts.length - currentCount);
    
    for (let i = currentCount; i < currentCount + maxItemsToAdd; i++) {
        const product = allProducts[i];
        const foodDiv = createFoodItemElement(product);
        parentElement.appendChild(foodDiv);
    }
    
    itemsShown += maxItemsToAdd;
    updateItemTracker();
    
    // Hide button if all items shown
    const loadMoreBtn = document.getElementById('loadmore');
    if (loadMoreBtn && itemsShown >= allProducts.length) {
        loadMoreBtn.style.display = 'none';
    }
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
            <div class="error-message" style="padding: 20px; background-color: #f8d7da; color: #721c24; border-radius: 5px; text-align: center;">
                <p style="margin: 0; font-size: 18px;">⚠️ ${message}</p>
                <button onclick="location.reload()" style="margin-top: 10px; padding: 10px 20px; background-color: #721c24; color: white; border: none; border-radius: 5px; cursor: pointer;">Retry</button>
            </div>
        `;
    }
}

// Initialize: Fetch products when page loads
fetchProducts();