import { Request, Response } from 'express';
import Student from '../webScrap/index';
import { Cluster } from 'puppeteer-cluster';

const puppeteerOptions = {
  headless: false,
  ignoreHTTPSErrors: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-gpu',
    '--no-zygote'
  ]

};
class StudentController {
   cluster:Promise<Cluster<any, any>>

   public constructor () {
     this.cluster = Cluster.launch({
       concurrency: Cluster.CONCURRENCY_CONTEXT,
       maxConcurrency: 10,
       puppeteerOptions,
       monitor: false
     });
     this.listenErrors();
     this.createTask();
   }

   private async listenErrors () {
     (await this.cluster).on('taskerror', (err, data) => {
       console.log(`Error crawling ${data}: ${err.message}`);
     });
   }

   private async createTask () {
     await (await this.cluster).task(async ({ page, data: { password, login } }) => {
       const student = new Student(page);

       await student.login(login, password);
       const data = await student.data();

       return data;
     });
   }

   public async getData (req:Request, res:Response) {
     try {
       const { password, login } = req.body;

       const data = await (await this.cluster).execute({ password, login });
       res.json(data);
     } catch (error) {
       console.error(error);
     } finally {
       await (await this.cluster).idle();
     }
   }
}

const studentControllers = new StudentController();

export default studentControllers;
