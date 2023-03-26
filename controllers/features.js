// import express from "express";
// import { getAllFeatures, getFeatureById } from "../models/features.js";

// // This line creates a rounter that connects all of the end point functions
// // in this file up to the rest of the node application
// // 
// // Routers direct incoming requests to the related end point
// const featureController = express.Router();



// featureController.get("/feature_list", (request, response) => {


//   // IF the user has provided search terms
//   if(request.query.search_term) { 
//   // Ask the model form product based on the search term
//   getFeaturesBySearch(request.query.search_term).then(([features]) => {
//     response.status(200).render("feature_list.ejs", {features:features});
//   });

//   } else {
//   // Otherwise
//   // ASk for the list of product from the database(model)
//   getAllFeatures().then(([features]) => {
//   // This code will run when the database query has finished and the result are available to us.

//   // Render the product list view and send it back to the browser
//     response.status(200).render("feature_list.ejs", {features:features});

//   });

// }

// });

// // same
// // productController.get("./product_list", function(request, response) {

// // });

// // same function handleProductLisGet(request, response) {
// // cde that runs to handle request here
// // }

// featureController.get("/feature_list", (request, response) => {
//   // Check if the user has selected a product
//   if(request.query.id) {
  
//   // Get the product that hs been selected by it's ID(from the model)
//   getFeatureById(request.query.id).then(([features]) => {
//     // Check if at least one product came back
//     if(features.length > 0) {
//       // get the first product
//       const feature = features[0];

//     // Render the checkout page with the product details
//     response.status(200).render("feature_list.ejs", {feature:feature});

//     }

//   });



 
//   } 

// });



// // This line makes the controllers available to the server.js
// export default featureController;