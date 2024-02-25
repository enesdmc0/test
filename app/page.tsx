import {Box, Container, Space,} from "@mantine/core";
import Header from "../components/header";
import Todos from "../components/Todos";
import pbAuth from "../lib/pbAuth";
import Form from "../components/form";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";


export const revalidate = 0;

export default async function Home() {

    const isPb = await pbAuth();



    if (!isPb) {
        return (
            redirect('/login')
        )
    }
    const user = JSON.parse(cookies().get("user")?.value as string);

    console.log(isPb)

    const todos = await isPb?.collection('todos').getFullList();




    return (
        <Box bg="gray.9" h="100vh">
            <Container fluid p="xl">
                <Header />
                <Space h="xl"/>
                <Form userId={user.id} />
                <Space h="xl"/>
                <Todos  todos={todos} />
            </Container>

        </Box>
    );
}
