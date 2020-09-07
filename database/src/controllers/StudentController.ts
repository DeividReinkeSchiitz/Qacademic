import { Request, Response } from 'express';
import StudentCluster from '../common/StudentCluster';
class StudentController extends StudentCluster {
  public async getData (req:Request, res:Response) {
    try {
      const { password, login } = req.body;

      const data = await (await this.cluster).execute({ password, login });

      return res.json(data);
    } catch (error) {
      console.error(error);
    } finally {
      await (await this.cluster).idle();
    }
  }
}

const studentControllers = new StudentController();

export default studentControllers;
