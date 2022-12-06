import { pollSchema } from "../models/schemas.js";

export async function validatePoll(req,res,next){
    const pollBody = req.body;
    const validation = pollSchema.validate(pollBody, {abortEarly: false})
    if (validation.error){
        res.sendStatus(422)
        return
    }
    return next()
}