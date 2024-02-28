"use server"

import pbAuth from "./pbAuth";

export const updateTodo = async (id: string, isCompleted: boolean) => {
    const isPb = await pbAuth();
    if (!isPb) return null
    await isPb.collection("todos").update(id, {"isCompleted": !isCompleted});
}


export const deleteTodo = async (id: string) => {
    const isPb = await pbAuth();
    if (!isPb) return null
    await isPb.collection("todos").delete(id);
}

export const createTodo = async (todoValue: string, userId:string) => {
    const isPb = await pbAuth();
    if (!isPb) return null

        await isPb.collection("todos").create({
        "owner": userId,
        "isCompleted": false,
        "description": todoValue
    })
}



