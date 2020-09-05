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
       maxConcurrency: 3,
       puppeteerOptions,
       monitor: true
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

       return await student.data();
     });
   }

   public async getData (req:Request, res:Response) {
     try {
       const { password, login } = req.body;

       const data = await (await this.cluster).execute({ password, login });

       res.json(data);

       await (await this.cluster).idle();
     } catch (error) {
       console.error(error);
     } finally {
     }
   }
}

const studentControllers = new StudentController();

export default studentControllers;
