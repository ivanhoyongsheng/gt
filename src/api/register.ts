import { Response } from 'express';
import RegisterService from 'service/register';
import { CustomRequestBody } from 'types';
import { errorMessageHandler } from 'lib/util';

const registerService = new RegisterService();

interface IBody {
  students: string[];
  teacher: string;
}
const register = async (req: CustomRequestBody<IBody>, res: Response) => {
  const { students, teacher } = req.body;
  try {
    if (!teacher) {
      res.status(400).send(errorMessageHandler('No teacher provided'));
      return;
    }
    if (!students) {
      res.status(400).send(errorMessageHandler('No students provided'));
      return;
    }
    await registerService.registerStudentsToTeacher(students, teacher);
    res.status(204).send();
  } catch (e) {
    res.status(500).send(errorMessageHandler(e.message));
  }
};

export default register;
