import { Request, Response } from 'express';
import Student from '../webScrap/index';
import puppeteer from 'puppeteer';

const browser = puppeteer.launch({ headless: true, ignoreHTTPSErrors: true, args: ['--no-sandbox'] });

class StudentController {
  public async getData (req:Request, res:Response) {
    try {
      let response;
      const { password, login } = req.body;
      const student = new Student((await browser));

      response = await student.login(login, password);
      if (response) {
        response = await student.data();
      }
      res.json(response);

      await student.closePage();
    } catch (error) {
      console.error(error.message);
      await (await browser).close();
    }
  }
}

const studentControllers = new StudentController();

export default studentControllers;
