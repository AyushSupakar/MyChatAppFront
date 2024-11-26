import { CHATS_URL } from "@/lib/apiEndPoints";

export async function chatsFetch(groupId:string) {
    const res = await fetch(`${CHATS_URL}/${groupId}`, {
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