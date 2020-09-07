import { Page } from 'puppeteer';

import StudentLoggin from './student/Loggin';
import StudentGrades from './student/Grades';
import StudentClassMaterial from './student/ClassMaterial';
import StudentHome from './student/Home';

import { classMaterialsI, userDataI } from '../common/types';

class Student {
   page: Page;

   constructor (page: Page) {
     this.page = page;
     this.pageInterceptor();
   }

   private async pageInterceptor () {
     // turns request interceptor on
     this.page.setRequestInterception(true);

     // if the page makes a  request to a resource type of image or stylesheet then abort that            request
     this.page.on('request', (request) => {
       if (
         request.resourceType() === 'image' ||
            request.resourceType() === 'stylesheet'
       ) {
         request.abort();
       } else {
         request.continue();
       }
     });
   }

   public async login (
     login: string,
     password: string
   ): Promise<boolean | undefined> {
     const userLogin = new StudentLoggin(login, password, this.page);

     return userLogin.start();
   }

   private async grades () {
     const studentGrades = new StudentGrades(this.page);

     return studentGrades.start();
   }

   private async home () {
     const studentHome = new StudentHome(this.page);

     await studentHome.start();

     async function name () {
       return await studentHome.getName();
     }

     return { name };
   }

   private async classMaterial () {
     const studentClassMaterial = new StudentClassMaterial(this.page);

     return studentClassMaterial.start();
   }

   public async data ():Promise<{classMaterial:classMaterialsI | undefined, grades:userDataI | undefined, name:string | undefined}> {
     const grades = await this.grades();
     const classMaterial = await this.classMaterial();
     const name = await (await this.home()).name();

     return {
       name,
       classMaterial,
       grades
     };
   }
}

// only for tests
/* const browser = puppeteer.launch({ headless: false, ignoreHTTPSErrors: true, args: ['--no-sandbox'] });

async function devTest (login:string, password:string) {
  const student = new Student((await browser));

  const response = await student.login(login, password).then(() => student.data()).catch(e => e);

  console.log(response);
}
 */
export default Student;
