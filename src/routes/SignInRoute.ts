import { Router } from "express";
import { signInController } from "../useCases/SignIn/index";

const router = Router()

router.post('/signin', async (request, response) => {
    const res = await signInController.handle(request);
    response.status(res.statusCode).send(res.body.token)
});

module.exports = router