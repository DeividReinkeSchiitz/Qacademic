import { Page } from 'puppeteer';

interface materialValueI {
   publicationData:string
   material:string
   obs:string
}

interface classNameI{
   [className:string]:Array<materialValueI>
}

interface classMaterialsI{
   [year:string]:classNameI
}

class ClassMaterial {
  private page:Page;
   private years:Array<string>;
   constructor (page:Page) {
     this.page = page;
     this.years = [];
   }

   public async start ():Promise<classMaterialsI | undefined> {
     try {
       await this.openClassMaterialBrowser();
       return await this.getUserData();
     } catch (error) {
       console.error(error);
     }
   }

   private async openClassMaterialBrowser () {
     await this.page.goto('https://academico.ifmt.edu.br/qacademico/index.asp?t=2061', { waitUntil: 'domcontentloaded' });
   }

   private async getYearsOptions () {
     return await this.page.$$eval('#ANO_PERIODO > option', options => options.map(option => option.textContent));
   }

   private async createTwoDimensionalArrayFromTable () {
     const data = await this.page.evaluate(() => {
       const rows = Array.from(document.querySelectorAll('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(4) > tbody > tr'));

       rows.shift();

       return rows.map(row => {
         const columns = row.querySelectorAll('td');
         return Array.from(columns, column => column?.innerText);
       });
     });

     return data;
   }

   private async getUserData () {
     const classMaterials:classMaterialsI = { };

     const years = await this.getYearsOptions();

     if (years[0] === '') {
       years.shift();
     }

     for (let index = 0; index < years.length; index++) {
       const year = years[index];

       let yearTreated = year?.replace(/ /ig, '');

       classMaterials[`${yearTreated}`] = {};

       yearTreated = yearTreated?.replace('/', '_');

       if (index !== 0) {
         await this.navigate(yearTreated);
       }

       const tableData = await this.createTwoDimensionalArrayFromTable();
       let classNameTreated = '';

       for (let indexRow = 0; indexRow < tableData.length; indexRow++) {
         const row = tableData[indexRow];
         if (row[0].length === 1) {
           const className:string = row[1];

           const firstCaracter = className.indexOf('-');
           const secondCaracter = className.indexOf('-', firstCaracter + 1);
           const thirtyCaracter = className.indexOf('-', secondCaracter + 1);

           classNameTreated = className.slice(secondCaracter, thirtyCaracter);
           classNameTreated = classNameTreated.replace(/-/gi, '');
           classNameTreated = classNameTreated.trim();

           const newYear = yearTreated?.replace('_', '/');
           classMaterials[`${newYear}`][`${classNameTreated}`] = [];
         } else {
           const publicationData = row[0];
           const obs = row[1].slice(row[1].indexOf('Observações:'), row[1].indexOf('</tr>')).replace('Observações: ', '') || '';

           const material = await this.page.evaluate((indexRow) => {
             const a:HTMLLinkElement | null = document.querySelector(`body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(4) > tbody > tr:nth-child(${indexRow + 2}) > td:nth-child(2) > a`);
             return a?.href;
           }, indexRow);

           const newYear = yearTreated?.replace('_', '/');

           classMaterials[`${newYear}`][`${classNameTreated}`].push({
             publicationData,
             material: material || '',
             obs
           });
         }
       }
     }

     return classMaterials;
   }

   private async navigate (year:string | undefined) {
     await this.page.select('select[name="ANO_PERIODO"]', year || '');
     await this.page.click('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(3) > form > input');
     await this.page.waitForNavigation();
   }
}

/*
   {
     grades:{
      "2018":{
         [...]
      }
      "2019":{
         [...]
     },
     classMaterial:{
      "2018":{
         "filosofia":[
            {
               publication_data:19/06/2020,
               material:"https://academico.ifmt.edu.br/uploads/MATERIAIS_AULAS/125199-AutoAvaliacao_1_BIMESTRE.pdf"
               obs:"balbalabl"
            },
            {
              publication_data:19/06/2020,
               obs:"balbalabl",
               material:"https://academico.ifmt.edu.br/uploads/MATERIAIS_AULAS/125199-AutoAvaliacao_1_BIMESTRE.pdf"

            }
         ]
      },
      "2019":{

      }
     }
   }
} */

export default ClassMaterial;
