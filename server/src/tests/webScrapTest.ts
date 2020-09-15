
import puppeteer from 'puppeteer';
import Student from '../webScrap/index';
// uncommit to test
(
  async () => {
    const puppeteerOptions = {
      headless: false,
      ignoreHTTPSErrors: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--no-zygote'
      ]

    };

    const browser = await puppeteer.launch(puppeteerOptions);
    const page = await browser.newPage();

    const student = new Student(page);
    await student.login('<xxxx>', '<xxxx>');

    const data = await student.data();

    console.log(data);
  }
)();
