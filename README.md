# eBay Clone GraphQL TypeScript

This is a project for building an eBay clone website using GraphQL and TypeScript. The application aims to replicate the core functionalities of eBay, such as user registration, product listing, bidding, and payment processing.

## Features

- **User Registration and Authentication:** Users can create accounts, log in, and authenticate themselves to access protected features.
- **Product Listing:** Sellers can create listings for products they want to sell, including title, description, images, and pricing information.
- **Product Search and Filtering:** Users can search for specific products and apply filters to narrow down their search results.
- **Bidding:** Users can place bids on products they are interested in, and the highest bidder wins the auction.
- **Payment Processing:** Integration with a payment gateway to handle secure and reliable online transactions.
- **User Ratings and Reviews:** Users can leave ratings and reviews for sellers and products they have interacted with.
- **Notifications:** Users receive notifications for important events, such as bid updates, winning bids, and payment confirmation.

## Technologies Used

- **GraphQL**: A query language for APIs that provides a flexible and efficient approach to data fetching and manipulation.
- **TypeScript**: A strongly typed superset of JavaScript that helps catch errors early and improves code maintainability.
- **Node.js**: A runtime environment for executing JavaScript code server-side.
- **Express**: A web application framework for Node.js that provides a robust set of features for building web applications and APIs.
- **Apollo Server**: An open-source GraphQL server that integrates with various JavaScript frameworks, including Express.
- **MongoDB**: A popular NoSQL database for storing application data.
- **Mongoose**: An object modeling tool for Node.js that provides a straightforward way to interact with MongoDB.

## Setup and Installation

- Clone the repository: `git clone https://github.com/BaseMax/EbayGraphQLTS.git`
- Navigate to the project directory: `cd EbayGraphQLTS`
- Install dependencies: `npm install`
- Set up environment variables:
  - Create a .env file in the root directory.
  - Define the necessary environment variables, such as database connection details and API keys.
- Start the server: `npm run start:server`

Note: Make sure you have MongoDB installed and running locally or provide the appropriate connection details in the `.env` file.

## GraphQL Queries and Mutations

| Query/Mutation | Description |
| -------------- | ----------- |
| `getUser(id: ID!)` | Retrieve a user's information by their ID. |
| `getProduct(id: ID!)` | Retrieve a product's information by its ID. |
| `searchProducts(searchInput: String)` | Search for products based on a search query. |
| `getBidsByUser(userId: ID!)` | Retrieve all bids made by a specific user. |
| `getBidsByProduct(productId: ID!)` | Retrieve all bids made on a specific product. |
| `getCartByUser(userId: ID!)` | Retrieve the cart items for a specific user. |
| `getOrdersByUser(userId: ID!)` | Retrieve all orders made by a specific user. |
| `getOrdersByProduct(productId: ID!)` | Retrieve all orders made for a specific product. |
| `getSellerProducts(userId: ID!)` | Retrieve all products listed by a specific seller. |
| `getProductReviews(productId: ID!)` | Retrieve all reviews for a specific product. |
| `getNotifications(userId: ID!)` | Retrieve all notifications for a specific user. |
| `getPaymentMethods(userId: ID!)` | Retrieve all payment methods associated with a specific user. |
| `getShippingAddress(userId: ID!)` | Retrieve the shipping address for a specific user. |
| `getBillingAddress(userId: ID!)` | Retrieve the billing address for a specific user. |
| `getCategories` | Retrieve a list of available product categories. |
| `getSubcategories(categoryId: ID!)` | Retrieve all subcategories under a specific category. |
| `getTrendingProducts` | Retrieve a list of trending products based on popularity. |
| `getRecommendedProducts(userId: ID!)` | Retrieve a list of recommended products for a specific user. |
| `getPopularProducts` | Retrieve a list of popular products based on sales and ratings. |
| `getRecentProducts` | Retrieve a list of recently added products. |
| `getFeaturedProducts` | Retrieve a list of featured products. |
| `getUserCount` | Retrieve the total number of registered users. |
| `getProductCount` | Retrieve the total number of listed products. |
| `getOrderCount` | Retrieve the total number of orders placed. |
| `getCartCount(userId: ID!)` | Retrieve the number of items in the cart for a specific user. |
| `getUnreadNotificationCount(userId: ID!)` | Retrieve the number of unread notifications for a specific user. |
| `registerUser(input: UserInput!)` | Register a new user with the provided details. |
| `loginUser(email: String!, password: String!)` | Authenticate a user and generate an access token. |
| `loginUser(productId: ID!, totalAmount: Int!)` | make order |
| `createProduct(input: ProductInput!)` | Create a new product listing with the provided details. |
| `updateProduct(id: ID!, input: ProductInput!)` | Update an existing product listing with the provided details. |
| `deleteProduct(id: ID!)` | Delete a product listing by its ID. |
| `placeBid(productId: ID!, amount: Float!)` | Place a bid on a specific product. |
| `addToCart(userId: ID!, productId: ID!)` | Add a product to the cart for a specific user. |
| `removeFromCart(productId: ID!)` | Remove a product from the cart for a specific user. |
| `checkout(userId: ID!)` | Proceed with the checkout process to complete an order. |
| `leaveReview(productId: ID!, rating: Int!, comment: String!)` | Leave a review for a specific product. |
| `updateShippingAddress(userId: ID!, input: AddressInput!)` | Update the shipping address for a specific user. |
| `updateBillingAddress(userId: ID!, input: AddressInput!)` | Update the billing address for a specific user. |
| `addPaymentMethod(userId: ID!, input: PaymentMethodInput!)` | Add a new payment method for a specific user. |
| `deletePaymentMethod(userId: ID!, paymentMethodId: ID!)` | Delete a payment method for a specific user. |
| `markNotificationAsRead(userId: ID!, notificationId: ID!)` | Mark a notification as read for a specific user. |
| `markAllNotificationsAsRead(userId: ID!)` | Mark all notifications as read for a specific user. |

