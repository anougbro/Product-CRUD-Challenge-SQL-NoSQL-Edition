// PRODUCT CRUD API - TEST EXAMPLES
// Use these examples to test the API endpoints

// =====================================================
// MONGODB (NoSQL) TESTS
// =====================================================

// 1. CREATE MONGODB PRODUCT
POST http://localhost:5000/api/nosql/products
Content-Type: application/json

{
  "name": "Gaming Laptop",
  "price": 1299.99,
  "category": "Electronics",
  "inStock": true
}

// Expected Response (201):
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Gaming Laptop",
    "price": 1299.99,
    "category": "Electronics",
    "inStock": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}

---

// 2. CREATE MONGODB PRODUCT (Minimal)
POST http://localhost:5000/api/nosql/products
Content-Type: application/json

{
  "name": "USB-C Cable",
  "price": 12.99
}

// Expected Response (201):
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "USB-C Cable",
    "price": 12.99,
    "category": null,
    "inStock": true,
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}

---

// 3. GET ALL MONGODB PRODUCTS
GET http://localhost:5000/api/nosql/products
GET http://localhost:5000/api/nosql/products?page=1&limit=5

// Expected Response (200):
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Gaming Laptop",
      "price": 1299.99,
      "category": "Electronics",
      "inStock": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "USB-C Cable",
      "price": 12.99,
      "category": null,
      "inStock": true,
      "createdAt": "2024-01-15T10:35:00.000Z",
      "updatedAt": "2024-01-15T10:35:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalProducts": 2
  }
}

---

// 4. GET SINGLE MONGODB PRODUCT
GET http://localhost:5000/api/nosql/products/507f1f77bcf86cd799439011

// Expected Response (200):
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Gaming Laptop",
    "price": 1299.99,
    "category": "Electronics",
    "inStock": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}

---

// 5. UPDATE MONGODB PRODUCT
PUT http://localhost:5000/api/nosql/products/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "price": 1199.99,
  "inStock": false
}

// Expected Response (200):
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Gaming Laptop",
    "price": 1199.99,
    "category": "Electronics",
    "inStock": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:40:00.000Z"
  }
}

---

// 6. DELETE MONGODB PRODUCT
DELETE http://localhost:5000/api/nosql/products/507f1f77bcf86cd799439012

// Expected Response (200):
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "USB-C Cable",
    "price": 12.99,
    "category": null,
    "inStock": true,
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}

---

// =====================================================
// MYSQL (SQL) TESTS
// =====================================================

// 1. CREATE MYSQL PRODUCT
POST http://localhost:5000/api/sql/products
Content-Type: application/json

{
  "name": "Mechanical Keyboard",
  "price": 149.99,
  "category": "Peripherals",
  "inStock": true
}

// Expected Response (201):
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "name": "Mechanical Keyboard",
    "price": 149.99,
    "category": "Peripherals",
    "inStock": 1,
    "createdAt": "2024-01-15 10:30:00",
    "updatedAt": "2024-01-15 10:30:00"
  }
}

---

// 2. CREATE MYSQL PRODUCT (Minimal)
POST http://localhost:5000/api/sql/products
Content-Type: application/json

{
  "name": "HDMI Cable",
  "price": 9.99
}

// Expected Response (201):
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 2,
    "name": "HDMI Cable",
    "price": 9.99,
    "category": null,
    "inStock": 1,
    "createdAt": "2024-01-15 10:35:00",
    "updatedAt": "2024-01-15 10:35:00"
  }
}

---

// 3. GET ALL MYSQL PRODUCTS
GET http://localhost:5000/api/sql/products
GET http://localhost:5000/api/sql/products?page=1&limit=5

// Expected Response (200):
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Mechanical Keyboard",
      "price": 149.99,
      "category": "Peripherals",
      "inStock": 1,
      "createdAt": "2024-01-15 10:30:00",
      "updatedAt": "2024-01-15 10:30:00"
    },
    {
      "id": 2,
      "name": "HDMI Cable",
      "price": 9.99,
      "category": null,
      "inStock": 1,
      "createdAt": "2024-01-15 10:35:00",
      "updatedAt": "2024-01-15 10:35:00"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalProducts": 2
  }
}

---

// 4. GET SINGLE MYSQL PRODUCT
GET http://localhost:5000/api/sql/products/1

// Expected Response (200):
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": 1,
    "name": "Mechanical Keyboard",
    "price": 149.99,
    "category": "Peripherals",
    "inStock": 1,
    "createdAt": "2024-01-15 10:30:00",
    "updatedAt": "2024-01-15 10:30:00"
  }
}

---

// 5. UPDATE MYSQL PRODUCT
PUT http://localhost:5000/api/sql/products/1
Content-Type: application/json

{
  "price": 129.99,
  "inStock": false
}

// Expected Response (200):
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": 1,
    "name": "Mechanical Keyboard",
    "price": 129.99,
    "category": "Peripherals",
    "inStock": 0,
    "createdAt": "2024-01-15 10:30:00",
    "updatedAt": "2024-01-15 10:40:00"
  }
}

---

// 6. DELETE MYSQL PRODUCT
DELETE http://localhost:5000/api/sql/products/2

// Expected Response (200):
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "id": 2,
    "name": "HDMI Cable",
    "price": 9.99,
    "category": null,
    "inStock": 1,
    "createdAt": "2024-01-15 10:35:00",
    "updatedAt": "2024-01-15 10:35:00"
  }
}

---

// =====================================================
// ERROR TEST CASES
// =====================================================

// Missing Required Field
POST http://localhost:5000/api/nosql/products
Content-Type: application/json

{
  "name": "Product Without Price"
}

// Expected Response (400):
{
  "success": false,
  "message": "Name and price are required fields"
}

---

// Invalid MongoDB ID Format
GET http://localhost:5000/api/nosql/products/invalid-id

// Expected Response (400):
{
  "success": false,
  "message": "Invalid product ID format"
}

---

// Product Not Found
GET http://localhost:5000/api/nosql/products/507f1f77bcf86cd799999999

// Expected Response (404):
{
  "success": false,
  "message": "Product not found"
}

---

// Invalid Numeric ID (MySQL)
GET http://localhost:5000/api/sql/products/abc

// Expected Response (400):
{
  "success": false,
  "message": "Invalid product ID format"
}

---

// No Fields to Update
PUT http://localhost:5000/api/sql/products/1
Content-Type: application/json

{}

// Expected Response (400):
{
  "success": false,
  "message": "No fields to update"
}

---

// =====================================================
// USING WITH CURL
// =====================================================

// MongoDB - Create
curl -X POST http://localhost:5000/api/nosql/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":99.99,"category":"Test"}'

// MongoDB - Get All
curl http://localhost:5000/api/nosql/products

// MongoDB - Get One
curl http://localhost:5000/api/nosql/products/507f1f77bcf86cd799439011

// MongoDB - Update
curl -X PUT http://localhost:5000/api/nosql/products/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"price":89.99}'

// MongoDB - Delete
curl -X DELETE http://localhost:5000/api/nosql/products/507f1f77bcf86cd799439011

// MySQL - Create
curl -X POST http://localhost:5000/api/sql/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":99.99,"category":"Test"}'

// MySQL - Get All
curl http://localhost:5000/api/sql/products

// MySQL - Get One
curl http://localhost:5000/api/sql/products/1

// MySQL - Update
curl -X PUT http://localhost:5000/api/sql/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":89.99}'

// MySQL - Delete
curl -X DELETE http://localhost:5000/api/sql/products/1
