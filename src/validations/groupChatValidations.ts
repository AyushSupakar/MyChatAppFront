import { title } from "process";
import { z } from "zod"; 
export const createChatSchema = z
.object(
    {
        title:z.string().min(4, {message:"Chat title must of at least 4 characters long"}).max(191, {message:"Chat title must of at most 191 characters long"}),
        passcode:z.string().min(4, {message:"PassCode must of at least 4 characters long"}).max(25, {message:"PassCode must of at most 25 characters long"})
    }
)
.required()

export type createChatSchemaType = z.infer<typeof createChatSchema>;