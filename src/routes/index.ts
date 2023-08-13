import express from 'express'
import authRoutes from './authRoutes';

const router = express.Router();

export default ():express.Router => {
    authRoutes(router);
     return router;
}