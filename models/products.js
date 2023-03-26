import { db_conn } from "../database.js";

export function getAllProducts() {
    return db_conn.query("SELECT * FROM products");
}

export function getProductById(product_id) {
    return db_conn.query("SELECT * FROM products WHERE product_id = ?", [
        product_id,
    ]);
}

export function getProductsBySearch(search_term) {
    return db_conn.query(
        "SELECT * FROM products WHERE product_name LIKE ? OR product_model LIKE ?",
        [`%${search_term}%`, `%${search_term}%`]
    );
}

export function getFeatureWithProductByProductId(product_id) {
    return db_conn.query(
        `
        SELECT *
        FROM products
        INNER JOIN features
        ON features.feature_id = products.product_feature_id
        WHERE product_id = ?
    `,
        [product_id]
    );
}

export function createProduct(
    name,
    model,
    manufacturer,
    price,
    stock,
    feature_id,
) {
    return db_conn.query(
        `
        INSERT INTO products (
            product_name,
            product_model,
            product_manufacturer,
            product_price,
            product_stock,
            product_feature_id
   )
            
        VALUES (?, ?, ?, ?, ?, 9)
    `,
        [   name,
            model,
            manufacturer,
            price,
            stock,
            feature_id]         
    );
}

export function updateProductById(
    product_id,
    name,
    model,
    manufacturer,
    price,
    stock,
    feature_id
    
) {
    return db_conn.query(
        `
        UPDATE products
        SET product_name = ?, product_model = ?, product_manufacturer=?, product_price = ?, product_stock = ?, product_feature_id = ?
        WHERE product_id = ?
    `,
        [   name,
            model,
            manufacturer,
            price,
            stock,
            feature_id, 
            product_id]
    );
}

export function deleteProductById(product_id) {
    return db_conn.query("DELETE FROM products WHERE product_id = ?", [
        product_id
    ]);
}

// export function deleteProductWithFeature(product_feature_id) {
//     return db_conn.query("DELETE FROM products")
// }
