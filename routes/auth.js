import express from "express";
import verifyRegistration from '../middleware/verifyRegistration';
import { signUp, signIn } from '../controllers/users';

export default app => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });
  app.post("/signup", [verifyRegistration], signUp);
  app.post("/signin", signIn);
}