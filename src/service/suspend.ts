import sql from './sql';
import { RowDataPacket } from 'mysql2';

class SuspendService {
  suspend = async (student: string) => {
    const qs = `UPDATE students SET suspended = true WHERE email = ?`;
    const res = await sql.query(qs, student);
    return res[0];
  };

  suspendStudent = async (student: string) => {
    const res = (await this.suspend(student)) as RowDataPacket;
    return res;
  };
}
const suspendService = new SuspendService();

export default suspendService;
