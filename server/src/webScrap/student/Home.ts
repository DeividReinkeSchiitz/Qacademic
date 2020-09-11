import { Page } from 'puppeteer';

class StudentLoggin {
  private page:Page;

  constructor (page:Page) {
    this.page = page;
  }

  private async openingHomeBrowser () {
    await this.page.goto('https://academico.ifmt.edu.br/qacademico/index.asp?t=2000');
  }

  public async start ():Promise<void> {
    await this.openingHomeBrowser();
  }

  public async getName () {
    const name = await this.page.evaluate(() => {
      const name = document.querySelector('body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(1) > td:nth-child(3)');

      return name?.textContent;
    });

    return name?.trim();
  }
}

export default StudentLoggin;
