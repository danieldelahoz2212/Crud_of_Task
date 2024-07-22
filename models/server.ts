import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

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
        categories: '/api/category',
        tasks: '/api/task',
        swagger: '/api-docs'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            throw new Error(error as string);
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());

        this.app.get('/swagger.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
        });

        this.app.use( express.json());

        //this.app.use( express.static('public'));
    }

    routes(){
        this.app.get('/',(req,res)=>{
            console.log('test')
           // http://localhost:8000/api-docs
            return res.redirect(`https://localhost${this.apiPaths.swagger}`)
         });
        this.app.use(this.apiPaths.users, userRoutes);
        this.app.use(this.apiPaths.categories, categoryRoutes);
        this.app.use(this.apiPaths.tasks, taskRoutes);
        
        this.app.use(this.apiPaths.swagger, swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`);
        });
    }
}

export default Server;