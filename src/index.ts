import { AppDataSource } from "./db/data-source"
import { createExpressServer } from 'routing-controllers';
import * as path from 'path';
import { UserController } from "./controller/UserController";


const PORT: number = 8000;

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
    routePrefix: '/api', // prefix route api: http://localhost:8000/api/...
    // controllers: [path.join(__dirname + '/controller/*.ts')],
    controllers: [UserController]
    // we specify controllers we want to use
});

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});




