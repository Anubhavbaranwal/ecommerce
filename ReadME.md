# Project Title

This is a simple Express.js application that provides a RESTful API for managing products and their variants. It includes endpoints for creating, retrieving, updating, and deleting products and variants, as well as searching for products.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Environment Variables

This project uses environment variables for configuration. These are loaded from a `.env` file in the project root. Here's an example of what it should contain:

```env
PORT=portnumber
URL=mongodburl
```

### Prerequisites

- Node.js
- MongoDB

### Installing

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the server with `npm start`



## API Endpoints

- /api/v1

### Products

- POST /add: Add a new product
- GET /: Get all products
- GET /:id: Get a specific product
- PUT /:id: Update a specific product
- DELETE /:id: Delete a specific product

### Variants

- POST /:productId/variant: Add a new variant to a product
- GET /:productId/variant/:id: Get a specific variant
- PUT /:productId/variant/:id: Update a specific variant
- DELETE /:productId/variant/:id: Delete a specific variant

### Search

- GET /search: Search for products

## Built With

- Express.js - The web framework used
- MongoDB - Database

## Authors

- Anubhav Baranwal (anubhavbaranwal08@gmail.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](/e:/ecommerce_api/LICENSE.md) file for details


```
