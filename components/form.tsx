"use client"
import React, {useState} from 'react';
import {ActionIcon, TextInput} from '@mantine/core';
import {IconSend} from '@tabler/icons-react';
import styles from "../app/global.module.css";
import {useRouter} from "next/navigation";
import {createTodo} from "../lib/actions";


interface Props {
    userId: string;

}

const Form: React.FC<Props> = ({userId}) => {
    const [todoValue, setTodoValue] = useState('');

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       await createTodo(todoValue, userId)
        setTodoValue('');
        router.refresh()
    }


    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <TextInput
                classNames={{
                    root: styles.root,
                    input: styles.input,
                }}
                value={todoValue}
                onChange={(event) => setTodoValue(event.currentTarget.value)}
                placeholder="add todo ..."
            />
            <ActionIcon type="submit" bg="gray.7" size="lg" variant="filled" aria-label="Settings">
                <IconSend style={{width: '70%', height: '70%'}} stroke={1.5}/>
            </ActionIcon>
        </form>
    );
};

export default Form;
