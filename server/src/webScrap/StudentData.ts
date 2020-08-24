import puppeteer, { Page } from 'puppeteer';

class StudentData {
  public async start (login:string, password:string) {
    try {
      const browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
      const page = (await browser.pages())[0];

      await this.openStudentLogginBrowser(page);
      await this.loginForm(page, login, password);

      const wrongUser = await page.evaluate(() => document.querySelector('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > strong > font')?.innerHTML);

      if (wrongUser != null) {
        // wrong login
        return null;
      }

      await this.openStudentGradesBrowser(page);
      return await this.getUserData(page);
    } catch (error) {
      console.log('ScrapData error: ' + error);
    }
  }

  private async openStudentLogginBrowser (page:Page) {
    await page.goto('https://academico.ifmt.edu.br/qacademico/alunos');
  }

  private async loginForm (page:Page, login:string, password:string) {
    const loginSelector = '#txtLogin';
    const passwordSelector = '#txtSenha';
    const okSelector = '#btnOk';

    await page.click(loginSelector);
    await page.keyboard.type(login);
    await page.click(passwordSelector);
    await page.keyboard.type(password);
    await page.click(okSelector);

    await page.waitForNavigation();
  }

  private async openStudentGradesBrowser (page:Page) {
    await page.goto('https://academico.ifmt.edu.br/qacademico/alunos/boletim/index.asp');
  }

  private async getUserData (page:Page) {
    interface twoMonthI {
        'grade': number,
        'concept': number,
        'missedClasses':number
    }
    interface classNameI {
      [className:string]:Array<twoMonthI>
    }
    interface userDataI {
      [year:string]:classNameI
    }

    const userData:userDataI = {};

    const years = await page.$$eval('#cmbanos > option', options => options.map(option => option.textContent));

    for (let index = 0; index < years.length; index++) {
      const year = years[index];
      userData[`${year}`] = {};

      const pageURL = `https://academico.ifmt.edu.br/qacademico/index.asp?t=2032&COD_MATRICULA=-1&cmbanos=${year}&cmbperiodos=1&Exibir=Exibir+Boletim`;
      await page.goto(pageURL, { waitUntil: 'domcontentloaded' });

      const tableData = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(7) > tbody > tr'));

        rows.shift();
        rows.shift();

        return rows.map(row => {
          const columns = row.querySelectorAll('td');

          return Array.from(columns, column => column?.innerText);
        });
      });

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
