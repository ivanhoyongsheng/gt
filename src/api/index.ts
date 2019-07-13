export const API_ROOT = '/api';
import express from 'express';
import register from 'api/register';
import commonstudents from 'api/commonstudents';
import suspend from 'api/suspend';
import retrievefornotifications from 'api/retrievefornotifications';

const apiRoutes = express.Router();
const API_PREFIX = '/api';

apiRoutes.post(`${API_PREFIX}/register`, register);
apiRoutes.get(`${API_PREFIX}/commonstudents`, commonstudents);
apiRoutes.post(`${API_PREFIX}/suspend`, suspend);
apiRoutes.post(`${API_PREFIX}/retrievefornotifications`, retrievefornotifications);

export default apiRoutes;
