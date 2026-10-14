export function getcart() {

    // Get the cart data stored in localStorage
    const cart = localStorage.getItem("cart");

    // Check if the cart does not exist
    if (cart === null) {
        // Create an empty cart in localStorage
        localStorage.setItem("cart", "[]");
        return [];

    } else {
        // Convert the JSON string into a JavaScript array
        const cartItems = JSON.parse(cart);
        return cartItems;
    }
}

export function addToCart(product, quantity) {
    // Get the current cart items
    const cart = getcart();
    // Check if the product is already in the cart
    console.log(cart);
    const existingItemIndex = cart.findIndex(
        (productItem) => {
            // Compare the productID of the existing item with the productID of the new product
            return productItem.product.productID === product.productID;
        }
    );

    if (existingItemIndex == -1) {
        if(quantity > 0) {
            cart.push(
                {
                    product:{
                        productID: product.productID,
                        name: product.productName,
                        price: product.price,
                        image: product.images?.[0] || product.image || "/placeholder.jpg"  // ✅ Safe with fallback                    
                    },
                        quantity: quantity
                    
                }
            );
        }
    } else {
        const newQty = cart[existingItemIndex].quantity + quantity;
        if(newQty > 0) {
            cart[existingItemIndex].quantity = newQty;
        } else {
            // If the new quantity is zero or negative, remove the item from the cart
            cart.splice(existingItemIndex, 1);
        }
    }

    const catString = JSON.stringify(cart);

    // Update the cart in localStorage
    localStorage.setItem("cart", catString);
    return cart;
}


export function getCartTotal(cart) {
    let total = 0;

    for(let i=0;i<cart.length;i++) {
        total += cart[i].product.price * cart[i].quantity;
    }

    return total;
}