import { Page } from 'puppeteer';

class StudentLoggin {
  private login:string
  private password:string
  private page:Page;

  constructor (login:string, password:string, page:Page) {
    this.login = login;
    this.password = password;
    this.page = page;
  }

  public async start ():Promise<boolean|undefined> {
    try {
      await this.openStudentLogginBrowser();
      await this.loginForm();
      return await this.wrongLogin();
    } catch (error) {
      console.error(error);
    }
  }

  private async openStudentLogginBrowser () {
    await this.page.goto('https://academico.ifmt.edu.br/qacademico/alunos');
  }

  private async loginForm () {
    const loginSelector = '#txtLogin';
    const passwordSelector = '#txtSenha';
    const okSelector = '#btnOk';

    await this.page.click(loginSelector);
    await this.page.keyboard.type(this.login);
    await this.page.click(passwordSelector);
    await this.page.keyboard.type(this.password);
    await this.page.click(okSelector);

    await this.page.waitForNavigation();
  }

  private async wrongLogin () {
    const wrongUser = await this.page.evaluate(() => document.querySelector('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > strong > font')?.innerHTML);
    let userCorrect = false;

    if (wrongUser == null) {
      userCorrect = true;
    } else {
      userCorrect = false;
    }
    return userCorrect;
  }
}

export default StudentLoggin;
