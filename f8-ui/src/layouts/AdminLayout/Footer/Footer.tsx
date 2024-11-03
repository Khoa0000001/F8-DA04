import { Layout } from 'antd';
const { Footer } = Layout;

function AdFooter() {
    return (
        <Footer style={{ textAlign: 'center' }}>
            F8 © 2018 - {new Date().getFullYear()}. Nền tảng học lập trình hàng đầu Việt Nam
        </Footer>
    );
}

export default AdFooter;
