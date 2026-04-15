// import section 
import {Pool} from 'pg';
import { env } from '../config/env.js';

// setting database connection
export const pool = new Pool({
    user:env.db_user,
    database:env.db_name,
    host:env.db_host,
    password:env.db_password,
    port:env.db_port
}); 