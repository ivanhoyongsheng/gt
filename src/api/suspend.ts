import { Response } from 'express';
import SuspendService from 'service/suspend';
import { CustomRequestBody } from 'types';
import { errorMessageHandler } from 'lib/util';

const suspendService = new SuspendService();

interface IBody {
  student: string;
}

/**
 * Suspend a specific `student`. Will set the `suspended` status of the `student`
 * to `true` regardless of current status (i.e. does not toggle status)
 */
const suspend = async (req: CustomRequestBody<IBody>, res: Response) => {
  try {
    const { student } = req.body;
    if (!student) {
      res.status(400).send(errorMessageHandler('No student provided'));
      return;
    }
    const a = await suspendService.suspendStudent(student);
    if (a.affectedRows === 0) {
      res.status(400).send(errorMessageHandler('Student not found'));
      return;
    } else if (a.changedRows === 0 && a.affectedRows === 1) {
      //match but already suspended
      res.status(204).send(a);
      return;
    } else {
      res.status(204).send(a);
      return;
    }
  } catch (e) {
    res.status(500).send(errorMessageHandler(e.message));
  }
};

export default suspend;
