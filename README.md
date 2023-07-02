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
