# Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Extract & Install
```bash
unzip product-crud-app.zip
cd product-crud-app
npm install
```

### Step 2: Configure Databases

#### MongoDB
Ensure MongoDB is running:
```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with your connection string
```

#### MySQL
Ensure MySQL is running and create database:
```bash
# macOS with Homebrew
brew services start mysql

# Linux
sudo systemctl start mysql

# Create database
mysql -u root -p
> CREATE DATABASE products_db;
> EXIT;
```

Update `.env` with your MySQL credentials:
```
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=products_db
```

### Step 3: Start Server
```bash
npm start
```

You should see:
```
✓ MongoDB connected successfully
✓ MySQL Products table initialized successfully
🚀 Server is running on port 5000
```

## 🧪 Quick Test

### Option 1: Using curl
```bash
# Create a product (MongoDB)
curl -X POST http://localhost:5000/api/nosql/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":99.99}'

# Get all products (MongoDB)
curl http://localhost:5000/api/nosql/products

# Create a product (MySQL)
curl -X POST http://localhost:5000/api/sql/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":99.99}'

# Get all products (MySQL)
curl http://localhost:5000/api/sql/products
```

### Option 2: Using Postman
1. Import the endpoints below into Postman
2. Send requests to test CRUD operations

**MongoDB Endpoints:**
- POST: http://localhost:5000/api/nosql/products
- GET: http://localhost:5000/api/nosql/products
- GET: http://localhost:5000/api/nosql/products/{id}
- PUT: http://localhost:5000/api/nosql/products/{id}
- DELETE: http://localhost:5000/api/nosql/products/{id}

**MySQL Endpoints:**
- POST: http://localhost:5000/api/sql/products
- GET: http://localhost:5000/api/sql/products
- GET: http://localhost:5000/api/sql/products/{id}
- PUT: http://localhost:5000/api/sql/products/{id}
- DELETE: http://localhost:5000/api/sql/products/{id}

## 📝 Sample Request Body

```json
{
  "name": "Gaming Laptop",
  "price": 1299.99,
  "category": "Electronics",
  "inStock": true
}
```

## 🚨 Common Issues

### MongoDB Connection Failed
```
Solution: Start MongoDB
brew services start mongodb-community
```

### MySQL Connection Failed
```
Solution: Check .env credentials and start MySQL
brew services start mysql
```

### Port 5000 Already in Use
```
Solution: Change PORT in .env or kill process
lsof -ti:5000 | xargs kill -9
```

### npm install fails
```
Solution: Clear cache and retry
npm cache clean --force
npm install
```

## 📚 Documentation

- See `README.md` for detailed documentation
- See `API_TESTS.md` for full API examples
- Check console logs for detailed error messages

## 🔄 Development Mode

For hot-reload during development:
```bash
npm run dev
```

## 🎯 Next Steps

1. ✅ Complete the quick start above
2. ✅ Test CRUD operations with curl or Postman
3. 📖 Read README.md for detailed documentation
4. 🧪 Review API_TESTS.md for all examples
5. 🔍 Explore the code in controllers/ folder

## 💡 Tips

- MongoDB uses ObjectId (24-character string) as ID
- MySQL uses auto-increment integer as ID
- Both databases accept the same request format
- Responses have identical structure for consistency
- Use pagination with `?page=1&limit=10` on GET requests

---

**You're all set!** 🎉

Happy coding! If you need help, refer to the troubleshooting section in README.md
