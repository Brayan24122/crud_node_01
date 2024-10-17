import {Router} from 'express'
import pool from '../database.js'

const router = Router()

router.get('/crearuta', async(req, res)=>{
    const [resultes] = await pool.query('select * from estaciones');
    const [resultru] = await pool.query('select * from rutas');
    res.render('rutas/crearutas',{estacion:resultes, rutas:resultru})
});

router.post('/crearuta', async(req, res)=>{
    try{
        const {dirigue_re, tiempo_re, id_re_e, id_re_r} = req.body;
        const newRuta_estacion = {
            dirigue_re, tiempo_re, id_re_e, id_re_r
        }
        await pool.query('INSERT INTO ruta_estacion SET ?', [newRuta_estacion]);
        res.redirect('/crearuta');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

export default router;