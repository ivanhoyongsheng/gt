import { Response } from 'express';
import retrieveService from 'service/retrievefornotifications';
import { CustomRequestBody } from 'types';
import { errorMessageHandler } from 'lib/util';

interface IBody {
  notification: string;
  teacher: string;
}

/**
 * Returns the list of valid `student`s that can receive the `notification`
 * sent. Valid `student`s must either a) be mentioned with an `@` tag, or b) be
 * registered under the `teacher` sent in the request body.
 */
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
    res.status(200).send({ recipients });
  } catch (e) {
    res.status(500).send(errorMessageHandler(e.message));
  }
};

export default retrievefornotifications;
