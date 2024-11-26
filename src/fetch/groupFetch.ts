import { CHAT_GROUP_URL, CHAT_GROUP_USERS_URL } from "@/lib/apiEndPoints";
import { cache } from "react";

export async function fetchChatGroup(token:string) {
    const res = await fetch(CHAT_GROUP_URL, {
        headers:{
            Authorization:token
        },
        next:{
            revalidate:60*60,
            tags:["dashboard"]
        }
    })

    if(!res.ok){
        throw new Error("Failded to fetch data");
        
    }

    const response = await res.json();
    if(response?.data){
        return response?.data;
    }
    return [];
    
}

export async function fetchOneChatGroup(id:string) {
    const res = await fetch(`${CHAT_GROUP_URL}/${id}`, {
        cache:"no-cache"
    })

    if(!res.ok){
        throw new Error("Failded to fetch data");
        
    }

    const response = await res.json();
    if(response?.data){
        return response?.data;
    }
    return null;
    
}

export async function fetchChatUsers(id:string) {
    const res = await fetch(`${CHAT_GROUP_USERS_URL}/?group_id=${id}`, {
        cache:"no-cache"
    })

    if(!res.ok){
        throw new Error("Failded to fetch data");
        
    }

    const response = await res.json();
    if(response?.data){
        return response?.data;
    }
    return [];
    
}