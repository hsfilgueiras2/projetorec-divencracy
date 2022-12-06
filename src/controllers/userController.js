import { votes, polls, options } from "../database/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function postPoll(req, res){
    const title = req.body.title
    let expiration;
    if (req.body.expireAt){expiration = req.body.expireAt}
    else{
        let currentDay = dayjs();
        currentDay=currentDay.add(30,'days')
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
        const toSend = await options.findOne(
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
    console.log(id)
    try{
        const resArr = await options.find({
            pollId: ObjectId(id)
        }).toArray();
        res.send(resArr)
    }catch(err){res.sendStatus(500)}
}
export async function postVote(req, res){
    const id = req.params.id;
    console.log(id)
    const currentDay = dayjs().format("YYYY-MM-DD hh:mm:ss");
    console.log(currentDay)
    try{
        await votes.insertOne(
            {
                createdAt: currentDay, 
                choiceId: ObjectId(id), 
            }
        )
        res.sendStatus(201)
    }catch(err){console.log(err);res.sendStatus(500)}

}
export async function getResult(req, res){
    const pollId = req.params.id;
    console.log(pollId)
    try{
        let mostVotes = 0;
        let mostVotesIndex = 0;
        const optionsArr = await options.find({
            pollId: ObjectId(pollId)
        }).toArray()
        console.log(optionsArr)
        for (let i =0;i<optionsArr.length;i++) {
            const numVotes = await (await votes.find({choiceId:optionsArr[i]._id}).toArray()).length
            console.log(numVotes)
            if (numVotes>mostVotes){
                mostVotes = numVotes;
                mostVotesIndex = i;
                console.log("max votes")
                console.log(mostVotes)
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