Feel free to customize this table by adding or removing queries and mutations based 

## GraphQL Examples

### `getUser(id: ID!)`

```graphql
query {
  getUser(id: "user123") {
    id
    name
    email
    createdDate
  }
}
```

### `getProduct(id: ID!)`

```graphql
query {
  getProduct(id: "product123") {
    id
    title
    description
    price
    seller {
      id
      name
    }
  }
}
```

### `searchProducts(searchInput: String)`

```graphql
query {
  searchProducts(searchInput: "iPhone") {
    id
    title
    price
  }
}
```

### `getBidsByUser(userId: ID!)`

```graphql
query {
  getBidsByUser(userId: "user123") {
    id
    amount
    product {
      id
      title
    }
  }
}
```

### `getCartByUser(userId: ID!)`

```graphql
query {
  getCartByUser(userId: "user123") {
    id
    product {
      id
      title
      price
    }
    quantity
  }
}
```

### `getCategories`

```graphql
query {
  getCategories {
    id
    name
  }
}
```

### `registerUser(input: UserInput!)`

```graphql
mutation {
  registerUser(input: {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123"
  }) {
    id
    name
    email
    createdDate
  }
}
```

### `createProduct(input: ProductInput!)`

```graphql
mutation {
  createProduct(input: {
    title: "iPhone 12 Pro",
    description: "A powerful smartphone with advanced features.",
    price: 999.99,
    sellerId: "seller123"
  }) {
    id
    title
    description
    price
    seller {
      id
      name
    }
  }
}
```

### `placeBid(productId: ID!, amount: Float!)`

```graphql
mutation {
  placeBid(pb: {
    productId: "product123", amount: 500.0
  }) {
    id
    amount
    product {
      id
      title
    }
  }
}
```

### `addToCart(userId: ID!, productId: ID!)`

```graphql
mutation {
  addToCart(userId: "user123", productId: "product123") {
    id
    product {
      id
      title
      price
    }
    quantity
  }
}
```

### `checkout(userId: ID!)`

```graphql
mutation {
  checkout(userId: "user123") {
    id
    totalAmount
    items {
      product {
        id
        title
        price
      }
      quantity
    }
  }
}
```

### `leaveReview(productId: ID!, rating: Int!, comment: String!)`

```graphql
mutation {
  leaveReview(productId: "product123", rating: 4, comment: "Great product!") {
    id
    rating
    comment
    product {
      id
      title
    }
  }
}
```

### `getOrdersByUser(userId: ID!)`

```graphql
query {
  getOrdersByUser(userId: "user123") {
    id
    totalAmount
    items {
      product {
        id
        title
        price
      }
      quantity
    }
  }
}
```

### `getProductReviews(productId: ID!)`

```graphql
query {
  getProductReviews(productId: "product123") {
    id
    rating
    comment
    user {
      id
      name
    }
  }
}
```

### `getRecentProducts`

```graphql
query {
  getRecentProducts {
    id
    title
    price
  }
}
```

### `updateProduct(id: ID!, input: ProductInput!)`

```graphql
mutation {
  updateProduct(input: {
    title: "iPhone 13 Pro",
    description: "The latest flagship smartphone from Apple.",
    price: 1099.99
    productId: "id"
  }) {
    id
    title
    description
    price
    seller {
      id
      name
    }
  }
}
```

### `removeFromCart(userId: ID!, productId: ID!)`

```graphql
mutation {
  removeFromCart(productId: "product123") {
    id
    product {
      id
      title
      price
    }
    quantity
  }
}
```

### `updateShippingAddress(userId: ID!, input: AddressInput!)`

```graphql
mutation {
  updateShippingAddress(userId: "user123", input: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001"
  }) {
    id
    shippingAddress {
      street
      city
      state
      zipCode
    }
  }
}
```

### `markNotificationAsRead(userId: ID!, notificationId: ID!)`

