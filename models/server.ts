import express, { Application } from 'express';
import userRoutes from '../routes/user';
import categoryRoutes from '../routes/category';
import taskRoutes from '../routes/task';
import cors from 'cors';

import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users',
        categorys: '/api/category',
        tasks: '/api/task'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection(){
        
        try {

            await db.authenticate();
            console.log('Database online');
        
        } catch (error) {
            throw new Error(error as string)
        }
    }

    middlewares(){

        this.app.use( cors() );

        this.app.use( express.json());

        this.app.use( express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.users, userRoutes),
        this.app.use(this.apiPaths.categorys, categoryRoutes),
        this.app.use(this.apiPaths.tasks, taskRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`)
        });
    }

}

export default Server;