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
| `getWinningBid(productId: ID!)` | Retrieve the winning bid for a specific product. |
| `getCartByUser(userId: ID!)` | Retrieve the cart items for a specific user. |
| `getOrdersByUser(userId: ID!)` | Retrieve all orders made by a specific user. |
| `getOrdersByProduct(productId: ID!)` | Retrieve all orders made for a specific product. |
| `getSellerProducts(userId: ID!)` | Retrieve all products listed by a specific seller. |
| `getSellerSales(userId: ID!)` | Retrieve all sales made by a specific seller. |
| `getSellerRevenue(userId: ID!)` | Retrieve the total revenue generated by a specific seller. |
| `getProductReviews(productId: ID!)` | Retrieve all reviews for a specific product. |
| `getSellerRatings(userId: ID!)` | Retrieve the average ratings for a specific seller. |
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
| `createProduct(input: ProductInput!)` | Create a new product listing with the provided details. |
| `updateProduct(id: ID!, input: ProductInput!)` | Update an existing product listing with the provided details. |
| `deleteProduct(id: ID!)` | Delete a product listing by its ID. |
| `placeBid(productId: ID!, amount: Float!)` | Place a bid on a specific product. |
| `addToCart(userId: ID!, productId: ID!)` | Add a product to the cart for a specific user. |
| `removeFromCart(userId: ID!, productId: ID!)` | Remove a product from the cart for a specific user. |
| `checkout(userId: ID!)` | Proceed with the checkout process to complete an order. |
| `leaveReview(productId: ID!, rating: Int!, comment: String!)` | Leave a review for a specific product. |
| `updateShippingAddress(userId: ID!, input: AddressInput!)` | Update the shipping address for a specific user. |
| `updateBillingAddress(userId: ID!, input: AddressInput!)` | Update the billing address for a specific user. |
| `addPaymentMethod(userId: ID!, input: PaymentMethodInput!)` | Add a new payment method for a specific user. |
| `deletePaymentMethod(userId: ID!, paymentMethodId: ID!)` | Delete a payment method for a specific user. |
| `markNotificationAsRead(userId: ID!, notificationId: ID!)` | Mark a notification as read for a specific user. |
| `markAllNotificationsAsRead(userId: ID!)` | Mark all notifications as read for a specific user. |

Feel free to customize this table by adding or removing queries and mutations based 


## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

- Fork the repository.
- Create a new branch: git checkout -b feature/your-feature-name
- Make your changes and commit them: git commit -m 'Add some feature'
- Push to the branch: git push origin feature/your-feature-name
- Submit a pull request explaining your changes.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute the code as per the license terms.

Copyright 2023, Max Base
