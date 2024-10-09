import {Router} from 'express'
import pool from '../database.js'

const router = Router()

router.get('/add', (req, res)=>{
    res.render('personas/add')
});

router.post('/add', async(req, res)=>{
    try{
        const {nombre_r, apellido_r, edad_r} = req.body;
        const newRegistros = {
            nombre_r, apellido_r, edad_r
        }
        await pool.query('INSERT INTO registros SET ?', [newRegistros]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/list', async(req, res)=>{
    try{
        const [result] = await pool.query('SELECT * FROM registros');
        res.render('personas/list', {registros:result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/edit/:id_r', async(req, res)=>{
    try{
        const {id_r} = req.params;
        const [registros] = await pool.query('SELECT * FROM registros WHERE id_r = ?', [id_r]);
        const registrosEdit = registros[0]
        res.render('personas/edit', {registros: registrosEdit})
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/edit/:id_r', async(req, res)=>{
    try{
        const {nombre_r, apellido_r, edad_r} = req.body;
        const {id_r} = req.params;
        const editRegistros = {nombre_r, apellido_r, edad_r};
        await pool.query('UPDATE registros SET ? WHERE id_r = ?', [editRegistros, id_r]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/delete/:id_r', async(req,res)=>{
    try{
        const {id_r} = req.params;
        await pool.query('DELETE FROM registros WHERE id_r = ?', [id_r]);
        res.redirect('/list')
    }
    catch(err){
        res.redirect(500).json({message:err.message});
    }
});
export default router;