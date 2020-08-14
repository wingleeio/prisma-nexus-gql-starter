import { useState, useEffect } from "react";
import { Layout } from "antd";

export const App = ({ children }) => {
    const [height, setHeight] = useState<number>();

    useEffect(() => {
        setHeight(window.innerHeight)

        const updateHeight = () => {
            setHeight(window.innerHeight);
        }

        window.addEventListener('resize', updateHeight);
    }, [])

    return (
        <Layout style={{
            minHeight: height,
            minWidth: '100vw',
            maxWidth: '100vw',
            overflowX: 'hidden'
        }}>
            {children}
        </Layout>
    )
}