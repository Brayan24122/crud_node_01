import {Router} from 'express'
import pool from '../database.js'

const router = Router()

router.get('/add', async(req, res)=>{
    const [resultre] = await pool.query('select * from registros');
    const [resultdi] = await pool.query('select * from discapacidad');
    const [resultp] = await pool.query('select * from profecion');
    const [resultacu] = await pool.query('select * from acudientes');
    const [resulttd] = await pool.query('select * from tipo_documento');
    res.render('personas/add',{registros:resultre, discapacidad:resultdi, profecion:resultp, acudientes:resultacu, tipo_documento:resulttd});
});

router.post('/add', async(req, res)=>{
    try{
        const {nombre_r, apellido_r, edad_r, fecha_nacimiento_r, correo_r, id_dis_r, id_td_r, documento_r, id_p_r, id_a_r, telefono_r} = req.body;
        const newRegistros = {
            nombre_r, apellido_r, edad_r, fecha_nacimiento_r, correo_r, id_dis_r, id_td_r, documento_r, id_p_r, id_a_r, telefono_r
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
        const [result] = await pool.query('select r.id_r, r.nombre_r, r.apellido_r,r.edad_r, date_format(r.fecha_nacimiento_r, "%d-%m-%Y") fecha, r.correo_r, dis.abrebiatura_dis, td.abrebiatura_td, r.documento_r, p.descripcion, a.nombre_a, a.apellido_a, r.telefono_r from registros r, discapacidad dis, tipo_documento td, profecion p, acudientes a where dis.id_dis = id_dis_r and td.id_td = id_td_r and p.id_p = id_p_r and a.id_a = id_a_r;');
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
        const [resultdi] = await pool.query('select * from discapacidad');
        const [resultp] = await pool.query('select * from profecion');
        const [resultacu] = await pool.query('select * from acudientes');
        const [resulttd] = await pool.query('select * from tipo_documento');
        const registrosEdit = registros[0]
        res.render('personas/edit', {registros: registrosEdit, discapacidad:resultdi, profecion:resultp, acudientes:resultacu, tipo_documento:resulttd})
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/edit/:id_r', async(req, res)=>{
    try{
        const {nombre_r, apellido_r, edad_r, fecha_nacimiento_r,correo_r, id_dis_r,id_td_r,documento_r,id_p_r,id_a_r,telefono_r} = req.body;
        const {id_r} = req.params;
        const editRegistros = {nombre_r, apellido_r, edad_r, fecha_nacimiento_r,correo_r,id_dis_r,id_td_r,documento_r,id_p_r,id_a_r,telefono_r};
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

router.get('/acudiente', async(req, res)=>{
    const [resultac] = await pool.query('select * from acudientes');
    const [resultpro] = await pool.query('select * from profecion');
    res.render('personas/acudiente',{acudientes:resultac, profecion:resultpro})
});

router.post('/acudiente', async(req, res)=>{
    try{
        const {nombre_a, apellido_a, edad_a, id_p_a} = req.body;
        const newAcudientes = {
            nombre_a, apellido_a, edad_a, id_p_a
        }
        await pool.query('INSERT INTO acudientes SET ?', [newAcudientes]);
        res.redirect('/listacudiente');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/listacudiente', async(req, res)=>{
    try{
        const [result] = await pool.query('select a.id_a, a.nombre_a, a.apellido_a, a.edad_a, p.descripcion from acudientes a, profecion p where id_p = id_p_a;');
        res.render('personas/listacudiente', {acudientes:result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/editacudiente/:id_a', async(req, res)=>{
    try{
        const {id_a} = req.params;
        const [registros] = await pool.query('SELECT * FROM acudientes WHERE id_a = ?', [id_a]);
        const [result] = await pool.query('SELECT * FROM profecion');
        const acudientesEdit = registros[0];
        res.render('personas/editacudiente', {acudientes:acudientesEdit, profecion:result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})
router.post('/editacudiente/:id_a', async(req, res)=>{
    try{
        const {nombre_a, apellido_a, edad_a, id_p_a} = req.body;
        const {id_a} = req.params;
        const editAcudientes = {nombre_a, apellido_a, edad_a, id_p_a};
        await pool.query('UPDATE acudientes SET ? WHERE id_a = ?', [editAcudientes, id_a]);
        res.redirect('/listacudiente');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

export default router;