
import { db_conn } from "../database.js";

export function getAllChangelog() {
  return db_conn.query(`
  SELECT * FROM changelog
  INNER JOIN users
ON changelog.changelog_user_id = users.user_id
  `);
};


export function createChangelog(user_id, change_description) {
  return db_conn.query(
    `INSERT INTO changelog (
      changelog_change_date,
      changelog_user_id,
      changelog_change_description
    )
    VALUES (NOW(), ?, ?)`,
    [user_id, change_description]
  );
}

