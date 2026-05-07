// Import section 
import 'dotenv/config'
import { pool } from "../../src/db/db.js";
import fs from 'fs';
import path from "path";

// setting section 
const migrationPath = path.join("database","migrations");

// migration function : migrate new added changes to database
const runMigration = async()=>{
    // 1. sorting all migrations files 
    const files = fs.readdirSync(migrationPath).sort();
    // 2. creating migrations table if not exist yet
    await pool.query(`
        CREATE TABLE IF NOT EXISTS migrations(
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );`);
    // 3. getting all rows in migration table
    const {rows} = await pool.query(`SELECT name FROM migrations`);
    const execute = rows.map(r=>r.name);
    // 4. skip exeist/already ran migration data 
    for(const file of files){
        if(execute.includes(file)){
            console.log(`skipping: ${file}`)
            continue;
        };

        // 5. migrations - read file & insert new changes 
        const sql = fs.readFileSync(path.join(migrationPath,file)).toString();
        console.log(`Running: ${file}`);
        await pool.query(sql);

        // 6. save migration in database
        await pool.query(`INSERT INTO migrations(name) VALUES($1)`,[file])
    };
    // finished message & exit
    console.log('✅Migration running successfuly!');
    process.exit();
};

// run function
runMigration();