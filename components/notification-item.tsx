import React from 'react';
import {ActionIcon, Badge, Group, Paper, Text} from "@mantine/core";
import {IconEdit} from "@tabler/icons-react";

const NotificationItem = () => {
    return (
        <Paper bg="gray.8">
            <Group justify="space-between" p="sm">
                <Text c="gray.2">Todo</Text>
                <Badge color="blue">Badge</Badge>
                <ActionIcon variant="filled" bg="gray.6">
                    <IconEdit style={{width: '60%', height: '60%'}} stroke={1.5}/>
                </ActionIcon>
            </Group>
        </Paper>
    );
};

export default NotificationItem;
