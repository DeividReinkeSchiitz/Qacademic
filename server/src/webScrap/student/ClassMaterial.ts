import { Page } from 'puppeteer';
import { classMaterialsI } from '../../common/types';
class ClassMaterial {
  private page:Page;

  constructor (page:Page) {
    this.page = page;
  }

  public async start ():Promise<classMaterialsI | undefined> {
    try {
      await this.openClassMaterialBrowser();
      return await this.getUserData();
    } catch (error) {
      console.error(`ERROR IN CLASS MATERIAL PAGE ${error}`);
    }
  }

  private async openClassMaterialBrowser () {
    const url = 'https://academico.ifmt.edu.br/qacademico/index.asp?t=2061';
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  private async getYearsOptions () {
    const optionsElement = '#ANO_PERIODO > option';
    await this.page.waitForSelector(optionsElement);

    return await this.page.$$eval(optionsElement, options => options.map(option => option.textContent));
  }

  private async createTwoDimensionalArrayFromTable () {
    const tableElement = 'body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(4) > tbody > tr';
    await this.page.waitForSelector(tableElement);

    // return data in a array as: data[<row>][<columns>]
    const data = await this.page.evaluate(() => {
      const tableElement = 'body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(4) > tbody > tr';
      const rows = Array.from(document.querySelectorAll(tableElement));

      // remove unecessary row
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
    // remove the first year if it doesnt have nothing
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

        // the row refers about the class name
        if (row[0].length === 1) {
          const className:string = row[1];
          classNameTreated = this.treatingClassName(className);

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
    const selectElement = 'select[name="ANO_PERIODO"]';
    const buttonElement = 'body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(3) > form > input';

    await this.page.waitForSelector(selectElement);
    await this.page.waitForSelector(buttonElement);

    await this.page.select(selectElement, year || '');

    Promise.all([
      this.page.click(buttonElement),
      this.page.click(buttonElement)
    ]);
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
