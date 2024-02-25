"use client"
import React from 'react';
import {ActionIcon, Badge, Group, Paper, Text} from "@mantine/core";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {useRouter} from "next/navigation";
import {deleteTodo, updateTodo} from "../lib/actions";

interface Props {
    todo: any
}

const TodoItem: React.FC<Props> = ({todo, }) => {
    const {isCompleted, description, id, owner} = todo
    const router = useRouter();

    const handleDelete = async () => {

        await deleteTodo(id)
        router.refresh();
    }

    const handleUpdate = async () => {
       await updateTodo(id, isCompleted)
        router.refresh();

    }


    return (
        <Paper bg={isCompleted ? "gray.6" : "gray.5"} p="sm">
            <Group justify="space-between">
                <Text c="gray.2">{description}</Text>
                <Badge color="pink">{owner}</Badge>
                <Group gap="sm">
                    <ActionIcon onClick={handleUpdate} variant="filled" bg="gray.8">
                        <IconEdit style={{width: '60%', height: '60%'}} stroke={1.5}/>
                    </ActionIcon>
                    <ActionIcon onClick={handleDelete} variant="filled" bg="gray.8">
                        <IconTrash style={{width: '60%', height: '60%'}} stroke={1.5}/>
                    </ActionIcon>
                </Group>
            </Group>
        </Paper>
    );
};

export default TodoItem;
