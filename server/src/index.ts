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
     this.app.listen(process.env.PORT, () => {
       console.log('server Running');
     }).setTimeout(120000);
   }

/*    private databaseConnection ():void {
     const urlConnection = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.jrvof.mongodb.net/qacademicDB?retryWrites=true&w=majority`;
     mongoose.connect(
       urlConnection,
       { useNewUrlParser: true, useUnifiedTopology: true },
       err => {
         if (err) throw err && '\n\n\n DATABASE NOT FOUND \n\n\n';
         console.log('connected with mongodb');
       }
     );
   } */
}

const startServer = ():void => new App().startServer();

startServer();
