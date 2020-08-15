import Head from 'next/head'
import Link from 'next/link'
import { useAuthentication } from "../../hooks/useAuthentication"
import { useMe } from "../../hooks/useMe"
import { App } from "../../components/layout/app";
import { Layout, Typography, Input, Divider, Button } from "antd";
import { useForm, Controller } from 'react-hook-form';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons'
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { T } from 'antd/lib/upload/utils';

const styles = require('../../styles/auth.module.css');

export default function Page() {
    const { push } = useRouter()
    const { loggedIn, loading: meLoading } = useMe();
    const { control, handleSubmit, errors } = useForm();
    const { register, loading: authLoading } = useAuthentication();

    const onSubmit = handleSubmit(variables => {
        register(variables);
    });

    useEffect(() => {
        if (loggedIn) {
            push('/')
        }
    }, [loggedIn])

    return (
        <App>
            <Head>
                <title>Login - Communities</title>
            </Head>
            <Layout.Sider className={styles.sider} theme="light">
                <div className={styles.call}>
                    <Typography.Title className={styles.logo} level={3} type="secondary">Communities</Typography.Title >
                    <Typography.Title className={styles.slogan}>Explore & network among your peers.</Typography.Title>
                </div>
                <img className={styles.image} src="/auth.svg" alt="Illustration of person browsing their phone." />
                <div className={styles.credits}>
                    Illustration from <a className={styles.creditLink} href="https://www.drawkit.io/" target="_blank">DrawKit</a>
                </div>
            </Layout.Sider>
            <Layout.Content className={styles.content}>
                <div className={styles.form}>
                    <Typography.Title level={3}>Sign up to Communities</Typography.Title >
                    <Button className={styles.button} icon={<GoogleOutlined />} size="large">Sign up with Google</Button>
                    <Divider><Typography.Text type="secondary">Or</Typography.Text></Divider>
                    <form onSubmit={onSubmit}>
                        <div className={styles.formItem}>
                            <label>
                                <Typography.Text strong={true}>Email</Typography.Text>
                            </label>
                            <Controller
                                className={styles.input}
                                as={Input}
                                name="email"
                                placeholder="Email"
                                control={control}
                                size="large"
                                defaultValue=""
                                rules={{ required: true, minLength: 6 }}
                                prefix={<UserOutlined />}
                            />
                            {errors.email ? <Typography.Text type="danger"><small>Email is required.</small></Typography.Text> : null}
                        </div>
                        <div className={styles.formItem}>
                            <label>
                                <Typography.Text strong={true}>Username</Typography.Text>
                            </label>
                            <Controller
                                className={styles.input}
                                as={Input}
                                name="username"
                                placeholder="Username"
                                control={control}
                                size="large"
                                defaultValue=""
                                rules={{ required: true, minLength: 2 }}
                                prefix={<UserOutlined />}
                            />
                            {errors.username ? <Typography.Text type="danger"><small>Username is required.</small></Typography.Text> : null}
                        </div>
                        <div className={styles.formItem}>
                            <label>
                                <Typography.Text strong={true}>Password</Typography.Text>
                            </label>
                            <Controller
                                className={styles.input}
                                as={Input}
                                name="password"
                                placeholder="Password"
                                control={control}
                                size="large"
                                defaultValue=""
                                rules={{ required: true, minLength: 6 }}
                                prefix={<LockOutlined />}
                                type="password"
                            />
                            {errors.password ? <Typography.Text type="danger"><small>Password is required. Must be 6 characters or longer.</small></Typography.Text> : null}
                        </div>
                        <Button className={styles.button} type="primary" size="large" loading={meLoading || authLoading} htmlType="submit">
                            Sign Up
                        </Button>
                    </form>
                </div>
                <div className={styles.switch}>
                    Already have an account? <Link href="/auth/login"><a>Sign in here.</a></Link>
                </div>
            </Layout.Content>
        </App>
    )
}