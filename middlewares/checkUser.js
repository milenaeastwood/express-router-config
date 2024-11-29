// export function checkUser(req, res, next) {
//     const {user} = req.query;
//     if (!user.length > 0) {
//         res.sendStatus(404); 
//     }
//     next();
// }; 

import { pool } from '../db.js';

export async function checkUser(req, res, next) {
    const { id } = req.params;
    try {
        const { rows: user } = await pool.query(
            'SELECT * FROM "public"."Users" WHERE id = $1',
            [id]
        );
        if (!user.length > 0) {
            return res.sendStatus(404);
        }
        req.user = user[0];
        next();
    } catch (error) {
        next(error);
    }
}