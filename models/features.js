import { db_conn } from "../database.js";

export function getAllFeatures() {
    return db_conn.query("SELECT * FROM features");
}


export function getFeatureById(feature_id) {
    return db_conn.query(`SELECT * FROM features 
    INNER JOIN products
    WHERE feature_id = ?`, [
        feature_id,
    ]);
}


export function createFeature(
    weight,
    height,
    width,
    depth,
    system,
    size,
    resolution,
    cpu,
    ram,
    storage,
    battery,
    rear,
    front

) {
    return db_conn.query(
        `
        INSERT INTO features (
          feature_weight_grams,
          feature_height_mm,
          feature_width_mm,
          feature_depth_mm,
          feature_operating_system,
          feature_screen_size,
          feature_screen_resolution,
          feature_cpu,
          feature_ram,
          feature_storage,
          feature_battery,
          feature_rear_camera,
          feature_front_camera) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
        [weight,
          height,
          width,
          depth,
          system,
          size,
          resolution,
          cpu,
          ram,
          storage,
          battery,
          rear,
          front]
    );
}

export function updateFeatureById(
    feature_id,
    weight,
          height,
          width,
          depth,
          system,
          size,
          resolution,
          cpu,
          ram,
          storage,
          battery,
          rear,
          front
) {
    return db_conn.query(
        `
        UPDATE products
        SET feature_weight_grams = ?, feature_height_mm = ?, feature_width_mm = ?, feature_depth_mm = ?, feature_operating_system = ?, feature_screen_size = ?
        feature_screen_resolution = ?, feature_cpu = ?, feature_ram= ?,
        feature_storage= ?, feature_battery = ?, feature_rear_camera = ?, feature_front_camera = ?
        WHERE feature_id = ?
    `,
        [ weight,
          height,
          width,
          depth,
          system,
          size,
          resolution,
          cpu,
          ram,
          storage,
          battery,
          rear,
          front]
    );
}

export function deleteFeatureById(feature_id) {
    return db_conn.query("DELETE FROM features WHERE feature_id = ?", [
        feature_id,
    ]);
}
