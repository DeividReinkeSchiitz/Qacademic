import { Page } from 'puppeteer';
import { classMaterialsI } from '../../common/types';

class ClassMaterial {
  private page:Page;

  constructor (page:Page) {
    this.page = page;
  }

  public async start ():Promise<classMaterialsI> {
    try {
      await this.openClassMaterialBrowser();

      return await this.getUserData();
    } catch (error) {
      throw new Error(`ERROR IN CLASS MATERIAL PAGE ${error}`);
    }
  }

  private async openClassMaterialBrowser () {
    const url = 'https://academico.ifmt.edu.br/qacademico/index.asp?t=2061';
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  private async getYearsOptions (YearsOptionsElement:string) {
    await this.page.waitForSelector(YearsOptionsElement);

    const years = await this.page.$$eval(YearsOptionsElement, options => options.map(option => {
      const year = option.textContent;

      if (year === '') return '';

      // remove unnecessary white spaces
      const yearTreated = year?.replace(/ /ig, '');

      return yearTreated as string;
    }));

    // remove first item in years array if there is nothing there (sometimes it happens)
    if (years[0] === '') {
      years.shift();
    }

    return years;
  }

  private async createTwoDimensionalArrayFromTableElement (tableElement:string) {
    await this.page.waitForSelector(tableElement);

    // return data in a array as: data[<row>][<columns>]
    const data = await this.page.evaluate((tableElement:string) => {
      const rows = Array.from(document.querySelectorAll(tableElement));

      // remove unecessary row
      rows.shift();

      return rows.map(row => {
        const columns = row.querySelectorAll('td');
        return Array.from(columns, column => column.innerText);
      });
    }, tableElement);
    return data;
  }

  private async getUserData () {
    const YearsOptionsElement = '#ANO_PERIODO > option';
    const tableElement = 'body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(4) > tbody > tr';

    const classMaterials:classMaterialsI = { };
    const years = await this.getYearsOptions(YearsOptionsElement);

    for (let index = 0; index < years.length; index++) {
      // get especific year
      const year = years[index];

      // condition is because the user already is in the first year page option
      if (index !== 0) await this.navigate(year);

      classMaterials[`${year}`] = {};

      const tableData = await this.createTwoDimensionalArrayFromTableElement(tableElement);

      let classNameTreated = '';
      // interate from each row
      for (let indexRow = 0; indexRow < tableData.length; indexRow++) {
        const row = tableData[indexRow];

        // the row refers about the class name
        if (row[0].length === 1) {
          const className:string = row[1];
          classNameTreated = this.treatingClassName(className);

          classMaterials[`${year}`][`${classNameTreated}`] = [];
        } else {
          const publicationData = row[0];

          let obs = '';
          if (row[1].indexOf('Observações:') !== -1) {
            const startObsIndex = row[1].indexOf('Observações:');

            obs = row[1].slice(startObsIndex, row[1].length);
            obs = obs.replace('Observações: ', '');
          }

          const material = await this.page.evaluate((indexRow) => {
            const a:HTMLLinkElement | null = document.querySelector(`body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(4) > tbody > tr:nth-child(${indexRow + 2}) > td:nth-child(2) > a`);
            return a?.href;
          }, indexRow);

          classMaterials[`${year}`][`${classNameTreated}`].push({
            publicationData,
            material: material || '',
            obs
          });
        }
      }
    }

    return classMaterials;
  }

  private async navigate (year:string) {
    const selectElement = 'select[name="ANO_PERIODO"]';
    const buttonElement = 'body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(3) > form > input';

    await this.page.waitForSelector(selectElement);
    await this.page.waitForSelector(buttonElement);

    const yearTreated = year.replace('/', '_');
    await this.page.select(selectElement, yearTreated);

    await this.page.evaluate((buttonElement) => {
      const button = document.querySelector(buttonElement) as HTMLButtonElement;
      button.click();
    }, buttonElement);

    await this.page.waitForNavigation();
  }

  private treatingClassName (className:string) {
    const firstCaracter = className.indexOf('-');
    const secondCaracter = className.indexOf('-', firstCaracter + 1);
    const thirtyCaracter = className.indexOf('-', secondCaracter + 1);

    let classNameTreated = className.slice(secondCaracter, thirtyCaracter);
    classNameTreated = classNameTreated.replace(/-/gi, '');
    classNameTreated = classNameTreated.trim();

    return classNameTreated;
  }
}

export default ClassMaterial;
