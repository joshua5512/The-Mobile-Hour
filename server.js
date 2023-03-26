import express from "express";
import session from 'express-session';

// Create an experss application instance and define a port to listen on.
const app = express();
const port = 8080;


app.use(session({
  secret:'secret phase',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false},
})
);

//  enable the ejs view enginene
app.set("view engine", "ejs");

// enable support for url- encoded request bodies(form posts)
app.use(express.urlencoded({extended: true}));


// Link up the controllers files-wk8
import productController from "./controllers/products.js";
app.use(productController);


import orderController from "./controllers/orders.js";
app.use(orderController);

import staffController from './controllers/users.js';
app.use(staffController);


import changelogController from './controllers/changelog.js';
app.use(changelogController);


// Redirect requests to root to the product page
app.get("/", (request, response)=> {
  response.status(301).redirect("/product_list");

});



app.get("/home", (request, response) => {
  response.render("home.ejs")
})

app.get("/aboutus", (request, response) => {
  response.render("aboutus.ejs")
})




// Server static resourses
app.use(express.static("static"));


// Start the backend express server
app.listen(port, () => {
  console.log("Expess server started on http://localhost:" + port);
});