import joi from "joi";

export const pollSchema = joi.object(
    {
        title: joi.string().required().min(1),
        expireAt: joi.string()
    }
)
export const choiceSchema = joi.object(
    {
        title: joi.string().required().min(1),
        pollId: joi.string()
    }
)