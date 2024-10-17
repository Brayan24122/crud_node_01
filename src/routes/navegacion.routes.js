import {Router} from 'express'


const router = Router()

router.get('/inicio', (req, res)=>{
    res.render('navegacion/inicio')
});

router.get('/crearuta', (req, res)=>{
    res.render('rutas/crearuta')
});

router.get('/buses', (req, res)=>{
    res.render('navegacion/buses')
});

router.get('/paraderos', (req, res)=>{
    res.render('navegacion/paraderos')
});

router.get('/guias', (req, res)=>{
    res.render('navegacion/guias')
});

router.get('/noticias', (req, res)=>{
    res.render('navegacion/noticias')
});

router.get('/calles', (req, res)=>{
    res.render('navegacion/calles')
});

router.get('/tranconesaccidentes', (req, res)=>{
    res.render('navegacion/tranconesaccidentes')
});
export default router;