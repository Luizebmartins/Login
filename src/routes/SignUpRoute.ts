import { Router } from "express";
import { signUpController } from "../useCases/SignUp/index";

const router = Router()

router.post('/signup', async (request, response) => {
    const res = await signUpController.handle(request);
    response.status(res.statusCode).send(res.body.message)
});

export { router }