import { Request, Response } from 'express';
import express from 'express';
import apiRoutes from 'api';
import bodyParser from 'body-parser';

const app = express();

const main = async () => {
  const { PORT = 3000 } = process.env;
  app.use(bodyParser.json());
  app.get('/', (_req: Request, res: Response) => {
    res.send({
      message: 'hello world'
    });
  });
  app.use(apiRoutes);

  app.listen(PORT, () => {
    console.log('server started at http://localhost:' + PORT);
  });
};

main();
