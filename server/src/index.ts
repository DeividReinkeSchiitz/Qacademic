import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './router';

class App {
   private app:express.Application

   public constructor () {
     this.app = express();
     this.middlewares();
   }

   private middlewares ():void {
     this.app.use(cors());
     this.app.use(helmet());
     this.app.use(express.json());
     this.app.use(router);
   }

   public startServer ():void {
     this.app.listen(process.env.PORT || 2121, () => {
       console.log('server Running in port: ' + process.env.PORT);
     }).setTimeout(120000);
   }
}

const startServer = ():void => new App().startServer();

startServer();
