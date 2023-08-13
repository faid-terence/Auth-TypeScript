import express from 'express';

import { loginUser, register } from '../controllers/authentucation';

export default (router: express.Router)=> {
    router.post("/auth/register", register);
    router.post("/auth/login", loginUser);
}