```graphql
mutation {
  markNotificationAsRead(userId: "user123", notificationId: "notification123") {
    id
    title
    content
    isRead
  }
}
```

### `getSellerSales(userId: ID!)`

```graphql
query {
  getSellerSales(userId: "seller123") {
    id
    totalAmount
    buyer {
      id
      name
    }
  }
}
```

### `getSellerRevenue(userId: ID!)`

```graphql
query {
  getSellerRevenue(userId: "seller123") {
    totalRevenue
  }
}
```

### `getPopularProducts`

```graphql
query {
  getPopularProducts {
    id
    title
    price
  }
}
```

### `deleteProduct(id: ID!)`

```graphql
mutation {
  deleteProduct(id: "product123") {
    id
    deleted
  }
}
```

### `updateBillingAddress(userId: ID!, input: AddressInput!)`

```graphql
mutation {
  updateBillingAddress(userId: "user123", input: {
    street: "456 Main St",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001"
  }) {
    id
    billingAddress {
      street
      city
      state
      zipCode
    }
  }
}
```

### `addPaymentMethod(userId: ID!, input: PaymentMethodInput!)`

```graphql
mutation {
  addPaymentMethod(userId: "user123", input: {
    type: "credit_card",
    cardNumber: "**** **** **** 1234",
    expirationDate: "12/24",
    cvv: "***"
  }) {
    id
    type
    cardNumber
  }
}
```

### `markAllNotificationsAsRead(userId: ID!)`

```graphql
mutation {
  markAllNotificationsAsRead(userId: "user123") {
    id
    title
    content
    isRead
  }
}
```

### `getSellerRatings(userId: ID!)`

```graphql
query {
  getSellerRatings(userId: "seller123") {
    averageRating
    totalRatings
  }
}
```

### `getNotifications(userId: ID!)`

```graphql
query {
  getNotifications(userId: "user123") {
    id
    title
    content
    isRead
  }
}
```

### `getPaymentMethods(userId: ID!)`

```graphql
query {
  getPaymentMethods(userId: "user123") {
    id
    type
    cardNumber
  }
}
```

### `updateProduct(id: ID!, input: ProductInput!)`

```graphql
mutation {
  updateProduct(id: "product123", input: {
    title: "iPhone 13 Pro",
    description: "The latest flagship smartphone from Apple.",
    price: 1099.99
  }) {
    id
    title
    description
    price
    seller {
      id
      name
    }
  }
}
```

### `checkout(userId: ID!)`

```graphql
mutation {
  checkout(userId: "user123") {
    id
    totalAmount
    items {
      product {
        id
        title
        price
      }
      quantity
    }
  }
}
```

### `deletePaymentMethod(userId: ID!, paymentMethodId: ID!)`

```graphql
mutation {
  deletePaymentMethod(userId: "user123", paymentMethodId: "paymentMethod123") {
    id
    type
    cardNumber
  }
}
```

### `getUnreadNotificationCount(userId: ID!)`

```graphql
mutation {
  getUnreadNotificationCount(userId: "user123") {
    unreadCount
  }
}
```

### `getSellerListings(userId: ID!)`

```graphql
query {
  getSellerListings(userId: "seller123") {
    id
    title
    price
    status
  }
}
```

### `getBuyerPurchases(userId: ID!)`

```graphql
query {
  getBuyerPurchases(userId: "user123") {
    id
    totalAmount
    seller {
      id
      name
    }
  }
}
```

### `getCategoryProducts(categoryId: ID!)`

```graphql
query {
  getCategoryProducts(categoryId: "category123") {
    id
    title
    price
  }
}
```

### `updateUser(id: ID!, input: UserInput!)`

```graphql
mutation {
  updateUser(id: "user123", input: {
    name: "Jane Smith",
    email: "janesmith@example.com"
  }) {
    id
    name
    email
  }
}
```

### `removeReview(productId: ID!, reviewId: ID!)`

```graphql
mutation {
  removeReview(productId: "product123", reviewId: "review123") {
    id
    rating
    comment
  }
}
```

### `clearCart(userId: ID!)`

```graphql
mutation {
  clearCart(userId: "user123") {
    id
    product {
      id
      title
      price
    }
    quantity
  }
}
```

### `markNotificationAsUnread(userId: ID!, notificationId: ID!)`

```graphql
mutation {
  markNotificationAsUnread(userId: "user123", notificationId: "notification123") {
    id
    title
    content
    isRead
  }
}
```

These are just a few examples of how the queries and mutations can be used. Feel free to adapt them based on your specific use case and API design.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

- Fork the repository.
- Create a new branch: git checkout -b feature/your-feature-name
- Make your changes and commit them: git commit -m 'Add some feature'
- Push to the branch: git push origin feature/your-feature-name
- Submit a pull request explaining your changes.

## License

This project is licensed under the GPL-3.0 License. Feel free to use, modify, and distribute the code as per the license terms.

Copyright 2023, Max Base