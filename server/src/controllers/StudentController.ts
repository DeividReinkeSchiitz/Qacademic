import { Request, Response } from 'express';
import Student from '../webScrap/index';
import puppeteer from 'puppeteer';
class StudentController {
  public async getData (req:Request, res:Response) {
    try {
      let response;
      const { password, login } = req.body;
      const browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const student = new Student(browser);

      response = await student.login(login, password);
      if (response) {
        response = await student.data();
      }
      res.json(response);
      await browser.close();
      return;
    } catch (error) {
      console.error(error.message);
    }
  }
}

const studentControllers = new StudentController();

export default studentControllers;
