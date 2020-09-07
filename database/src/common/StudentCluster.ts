import Student from '../webScrap/index';
import { Cluster } from 'puppeteer-cluster';

const puppeteerOptions = {
  headless: true,
  ignoreHTTPSErrors: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-gpu',
    '--no-zygote'
  ]

};

export default class StudentCluster {
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
       const userLogged = await student.login(login, password);

       if (!userLogged) return false;

       return student.data();

       // user loggin doesnt exist
     });
   }
}
