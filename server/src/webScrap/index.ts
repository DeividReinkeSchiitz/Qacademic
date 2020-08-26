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
   }

   async getPage ():Promise<Page> {
     const pageValue = await this.browser.newPage();
     return pageValue;
   }

   async login (login:string, password:string):Promise<boolean| undefined> {
     const userLogin = new StudentLoggin(login, password, await this.page);

     return userLogin.start();
   }

   async grades () {
     const studentGrades = new StudentGrades(await this.page);

     return studentGrades.start();
   }

   async classMaterial () {
     const studentClassMaterial = new StudentClassMaterial(await this.page);

     return studentClassMaterial.start();
   }

   async data () {
     const grades = await this.grades();
     const classMaterial = await this.classMaterial();

     return {
       classMaterial,
       grades
     };
   }
}

export default Student;
