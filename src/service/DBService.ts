import { createPool, Pool } from 'mysql';

// create mysql pool
var _pool = null;

export function getPool(): Pool {
    initPool();
    return _pool;
}

function initPool(): void {
    if (_pool == null) {
        _pool = createPool({
            connectionLimit: 10,
            host: "127.0.0.1",
            port: 3306,
            user: "sprinter",
            password: "sprinter",
            database: 'sprinter',
        });
    }
}

export function terminatePool(): Promise<void> {
    return new Promise((resolve, reject) => {
        (_pool == null) ? resolve() :
            _pool.end(err => err != null ? reject(err) : resolve());
    });
}


export interface OkPacket {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    serverStatus: number,
    warningCount: number,
    message: string,
    protocol41: boolean,
    changedRows: number
}

//  save, get, getAll, del, clear, update

export interface CrudDao<O, E> {

    save(o: O): Promise<OkPacket>;

    update(id: any, o: O): Promise<OkPacket>;

    get(id: any): Promise<E>;

    getWith(field: string, value: any): Promise<E>;

    getAll(): Promise<Array<E>>;

    del(id: any): Promise<OkPacket>;

    clear(): Promise<OkPacket>;
}

export class CrudDaoImpl<O, E> {

    constructor(protected tableName: string) { }

    save(object: O): Promise<OkPacket> {
        return new Promise((resolve, reject) => {
            getPool().query(`INSERT INTO ${this.tableName} SET ?`, object, (error, results) => {
                if (error) reject(error);
                resolve(results);
            });
        });
    }

    update(id: any, object: O): Promise<OkPacket> {
        return new Promise((resolve, reject) => {
            getPool().query(`UPDATE ${this.tableName} SET ? WHERE id = ?`, [object, id], (error, results) => {
                if (error) reject(error);
                resolve(results);
            });
        });
    }


    get(id: any): Promise<E> {
        return new Promise((resolve, reject) => {
            getPool().query(`SELECT * FROM ${this.tableName} WHERE id = ?`, id, (error, results) => {
                if (error) reject(error);
                resolve(results[0]);
            });
        });
    }

    getWith(field: string, value: any): Promise<E> {
        return new Promise((resolve, reject) => {
            getPool().query(`SELECT * FROM ${this.tableName} WHERE ${field} = ?`, value, (error, results) => {
                if (error) reject(error);
                resolve(results);
            });
        });
    }


    getAll(): Promise<E[]> {
        return new Promise((resolve, reject) => {
            getPool().query(`SELECT * FROM ${this.tableName}`, (error, results) => {
                if (error) reject(error);
                resolve(results);
            });
        });
    }


    del(id: any): Promise<OkPacket> {
        return new Promise((resolve, reject) => {
            getPool().query(`DELETE FROM ${this.tableName} WHERE id = ?`, id, (error, results) => {
                if (error) reject(error);
                resolve(results);
            });
        });
    }


    clear(): Promise<OkPacket> {
        return new Promise((resolve, reject) => {
            getPool().query(`DELETE FROM ${this.tableName}`, (error, results) => {
                if (error) reject(error);
                resolve(results);
            });
        });
    }

}