import Head from 'next/head'
import Link from 'next/link'
import { useAuthentication } from "../../hooks/useAuthentication"
import { App } from "../../components/layout/app";
import { Layout, Typography, Input, Divider, Button } from "antd";
import { useForm, Controller } from 'react-hook-form';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons'

const styles = require('../../styles/auth.module.css');

export default function Login() {
    const { control, handleSubmit, reset } = useForm();
    const { login, loading } = useAuthentication();

    const onSubmit = handleSubmit(variables => {
        login({ variables });
        reset();
    });

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
                    <Typography.Title level={3}>Sign in to Communities</Typography.Title >
                    <Button className={styles.button} icon={<GoogleOutlined />} size="large">Sign in with Google</Button>
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
                                rules={{ required: true }}
                                prefix={<UserOutlined />}
                            />
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
                                rules={{ required: true }}
                                prefix={<LockOutlined />}
                                type="password"
                            />
                        </div>
                        <Button className={styles.button} type="primary" size="large" loading={loading} htmlType="submit">
                            Sign In
                        </Button>
                    </form>
                </div>
                <div className={styles.switch}>
                    Not a member? <Link href="/auth/register"><a>Register here.</a></Link>
                </div>
            </Layout.Content>
        </App>
    )
}