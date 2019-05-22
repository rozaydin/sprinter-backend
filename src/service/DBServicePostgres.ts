// import * as dotenv from "dotenv";
import { Pool, QueryResult } from "pg";

// prepare environment
// if (process.env.ENV_READY !== "TRUE") {
//     dotenv.config();
// }

const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const schema = process.env.DB_SCHEMA;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

// create pg pool
var _pool: Pool = null;

export function getPool(): Pool {
    initPool();
    return _pool;
}

function initPool(): void {
    if (_pool == null) {
        _pool = new Pool({
            host: host,
            port: port,
            database: schema,
            user: user,
            password: pass,
            ssl: true,
            max: 1,
            min: 1
        });
    }
}

export function terminatePool(): Promise<void> {
    return _pool == null ? Promise.resolve() : _pool.end();
}

// Postgres Extensions

function generateInsertQuery(tableName: string, object: Object) {    

    const props = [];
    const values = [];
    let index = 1;
    Object.keys(object).forEach(prop => {        
        props.push(prop);
        values.push("$" + index++);
    });

    // for (let prop in object) {        
    //     if (object.hasOwnProperty(prop)) {
    //         props.push(prop);
    //         values.push("$" + index++);
    //     }
    // }

    return `INSERT INTO ${tableName} (${props.join(",")}) VALUES (${values.join(",")}) RETURNING *`;
}

function generateUpdateQuery(tableName: string, object: Object) {
    const generatedQuery = generateSetQuery(object);
    return `UPDATE ${tableName} ${generatedQuery[0]} WHERE id = $${generatedQuery[1]}`;
}

function generateSetQuery(object: Object): any[] {

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
    return [`SET ${sql}`, index];
}

//  save, get, getAll, del, clear, update

export interface CrudDao<O, E> {

    save(o: O): Promise<QueryResult>;

    update(id: number, o: O): Promise<QueryResult>;

    get(id: number): Promise<E>;

    getWith(field: string, value: any): Promise<E[]>;

    getAll(): Promise<Array<E>>;

    del(id: number): Promise<QueryResult>;

    clear(): Promise<QueryResult>;
}

export class CrudDaoImpl<O, E> implements CrudDao<O, E>{

    constructor(protected tableName: string) { }

    save(object: O): Promise<QueryResult> {
        const sqlQuery = generateInsertQuery(this.tableName, object);        
        return getPool().query(sqlQuery, Object.values(object)).then(result => {
            return Promise.resolve(result);
        });
    }

    update(id: any, object: O): Promise<QueryResult> {
        const sqlQuery = generateUpdateQuery(this.tableName, object);        
        return getPool().query(sqlQuery, [].concat(Object.values(object)).concat(id));
    }

    get(id: any): Promise<E> {
        return getPool().query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]).then(result => {
            return Promise.resolve(result.rows[0]);
        });
    }

    getWith(field: string, value: any): Promise<E[]> {
        return getPool().query(`SELECT * FROM ${this.tableName} WHERE ${field} = $1`, [value]).then(result => {
            return Promise.resolve(result.rows);
        });
    }


    getAll(): Promise<E[]> {
        return getPool().query(`SELECT * FROM ${this.tableName}`).then(result => {
            console.log(result);
            return Promise.resolve(result.rows);
        });
    }


    del(id: any): Promise<QueryResult> {
        return getPool().query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
    }


    clear(): Promise<QueryResult> {
        return getPool().query(`DELETE FROM ${this.tableName}`);
    }

}