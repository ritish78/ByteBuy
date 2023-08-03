# ByteBuy
Yet another store, eh!

Hosted on Render: https://bytebuy.onrender.com/

# ByteBuy Platform Highlights:

1. **Interactive Product Display:** Engage users with dynamic product image looping on hover, enhancing the browsing experience.

2. **Efficient Sales Management:** Admins set sales, defining discounts for items, boosting pricing strategies.

3. **User-Centric Requests:** Non-signed users send 30 requests/60s, logged-in users send 100, optimizing engagement.

4. **Streamlined Image Handling:** Admins effortlessly upload images to Cloudinary, optimized via 'webp' format and resized to 1200px width by 1000px height.

5. **Advanced Order Control:** Admins filter orders by ID, payment, and delivery status, simplifying management.

6. **Swift Product Search:** Users find items via name, brand, or description, promoting seamless navigation.

7. **Empowered Reviews:** Users review, edit, or delete product feedback, fostering valuable interactions.

Experience ByteBuy: Where Functionality Meets User-Centric Design.

 # How to install:
1. First clone the repo. To do so, open the terminal and enter:
```
git clone https://github.com/ritish78/ByteBuy.git
```
2. Then run the build command inside the ByteBuy root folder:
```
npm run build
```
3. You need to supply these environment variables:
````
EXPRESS_SERVER_PORT=5000
NODE_ENV=production
MONGODB_URL=
JWT_SECRET=
PAYPAL_CLIENT_ID=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
UPSTASH_REDIS_URL=
MAX_REQ_ALLOWED_OF_AUTH_USER_PER_MINUTE=100
MAX_REQ_ALLOWED_OF_NOT_SIGNEDIN_PER_MINUTE=30
WINDOW_SIZE_IN_SECONDS=60
````
4. After the build command installs all the dependencies for frontend and backend, enter:
```
npm run server
```
5. The server should run on port `5000`. Go to http://localhost:5000 to view the website.

# Tech Stack used
* Backend: `Node.js` as Runtime, `express` for server, `express-validator` for validating user input.
* Frontend: `React` Library which runs using `Javascript`. `Redux` is used for state management.
* Database: `MongoDB` and `Redis`. `Mongoose` npm package is used to interact with MongoDB. `Redis` is hosted on `Upstash`. 
* Security: `Bcrypt` for hashing password, Http-cookie to store `JWT` which is then used for verifying user.
* Image Manipulation: `Sharp` library is used to convert uploaded images to `webp` format.
* Cloud Storage: `Cloduinary` for the uploaded pictures, `AWS` for MongoDB and `Upstash` for Redis.

# Available API Endpoints:
For complete available API endpoints visit: [API Endpoints](https://brilliant-otter-4ed69e.netlify.app/)

![Docgen SS](https://github.com/ritish78/ByteBuy/assets/36816476/09db1b1d-b502-48e3-a536-a130591432f7)

