import { useExpressServer } from 'routing-controllers';
import * as session from 'express-session';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';

const PORT: number = 9000;

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "secret", saveUninitialized: false, resave: false }));

const controllerPath = path.resolve('src', 'controller', '*.ts');
const adminControllerPath = path.resolve('src', 'controller', 'admin', '*.ts');
const middlewarePath = path.resolve('src', 'middleware', '*.ts');

useExpressServer(app, {
    routePrefix: '/api',
    controllers: [controllerPath, adminControllerPath],
    middlewares: [middlewarePath],
});

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});




