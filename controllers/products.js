import express from "express";
import access_control from "../access_control.js";
import { getAllProducts, getProductById, getProductsBySearch, deleteProductById, updateProductById, createProduct } from "../models/products.js";
import { createChangelog } from '../models/changelog.js';

import { getFeatureWithProductByProductId } from "../models/products.js";
import { createFeature } from "../models/features.js";

// This line creates a rounter that connects all of the end point functions

const productController = express.Router();

productController.get("/product_list", (request, response) => {
  // IF the user has provided search terms
  if(request.query.search_term) { 
  // Ask the model form product based on the search term
  getProductsBySearch(request.query.search_term).then(([products]) => {
    response.status(200).render("product_list.ejs", {products:products});
  });

  } else {
  // Otherwise
  // ASk for the list of product from the database(model)
  getAllProducts().then(([products]) => {

    response.status(200).render("product_list.ejs", {products:products});

  });

}

});

// get product admin page
productController.get(
  "/product_admin",
  access_control(["admin", "stock"]),
  (request, response) => {
      const edit_id = request.query.edit_id;
      if (edit_id) {
          getProductById(edit_id).then(([products]) => {
              if (products.length > 0) {
                  const edit_product = products[0];

                  getAllProducts().then(([products]) => {
                      response.render("product_admin.ejs", {
                          products: products,
                          edit_product: edit_product,
                          role: request.session.user.role,
                      });
                  });
              }
          });
      } else {
          getAllProducts().then(([products]) => {
              response.render("product_admin.ejs", {
                  products: products,
                  edit_product: {
                      product_id: 0,
                      name: "",
                      model:"",
                      price:"",
                      stock: 0,
                      feature_id: "",
                      weight:"",
                      height:"",
                      width:"",
                      depth:"",
                      system:"",
                      size:"",
                      resolution:"",
                      cpu:"",
                      ram:"",
                      storage:"",
                      battery:"",
                      rear:"",
                      front:""
                  },
                  role: request.session.user.role,
              });
          });
      }
  }
);

productController.post(
  "/edit_product",
  access_control(["admin", "stock"]),
  (request, response) => {
      const edit_details = request.body;

      if (edit_details.action == "create") {
        createFeature(
              edit_details.weight,
              edit_details.height,
              edit_details.width,
              edit_details.depth,
              edit_details.system,
              edit_details.size,
              edit_details.resolution,
              edit_details.cpu,
              edit_details.ram,
              edit_details.storage,
              edit_details.battery,
              edit_details.rear,
              edit_details.front

        ).then(([result]) => {

        
          createProduct(
              edit_details.name,
              edit_details.model,
              edit_details.manufacturer,
              edit_details.price,
              edit_details.stock,
              request.session.feature_id
            ).then(([result]) => {
              createChangelog(request.session.user.user_id, `Product of ${edit_details.name} updated`);
                response.redirect("/product_admin");
            });
        })
      } else if (edit_details.action == "update") {
          updateProductById(
            edit_details.product_id,
            edit_details.name,
            edit_details.model,
            edit_details.manufacturer,
            edit_details.price,
            edit_details.stock,
            request.session.feature_id
            
              
          ).then(([result]) => {
            createChangelog(request.session.user.user_id, `Product of ${edit_details.name} updated`);
              response.redirect("/product_admin");
          });
      } else if (edit_details.action == "delete") {
          deleteProductById(edit_details.product_id).then(([result]) => {
              response.redirect("/product_admin");
          });
      }
  }
);


// get product check out page
productController.get("/product_checkout", (request, response) => {
  // Check if the user has selected a product
  if(request.query.id) {
  
  // Get the product that hs been selected by it's ID(from the model)
  getProductById(request.query.id).then(([products]) => {
    // Check if at least one product came back
    if(products.length > 0) {
      // get the first product
      const product = products[0];

    // Render the checkout page with the product details
    response.status(200).render("product_checkout.ejs", {product: product});

    }

  });

  } 

});


productController.get("/feature_list", (request, response) => {
  // Check if the user has selected a product
  if(request.query.id) {
  
  // Get the product that hs been selected by it's ID(from the model)
  getFeatureWithProductByProductId(request.query.id).then(([features]) => {
    // Check if at least one product came back
    if(features.length > 0) {
      // get the first product
      const feature = features[0];

    // Render the checkout page with the product details
    response.status(200).render("feature_list.ejs", {feature: feature});
    }
  });
  } 
});
// This line makes the controllers available to the server.js


export default productController;