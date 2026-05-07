// import section 
import { poolOption } from '../config/env.js';
import {Pool} from 'pg';

// setting database connection
export const pool = new Pool({
    user:poolOption.db_user,
    database:poolOption.db_name,
    host:poolOption.db_host,
    password:poolOption.db_password,
    port:poolOption.db_port
}); 