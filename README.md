# IMAGIFY

## Overview
IMAGIFY is an advanced image processing and management application built using the MERN (MongoDB, Express, React, Node.js) stack. This project provides users with features to upload, edit, and manage images efficiently.

## Features
- User authentication and authorization
- Image upload and storage
- Image editing functionalities (cropping, resizing, filtering, etc.)
- Secure storage with Cloudinary or other storage options
- Responsive UI for an enhanced user experience
- Dashboard to manage uploaded images

## Tech Stack
### Frontend:
- React.js
- Tailwind CSS / Bootstrap for styling
- Redux (if applicable)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose for schema modeling)
- Cloudinary (for image storage)

### Additional Tools:
- JWT Authentication
- Multer for file uploads
- dotenv for environment variables

## Installation and Setup
### Prerequisites:
Ensure you have the following installed:
- Node.js
- MongoDB (local or Atlas)
- Git

### Clone the Repository
```bash
git clone https://github.com/Ayushrak/IMAGIFY.git
cd IMAGIFY
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the required environment variables:
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

### Running the Application
- The backend server runs on `http://localhost:5000`
- The frontend runs on `http://localhost:3000`

## Usage
1. Register/Login to access the application.
2. Upload images via the dashboard.
3. Apply edits and transformations.
4. Manage stored images.

## Contributing
Feel free to fork this repository, raise issues, and submit pull requests!

## License
This project is licensed under the MIT License.

## Contact
For any queries, contact [Ayushrak](https://github.com/Ayushrak).

