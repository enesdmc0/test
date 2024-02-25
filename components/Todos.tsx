"use client"
import React from 'react';
import {Grid, Paper, SimpleGrid, Space, Text} from "@mantine/core";
import TodoItem from "./todo-item";

interface Props {
    todos: any;

}

const Todos: React.FC<Props> = ({todos,}) => {
    return (
        <Paper bg="gray.8" p="sm">
            <Grid gutter="xl">
                <Grid.Col span={6}>
                    <Text td="underline" size="xl" fw="700" c="gray.2" ta="center">read</Text>
                    <Space h="sm"/>
                    <SimpleGrid cols={2}>
                        {
                            todos.filter((x: any) => x.isCompleted).map((todo: any) => {
                                return <TodoItem todo={todo} key={todo.id}/>
                            })
                        }
                    </SimpleGrid>
                </Grid.Col>

                <Grid.Col span={6}>
                    <Text td="underline" c="gray.2" size="xl" fw="700" ta="center">unread</Text>
                    <Space h="sm"/>
                    <SimpleGrid cols={2}>
                        {
                            todos.filter((x: any) => !x.isCompleted).map((todo: any) => {
                                return <TodoItem todo={todo} key={todo.id}/>
                            })
                        }
                    </SimpleGrid>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default Todos;
