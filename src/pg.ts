import * as dotenv from "dotenv";
import { Pool } from "pg";
import { CompanyImpl, CompanyEntityImpl } from "./model/Company";

// configure environment
dotenv.config();

const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const schema = process.env.DB_SCHEMA;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

const config = {
    host: host,
    port: port,
    database: schema,
    user: user,
    password: pass,    
    ssl: true,
    max: 2,
    min: 2
}

// init connection pool
const pool = new Pool(config);

export function getPool() {
    //create connection
    return pool;
}


export function generateInsertQuery(tableName: string, object: Object) {

    const props: Array<string> = [];
    let index = 1;

    for (let prop in object) {
        //
        if (object.hasOwnProperty(prop)) {
            props.push(prop + " = $" + index++);
        }
    }
    //
    const sql = props.join(",");

    return `INSERT INTO ${tableName} SET ${sql}`;
    // Object.values
}


// const company = new CompanyImpl("Siemens", "test logo");
const company = new CompanyEntityImpl(1,"Siemens 8", "test logo");
const sql = generateInsertQuery("company", company);
console.log(sql);




pool.query("INSERT INTO company(name, logo) VALUES($1,$2) RETURNING *", [company.name, company.logo]).then(result => {
    console.log(result);
});
