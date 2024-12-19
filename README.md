# Task-Manager-API-with-Express.js
It is a comprehensive RESTful API for managing tasks using Express.js and core concepts. The API will allow users to create, read,
update, and delete tasks, as well as organize tasks by categories. 
The task data will be stored in JSON files for persistence.


## Table of Content
- [Installation](#Installation)
- [Usage](#Usage)
- [Endpoints](#Endpoints)
- [Contributing](#Contributing)
- [License](#License)

##  Installation

1. Make sure you have Node.js installed. (To download Node.js: [Node.js Official Site](https://nodejs.org))
2. Clone the repository:
   ``` bash 
   git clone https://github.com/faikmermer/Basic-Book-Directory-API.git 
3. Install the dependencies:  
   ```bash
   npm install
   npm init - y
   npm install express
   npm install --save-dev typescript @types/node @types/express ts-node nodemon

4. You can edit the TypeScript Settings yourself (tsconfig.json)
   ```bash
   {
   "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
   },
   "include": ["src/**/*"],
   "exclude": ["node_modules"]
   }
## Usage

To use the API, send HTTP requests to the provided endpoints. You can use tools like Postman or cURL to interact with the API.

## Endpoints
### 1-POST /tasks
* Request Body:
``` 
{
  "title": "Buy groceries",
  "description": "Milk, Bread, Cheese",
  "category": "Personal",
  "dueDate": "2024-10-15"

}  
 ```
 ```
* Response:
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, Bread, Cheese",
  "category": "Personal",
  "dueDate": "2024-10-15",
  "status": "pending"
}
```
### 2- GET /tasks
* Response:
```
[
 {
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, Bread, Cheese",
  "category": "Personal",
  "dueDate": "2024-10-15",
  "status": "pending"
 },
 {
  "id": 2,
  "title": "Finish project",
  "description": "Complete by Friday",
  "category": "Work",
  "dueDate": "2024-10-14",
  "status": "completed"
 }
]
```

### 3- GET /tasks/1
* Response:
```
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, Bread, Cheese",
  "category": "Personal",
  "dueDate": "2024-10-15",
  "status": "pending"
}
```
### 4- PUT /tasks/1
* Request Body:
 ```
{
3
  "title": "Buy groceries and vegetables",
  "description": "Milk, Bread, Cheese, Vegetables",
  "category": "Personal",
  "dueDate": "2024-10-16",
  "status": "pending"
}
```
* Response:
```

{
  "id": 1,
  "title": "Buy groceries and vegetables",
  "description": "Milk, Bread, Cheese, Vegetables",
  "category": "Personal",
  "dueDate": "2024-10-16",
  "status": "pending"
}
```
### 5- DELETE /tasks/1
* Response:
```
{
  "message": "Task deleted successfully"
}
```

### 6- GET /tasks?category=Work
* Response:
```
[
 {
  "id": 2,
  "title": "Finish project",
  "description": "Complete by Friday",
  "category": "Work",
  "dueDate": "2024-10-14",
  "status": "completed"
 }
]
```

### 7- PATCH /tasks/1/status
* Request Body:
```
{
"status": "completed"
}
```
* Response:
```
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, Bread, Cheese",
  "category": "Personal",
  "dueDate": "2024-10-15",
  "status": "completed"
}
```
## Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

License
Distributed under the Unlicense License.
