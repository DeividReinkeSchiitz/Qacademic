import { Page, Browser } from 'puppeteer';
import StudentLoggin from './student/Loggin';
import StudentGrades from './student/Grades';
import StudentClassMaterial from './student/ClassMaterial';

class Student {
   browser:Browser
   page:Promise<Page>

   constructor (browser:Browser) {
     this.browser = browser;
     this.page = this.getPage();

     this.pageInterceptor();
   }

   async getPage ():Promise<Page> {
     const pageValue = await this.browser.newPage();
     await pageValue.setDefaultNavigationTimeout(120000);
     return pageValue;
   }

   public async closePage ():Promise<void> {
     (await this.page).close();
   }

   private async pageInterceptor () {
     // turns request interceptor on
     (await this.page).setRequestInterception(true);

     // if the page makes a  request to a resource type of image or stylesheet then abort that            request
     (await this.page).on('request', request => {
       if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet') { request.abort(); } else { request.continue(); }
     });
   }

   public async login (login:string, password:string):Promise<boolean| undefined> {
     const userLogin = new StudentLoggin(login, password, await this.page);

     return userLogin.start();
   }

   public async grades () {
     const studentGrades = new StudentGrades(await this.page);

     return studentGrades.start();
   }

   public async classMaterial () {
     const studentClassMaterial = new StudentClassMaterial(await this.page);

     return studentClassMaterial.start();
   }

   public async data () {
     const grades = await this.grades();
     const classMaterial = await this.classMaterial();

     return {
       classMaterial,
       grades
     };
   }
}

export default Student;
