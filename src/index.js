import express from 'express'
import morgan from 'morgan';
import {engine} from 'express-handlebars';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import registrosRoutes from './routes/registros.routes.js';
import navegacionRoutes from './routes/navegacion.routes.js';
import rutasbusesRoutes from './routes/rutasbuses.routes.js';

//Inicializacion
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//Setting
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    //res.json({"mensaje": })
    res.render('index')
});

app.use(registrosRoutes);
app.use(navegacionRoutes);
app.use(rutasbusesRoutes);

//Public files
app.use(express.static(join(__dirname, 'public')));

//Run server
app.listen(app.get('port'), () => 
    console.log('El servidor esta escuchando en el puerto', app.get('port')));
