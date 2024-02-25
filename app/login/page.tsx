"use client"
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import classes from './login.module.css';
const LoginPage = () => {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = async () => {
        const login = await fetch("https://test-two-mu-87.vercel.app/api/login", {
            method: "POST",
            body: JSON.stringify({
                email, password,
            }),
        });

        if (login.status == 200) {
            router.push("/");
        } else if (login.status == 400) {
            router.push("/login");
        }


    }

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button">
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@mantine.dev" required />
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="Your password" required mt="md" />
                <Group justify="space-between" mt="lg">
                    <Checkbox label="Remember me" />
                    <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor>
                </Group>
                <Button onClick={handleLogin} fullWidth mt="xl">
                    Sign in
                </Button>
            </Paper>
        </Container>

    );
};

export default LoginPage;
