import { choiceSchema } from "../models/schemas.js";
import { polls,options } from "../database/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";
export async function validateChoice(req,res,next){
    const choiceBody = req.body;
    const validation = choiceSchema.validate(choiceBody, {abortEarly: false})
    if (validation.error){
        console.log(validation.error.details)
        res.sendStatus(422)
        return
    }
    try{
        const poll = await polls.findOne({_id: ObjectId(choiceBody.pollId)})
        if(!poll){
            res.sendStatus(404)
            return
        }
        else{
            if (dayjs().isAfter(dayjs(poll.expireAt))){
                res.sendStatus(403)
                return
            }
            const choice = await options.findOne({title:choiceBody.title})
            if(choice){
                res.sendStatus(409)
                return
            }
            else{
                return next()}
        }

    }catch(err){res.sendStatus(500);return}

}