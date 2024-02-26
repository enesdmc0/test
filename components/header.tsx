"use client"
import React, {useEffect, useState} from 'react';
import {ActionIcon, Avatar, Badge, Group, Indicator, Paper, Stack, Text, Title} from "@mantine/core";
import styles from '../app/global.module.css';
import {IconTrash} from "@tabler/icons-react";
import {pb} from "../lib/pb";

interface Props {
    token: string

}

const Header: React.FC<Props> = ({token}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<any>([])


    useEffect(() => {
      if (token) {
          pb.authStore.save(token);

          pb.collection('todos').subscribe('*', function (x) {
              console.log(x, "enes")
              setMessages([...messages, x])
          }
            );
      }
    }, [messages]);
    console.log(messages, "messages");


    const handleUpdate = async (id: string) => {

    }


    return (
        <Paper bg="gray.7" p="sm" pos="relative">
            <Group justify="space-between">
                <Title c="gray.1" order={2}>pocketbase || nextjs</Title>
                <Indicator color="pink" disabled={messages.length === 0} processing>
                    <Avatar onClick={() => setIsOpen(!isOpen)} variant="light" radius="xl" color="pink" src=""/>
                </Indicator>
            </Group>
            {isOpen &&
                <Paper w="350px" mih="500px" pos="absolute" top="90px" right="0" bg="gray.7" p="sm"
                       className={styles.menuIndex}>
                    <Stack>
                        {
                            messages?.map((x: any, i: number) => (
                                <Paper bg="gray.8" p="sm" key={i}>
                                    <Group justify="space-between">
                                        <Text c="gray.2">{x.record.description}</Text>
                                        <Badge color="pink">{x.action}</Badge>
                                        <ActionIcon onClick={() => handleUpdate(x.record.id)} variant="filled"
                                                    bg="gray.7">
                                            <IconTrash style={{width: '60%', height: '60%'}} stroke={1.5}/>
                                        </ActionIcon>
                                    </Group>
                                </Paper>
                            ))
                        }
                    </Stack>
                </Paper>}
        </Paper>
    );
};

export default Header;
