// CSRF Protection 
import csurf from 'csurf';

export const csrfProtection = csurf({
    cookie:true
});