import express, { Application } from 'express';
import  SwaggerUi  from 'swagger-ui-express';
import cors from 'cors';

import userRoutes from '../routes/user';
import categoryRoutes from '../routes/category';
import taskRoutes from '../routes/task';
import swaggerSpec from '../swagger';

import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users',
        categorys: '/api/category',
        tasks: '/api/task',
        sawgger:  '/api-docs'
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
        this.app.use(this.apiPaths.tasks, taskRoutes),
        this.app.use(this.apiPaths.sawgger, SwaggerUi.serve, SwaggerUi.setup(swaggerSpec))
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`)
        });
    }

}

export default Server;