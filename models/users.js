import {db_conn} from "../database.js";

// create
export function createStaff(first_name, last_name, role, username, password) {

return db_conn.query(`
INSERT INTO users(user_first_name, user_last_name, user_role, user_username, user_password)
VALUES (?,?,?,?,?)
`, [first_name, last_name, role, username,password]);
};
// read
export function getAllStaff() {
  return db_conn.query(`SELECT * FROM users`);
}

export function getStaffById(user_id) {
  return db_conn.query(`SELECT * FROM users WHERE user_id = ?`, [user_id]);
}

export function getStaffByUsername (username) {
  return db_conn.query(`SELECT * FROM users WHERE user_username = ?`, [username]);
}

// update
export function updateStaffById (user_id, first_name, last_name, role, username, password) {
return db_conn.query(`
UPDATE users
SET user_first_name = ?, user_last_name = ?, user_role = ?, user_username = ?, user_password =?
WHERE user_id = ?
`, [first_name, last_name, role, username, password, user_id]);
}
// delete

export function deleteStaffById (user_id) {
  return db_conn.query(`DELETE FROM users WHERE user_id =?`, [user_id]);
}