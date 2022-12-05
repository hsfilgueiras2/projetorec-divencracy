import { votes, polls, options } from "../database/db.js";
import { ObjectId } from "mongodb";

export async function postPoll(req, res){
    const title = req.body.title
    let expiration;
    if (req.body.expireAt){expiration = req.body.expireAt}
    else{
        let currentDay = new Date();
        currentDay.setDate(currentDay.getDate() + 30);
        expiration = currentDay.format("YYYY-MM-DD hh:mm:ss")
    }
    try
    {
        await polls.insertOne(
            {
                title:title,
                expireAt:expiration
            }
        )
        const toSend = await polls.findOne(
            {
                title:title,
                expireAt:expiration
            }
        )
        res.send(toSend).status(201)
    }catch(err){
    console.log(err);
    res.sendStatus(500)}
}
export async function getPoll(req, res){
    try{
        const toSend = await polls.find().toArray()
        res.send(toSend)
    }catch(err){res.sendStatus(500)}
}
export async function postChoice(req, res){
    const title = req.body.title;
    const pollId = new ObjectId(req.body.pollId);
    try
    {
        await options.insertOne(
            {
                title:title,
                pollId:pollId
            }
        )
        const toSend = await pollId.findOne(
            {
                title:title,
                pollId:pollId
            }
        )
        res.send(toSend).status(201)
    }catch(err){
    console.log(err);
    res.sendStatus(500)}
}
export async function getChoice(req, res){
    const id = req.params.id;
    try{
        const resArr = await options.find({
            pollId:id
        }).toArray();
        res.send(resArr)
    }catch(err){res.sendStatus(500)}
}
export async function postVote(req, res){
    const id = req.params.id;
    const currentDay = new Date();
    try{
        await votes.insertOne(
            {
                createdAt: currentDay.format("YYYY-MM-DD hh:mm:ss"), 
                choiceId: ObjectId(id), 
            }
        )
        res.sendStatus(201)
    }catch(err){res.sendStatus(500)}

}
export async function getResult(req, res){
    const pollId = req.params.id;

    
    try{
        let mostVotes = 0;
        let mostVotesIndex = 0;
        const optionsArr = await options.find({
            pollId: ObjectId(pollId)
        }).toArray()
        for (let i =0;i<optionsArr.length;i++) {
            const numVotes = await (await votes.find({choiceId:option._id}).toArray()).length
            if (numVotes>mostVotes){
                mostVotes = numVotes;
                mostVotesIndex = i;
            }
        }
        const poll = await polls.findOne({_id : ObjectId(pollId)})
        const toSend = {
            _id: pollId,
            title: poll.title,
            expireAt: poll.expireAt,
            result:{
                title:optionsArr[mostVotesIndex].title,
                votes: mostVotes
            }
        }
        res.send(toSend)




    }catch(err){res.sendStatus(500)}
}