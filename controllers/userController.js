import {pool} from '../db.js';

export async function getUsers(req, res, next) {
    try {
        const {rows: users} = await pool.query('SELECT * FROM "public"."Users";');
        res.json(users);
    } catch(error){
        console.log(error)
        next(error)
    }
};

export async function getOneUser(req, res, next) {
    res.json(req.user);
};

export async function createUser (req, res, next) {
    const {firstname, lastname, city} = req.body;
    try {
        const {rows} = await pool.query(
            'INSERT INTO "public"."Users" (firstname, lastname, city) VALUES ($1, $2, $3) RETURNING *;',
            [firstname, lastname, city]
        );
            res.json(rows);
    } catch(error) {
        console.log(error)
        next(error)
    }
};

export async function updateUser (req, res, next) {
    const {firstname, lastname, city} = req.body;
    try {
        const {rows: user} = await pool.query(
        `UPDATE "public"."Users" SET firstname = $1, lastname = $2, city = $3 WHERE id = $4 RETURNING *`,
        [firstname, lastname, city, id]
        );
        if (!user.length > 0) {
            return res.sendStatus(404);
        }
        res.json(user);
    } catch (error) {
            console.log(error);
            res.status(500);
        }
};

export async function deleteUser (req, res) {
    const {id} = req.params;
    try {
        const {rows: user} = await pool.query(
            `SELECT * from "public"."Users" WHERE id = $1`,
            [id]
        );
        if (!user.length > 0) {
            res.sendStatus(404); 
        };
        const {rows} = await pool.query(
            `DELETE FROM "public"."Users" WHERE id = $1 RETURNING *`,
            [id]
        );
        res.json({message: 'user deleted', rows});
    } catch (error) {
        console.log(error);
        res.senStatus(500);
    }
};