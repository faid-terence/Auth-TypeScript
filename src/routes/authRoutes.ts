import express from 'express';

import { register } from '../controllers/authentucation';

export default (router: express.Router)=> {
    router.post("/auth/register", register);
}