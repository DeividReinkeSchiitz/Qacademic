import { Request, Response } from 'express';
import Student from '../schemas/StudentSchemas';
import StudentData from '../webScrap/StudentData';

class StudentController {
  public async index (req:Request, res:Response):Promise<Response> {
    try {
      const students = await Student.find();
      return res.json(students);
    } catch (error) {
      throw new Error('Get students doesnt work');
    }
  }

  public async show (req:Request, res:Response):Promise<Response> {
    try {
      const students = await Student.findById(req.params.id);
      return res.json(students);
    } catch (error) {
      throw new Error('Show student doesnt work');
    }
  }

  public async store (req:Request, res:Response):Promise<unknown> {
    try {
      const { password, login } = req.body;

      const studentData = new StudentData();
      const response = await studentData.start(login, password);

      const students = await Student.create({ login, password, grades: response });

      return res.json(students);
    } catch (error) {
      throw new Error('Store a new student doesnt work');
    }
  }

  public async destroy (req:Request, res:Response) {
    try {
      const students = await Student.find();

      students.map(async (value) => {
        if (value.id === req.params.id) {
          await Student.findByIdAndRemove(req.params.id);
        }
      });

      res.end();
    } catch (error) {
      throw new Error('Remove student doesnt work');
    }
  }

  public async getGradesByLoggin (req:Request, res:Response) {
    try {
      const { password, login } = req.body;

      const studentData = new StudentData();
      const response = await studentData.start(login, password);
      console.log(response);

      return res.json(response);
    } catch (error) {
      throw new Error('student doesnt exist');
    }
  }
}

const studentControllers = new StudentController();

export default studentControllers;
