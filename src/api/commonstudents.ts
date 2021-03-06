import { Response } from 'express';
import commonStudentsService from 'service/commonstudents';
import { CustomRequestQuery } from 'types';
import { errorMessageHandler } from 'lib/util';
import { RowDataPacket } from 'mysql2';


interface IBody {
  teacher: string | string[];
}

/** List `students` that are registered to all the `teachers` provided */
const commonstudents = async (req: CustomRequestQuery<IBody>, res: Response) => {
  try {
    const { teacher } = req.query;
    if (!teacher) {
      res.status(400).send(errorMessageHandler('No teacher provided'));
      return;
    }
    const result = await commonStudentsService.getStudentsOfTeacher(forceArray(teacher));
    const students = (result as RowDataPacket[]).map((res) => res.email);
    res.send({ students });
  } catch (e) {
    res.status(500).send(errorMessageHandler(e.message));
  }
};

const forceArray = (teacher: string | string[]): string[] =>
  (teacher as string[]).forEach ? (teacher as string[]) : [teacher as string];

export default commonstudents;
