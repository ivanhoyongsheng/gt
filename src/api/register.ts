import { Response } from 'express';
import registerService from 'service/register';
import { CustomRequestBody } from 'types';
import { errorMessageHandler } from 'lib/util';


interface IBody {
  students: string[];
  teacher: string;
}

/** registers a list of `students` to a specific `teacher` */
const register = async (req: CustomRequestBody<IBody>, res: Response) => {
  const { students, teacher } = req.body;
  try {
    if (!teacher) {
      res.status(400).send(errorMessageHandler('No teacher provided'));
      return;
    } else if (!students || students.length === 0) {
      res.status(400).send(errorMessageHandler('No students provided'));
      return;
    } else if (
      registerService.checkEmailValidity(teacher) === false ||
      registerService.checkEmailValidity(students) === false
    ) {
      res.status(400).send(errorMessageHandler('Invalid email format'));
      return;
    }
    await registerService.registerStudentsToTeacher(students, teacher);
    res.status(204).send();
  } catch (e) {
    res.status(500).send(errorMessageHandler(e.message));
  }
};

export default register;
