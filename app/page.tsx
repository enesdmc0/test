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
        console.log("---No pb auth---")
        redirect("/login");
    }


    const auth = JSON.parse(cookies().get("pb_auth")?.value as string);

    const todos = await isPb?.collection('todos').getFullList();

    return (
        <Box bg="gray.9" h="100vh">
            <Container fluid p="xl">
                <Header token={auth.token} />
                <Space h="xl"/>
                <Form userId={auth?.model.id}/>
                <Space h="xl"/>
                <Todos  todos={todos} />
            </Container>
        </Box>
    );
}
