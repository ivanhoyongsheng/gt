export const API_ROOT = '/api';
import express from 'express';
import register from 'api/register';
import commonstudents from 'api/commonstudents';
import suspend from 'api/suspend';
import retrievefornotifications from 'api/retrievefornotifications';

const apiRoutes = express.Router();

apiRoutes.post('/register', register);
apiRoutes.get('/commonstudents', commonstudents);
apiRoutes.post('/suspend', suspend);
apiRoutes.post('/retrievefornotifications', retrievefornotifications);

export default apiRoutes;
