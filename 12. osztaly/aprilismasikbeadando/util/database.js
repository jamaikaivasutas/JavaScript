import sqlite from "sqlite3"

const db = new sqlite.Database("./data/database.sqlite");

export function dbAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

export function dbGet(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

export function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export async function initializeDatabse() {
    await dbRun("DROP TABLE IF EXISTS albums")
    await dbRun("CREATE TABLE If NOT EXISTS albums(id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, band STRING, numberOfSongs INTEGER, length INTEGER);")

    const albums = []

    for(const album of albums)
    {
       await dbRun("INSERT INTO albums (name, band, numberOfSongs, length) VALUES (?, ?, ?, ?);", [album.name, album.band, album.numberOfSongs, album.length ])
    }
}