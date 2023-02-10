import {createExpressServer} from 'routing-controllers';
import * as session from 'express-session';
import { AdminController } from './controller/admin/AdminController';
import {CategoryController} from "./controller/admin/CategoryController";


const PORT: number = 8000;

let app = createExpressServer({
    // prefix route api: http://localhost:8000/api/...
    routePrefix: '/api',
    // register created express server in routing-controllers
   controllers: [AdminController, CategoryController], // and configure it the way you need (controllers, validation, etc.)
});

// app.use() // you can configure it the way you want
app.use(session({ secret: "secret", saveUninitialized: false, resave: false }));

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});




