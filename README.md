# Product CRUD API - MongoDB & MySQL

A comprehensive Node.js application demonstrating CRUD operations with both **MongoDB (NoSQL)** and **MySQL (SQL)** databases. This project showcases how to implement consistent business logic across different database systems.

## 🎯 Project Overview

This project implements a **Product Management System** with identical CRUD operations across two different database technologies:

- **MongoDB**: NoSQL document database using Mongoose ODM
- **MySQL**: Relational SQL database using mysql2 driver

Both implementations follow the same API structure and business logic patterns.

## 📋 Product Schema

### Fields:
- **id**: Auto-generated primary key
- **name**: String (required, minimum 3 characters)
- **price**: Number (required, minimum 0)
- **category**: String (optional)
- **inStock**: Boolean (default: true)
- **createdAt**: Timestamp (auto-generated)
- **updatedAt**: Timestamp (auto-generated)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or remote URI)
- MySQL (v5.7 or higher)
- npm or yarn

### Installation

1. **Extract the project**
   ```bash
   unzip product-crud-app.zip
   cd product-crud-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Edit the `.env` file with your database credentials:
   ```
   PORT=5000
   NODE_ENV=development
   
   # MongoDB
   MONGODB_URI=mongodb://localhost:27017/products_db
   
   # MySQL
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=your_password
   MYSQL_DATABASE=products_db
   MYSQL_PORT=3306
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api`

### MongoDB (NoSQL) Endpoints

#### 1. Create Product
```http
POST /nosql/products
Content-Type: application/json

{
  "name": "Laptop",
  "price": 999.99,
  "category": "Electronics",
  "inStock": true
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop",
    "price": 999.99,
    "category": "Electronics",
    "inStock": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### 2. Get All Products
```http
GET /nosql/products?page=1&limit=10
```

**Response (200):**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalProducts": 50
  }
}
```

#### 3. Get Single Product
```http
GET /nosql/products/:id
```

#### 4. Update Product
```http
PUT /nosql/products/:id
Content-Type: application/json

{
  "price": 899.99,
  "inStock": false
}
```

#### 5. Delete Product
```http
DELETE /nosql/products/:id
```

### MySQL (SQL) Endpoints

All endpoints follow the same structure but use `/sql/products` prefix instead of `/nosql/products`:

- `POST /sql/products` - Create product
- `GET /sql/products` - Get all products
- `GET /sql/products/:id` - Get single product
- `PUT /sql/products/:id` - Update product
- `DELETE /sql/products/:id` - Delete product

## 📁 Project Structure

```
product-crud-app/
├── controllers/
│   ├── noSQLcontroller.js      # MongoDB CRUD operations
│   └── SQLcontroller.js         # MySQL CRUD operations
├── models/
│   ├── mongoProduct.js          # Mongoose schema
│   └── mysqlDatabase.js         # MySQL connection & initialization
├── routes/
│   └── products.js              # Express routes
├── server.js                    # Main server file
├── package.json                 # Dependencies
├── .env                         # Environment variables
└── README.md                    # This file
```

## 💡 Key Features

### MongoDB Implementation (noSQLcontroller.js)

- **Mongoose Schema**: Define model with validation rules
- **Flexible Queries**: MongoDB's document-based queries
- **Automatic Timestamps**: createdAt and updatedAt fields
- **Data Validation**: Schema-level validation
- **ID Format**: Uses MongoDB ObjectId (24-character hex string)

### MySQL Implementation (SQLcontroller.js)

- **Parameterized Queries**: Prevent SQL injection attacks
- **Connection Pooling**: Efficient database connection management
- **Dynamic Updates**: Build SQL queries dynamically
- **Transaction Support**: Each operation properly handles connections
- **ID Format**: Uses auto-increment integer

## 🔒 Security Features

1. **Parameterized Queries**: All SQL queries use parameterized statements
2. **Input Validation**: Required fields are validated before database operations
3. **Error Handling**: Comprehensive error handling with proper HTTP status codes
4. **CORS**: Cross-Origin Resource Sharing enabled
5. **Body Parsing Limits**: Prevent large payload attacks

## 🧪 Testing with cURL

### MongoDB - Create Product
```bash
curl -X POST http://localhost:5000/api/nosql/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Mouse",
    "price": 29.99,
    "category": "Accessories",
    "inStock": true
  }'
```

### MongoDB - Get All Products
```bash
curl http://localhost:5000/api/nosql/products
```

### MongoDB - Get Single Product
```bash
curl http://localhost:5000/api/nosql/products/507f1f77bcf86cd799439011
```

### MySQL - Create Product
```bash
curl -X POST http://localhost:5000/api/sql/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "USB Hub",
    "price": 19.99,
    "category": "Accessories"
  }'
```

### MySQL - Get All Products
```bash
curl http://localhost:5000/api/sql/products
```

## 📊 Comparison: MongoDB vs MySQL

| Aspect | MongoDB | MySQL |
|--------|---------|-------|
| **Type** | Document (NoSQL) | Relational (SQL) |
| **Schema** | Flexible | Fixed |
| **Scaling** | Horizontal (easier) | Vertical (traditional) |
| **Query Speed** | Fast for documents | Fast for relations |
| **ACID** | Multi-document | Full ACID |
| **ID Type** | ObjectId (24-char) | Integer (auto-increment) |
| **Best For** | Flexible data, rapid development | Structured data, complex queries |

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify network connectivity

### MySQL Connection Error
- Ensure MySQL is running: `mysql.server start` (macOS)
- Check credentials in `.env`
- Ensure database exists: `CREATE DATABASE products_db;`

### Port Already in Use
- Change PORT in `.env` file
- Or kill process: `lsof -ti:5000 | xargs kill -9` (macOS/Linux)

## 📝 Example Workflow

1. **Start Server**
   ```bash
   npm start
   ```

2. **Create MongoDB Product**
   ```bash
   curl -X POST http://localhost:5000/api/nosql/products \
     -H "Content-Type: application/json" \
     -d '{"name":"Phone","price":799,"category":"Electronics"}'
   ```

3. **Create MySQL Product**
   ```bash
   curl -X POST http://localhost:5000/api/sql/products \
     -H "Content-Type: application/json" \
     -d '{"name":"Phone","price":799,"category":"Electronics"}'
   ```

4. **Compare Results**
   ```bash
   curl http://localhost:5000/api/nosql/products
   curl http://localhost:5000/api/sql/products
   ```

## 🎓 Learning Outcomes

This project demonstrates:

✅ Creating and managing MongoDB documents with Mongoose
✅ Creating and managing MySQL records with mysql2
✅ Building consistent REST APIs across different databases
✅ Parameterized SQL queries for security
✅ Proper error handling and validation
✅ Pagination and filtering in both databases
✅ Connection pooling for MySQL
✅ Document timestamps in MongoDB

## 📚 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **mysql2**: MySQL driver with Promise support
- **dotenv**: Environment variable management
- **cors**: Enable CORS
- **body-parser**: Parse request bodies

## 🔄 Development vs Production

### Development
```bash
npm run dev
# Uses nodemon for auto-reload
```

### Production
```bash
npm start
# Direct execution
```

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork and submit pull requests for any improvements!

---

**Happy Coding!** 🎉

If you encounter any issues or have questions, please refer to the troubleshooting section or check the console logs for detailed error messages.
