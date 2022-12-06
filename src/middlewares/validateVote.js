import { polls,options } from "../database/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";
export async function validateVote(req,res,next){
    const choiceId = req.params.id;
    try{
        const choice = await options.findOne({_id: ObjectId(choiceId)})
        if(choice){
            const poll = await polls.findOne({_id: ObjectId(choice.pollId)})
        
            if (dayjs().isAfter(dayjs(poll.expireAt))){
                res.sendStatus(403)
                return
            }
        
        }
        else{res.sendStatus(404);return}


    }catch(err){res.sendStatus(500);return}
    return next()
}