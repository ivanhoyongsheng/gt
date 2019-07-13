import { Response } from 'express';
import RetrieveService from 'service/retrievefornotifications';
import { CustomRequestBody } from 'types';
import { errorMessageHandler } from 'lib/util';

const retrieveService = new RetrieveService();

interface IBody {
  notification: string;
  teacher: string;
}
const retrievefornotifications = async (req: CustomRequestBody<IBody>, res: Response) => {
  const { notification, teacher } = req.body;
  try {
    if (!teacher) {
      res.status(400).send(errorMessageHandler('No teacher provided'));
      return;
    }
    if (!notification) {
      res.status(400).send(errorMessageHandler('No notification provided'));
      return;
    }
    const recipients = await retrieveService.retrieveStudents(teacher, notification);
    // const recipients = await retrieveService.getListOfStudentsMentioned(notification);
    res.status(200).send({ recipients });
  } catch (e) {
    res.status(500).send(errorMessageHandler(e.message));
  }
};

export default retrievefornotifications;
