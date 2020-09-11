import { Page } from 'puppeteer';
import { userDataI } from '../../common/types';

class StudentData {
   private page:Page;
   private years:Array<string | null >;

   constructor (page:Page) {
     this.page = page;
     this.years = [];
   }

   public async start ():Promise<userDataI |undefined> {
     try {
       await this.openStudentGradesBrowser();
       await this.getYearsOptions();
       return await this.getUserData();
     } catch (error) {
       console.error('ERROR IN GRADES PAGE' + error);
     }
   }

   private async openStudentGradesBrowser () {
     await this.page.goto('https://academico.ifmt.edu.br/qacademico/alunos/boletim/index.asp');
   }

   private async getYearsOptions () {
     this.years = await this.page.$$eval('#cmbanos > option', options => options.map(option => option.textContent));
   }

   private async createTwoDimensionalArrayFromTable () {
     const data = await this.page.evaluate(() => {
       const rows = Array.from(document.querySelectorAll('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(7) > tbody > tr'));

       rows.shift();
       rows.shift();

       return rows.map(row => {
         const columns = row.querySelectorAll('td');

         return Array.from(columns, column => column?.innerText);
       });
     });

     return data;
   }

   private async getUserData ():Promise<userDataI> {
     const userData:userDataI = {};

     for (let index = 0; index < this.years.length; index++) {
       const year = this.years[index];
       userData[`${year}`] = {};

       const pageURL = `https://academico.ifmt.edu.br/qacademico/index.asp?t=2032&COD_MATRICULA=-1&cmbanos=${year}&cmbperiodos=1&Exibir=Exibir+Boletim`;
       await this.page.goto(pageURL, { waitUntil: 'domcontentloaded' });

       const tableData = await this.createTwoDimensionalArrayFromTable();

       // GET SPECIFIC DATA FROM TABLE
       tableData.map(rows => {
         const className = rows[0];
         const classNameTreated = className.slice(0, className.indexOf('-'));

         const grade1B = parseFloat(rows[5].replace(',', '.'));
         const missedClasses1B = parseFloat(rows[6].replace(',', '.'));
         const concept1b = parseFloat(rows[7].replace(',', '.'));

         const grade2B = parseFloat(rows[10].replace(',', '.'));
         const missedClasses2B = parseFloat(rows[11].replace(',', '.'));
         const concept2b = parseFloat(rows[12].replace(',', '.'));

         const grade3B = parseFloat(rows[15].replace(',', '.'));
         const missedClasses3B = parseFloat(rows[16].replace(',', '.'));
         const concept3b = parseFloat(rows[17].replace(',', '.'));

         const grade4B = parseFloat(rows[20].replace(',', '.'));
         const missedClasses4B = parseFloat(rows[21].replace(',', '.'));
         const concept4b = parseFloat(rows[22].replace(',', '.'));

         userData[`${year}`][`${classNameTreated}`] = [
           { concept: concept1b, missedClasses: missedClasses1B, grade: grade1B },
           { concept: concept2b, missedClasses: missedClasses2B, grade: grade2B },
           { concept: concept3b, missedClasses: missedClasses3B, grade: grade3B },
           { concept: concept4b, missedClasses: missedClasses4B, grade: grade4B }
         ];
       });
     }

     return userData;
   }
}

export default StudentData;

/*
{
"2020":[

    matematica:{},

    matematica:{},

],
"2021":[]
}

*/
