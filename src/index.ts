import { AppDataSource } from "./db/data-source"
import { createExpressServer } from 'routing-controllers';
import * as path from 'path';

const PORT: number = 8000;


AppDataSource.initialize().then(async () => {

    console.log("Initialisation db")

}).catch(error => console.log(error))

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
    routePrefix: '/api', // prefix route api: http://localhost:8000/api/...
    controllers: [path.join(__dirname + '/controller/*.ts')],
    // we specify controllers we want to use
});

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});




