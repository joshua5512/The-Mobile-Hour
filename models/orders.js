import { db_conn } from "../database.js";

export function getAllOrders() {
    return db_conn.query("SELECT * FROM orders");
}

export function getAllOrdersByStatusWithProduct(status) {
    return db_conn.query(
        `
        SELECT * FROM orders
        INNER JOIN products
        ON orders.order_product_id = products.product_id
        WHERE orders.order_status = ?
    `,
        [status]
    );
}

export function getOrderById(order_id) {
    return db_conn.query("SELECT * FROM orders WHERE order_id = ?", [order_id]);
}

export function getOrderWithProductById(order_id) {
    return db_conn.query(
        `
        SELECT *
        FROM orders
        INNER JOIN products
        ON orders.order_product_id = products.product_id
        WHERE orders.order_id = ?
    `,
        [order_id]
    );
}

export function createOrder(
    product_id,
    customer_first_name,
    customer_last_name,
    customer_address,
    customer_phone,
    customer_email
) {
    return db_conn.query(
        `
        INSERT INTO orders (order_product_id, order_date, order_status, order_customer_first_name, order_customer_last_name, order_customer_address, order_customer_phone, order_customer_email, order_quantity) 
        VALUES (?,NOW(), 'pending', ?, ?, ?, ?, ?, 1)
    `,
        [
            product_id,
            customer_first_name,
            customer_last_name,
            customer_address,
            customer_phone,
            customer_email,
        ]
    );
}

export function updateOrderStatusById(order_id, status) {
    return db_conn.query(
        `
        UPDATE orders
        SET order_status = ?
        WHERE order_id = ?
    `,
        [status, order_id]
    );
}

