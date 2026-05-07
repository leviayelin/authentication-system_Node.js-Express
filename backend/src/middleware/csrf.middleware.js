// CSRF Protection 
import { cookiesOption } from '../config/env.js';
import csurf from 'csurf';

export const csrfProtection = csurf({
    cookie:cookiesOption.cookie_csrf
});