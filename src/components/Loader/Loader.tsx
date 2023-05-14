import { Spin } from 'antd';
import { Backdrop } from '@mui/material';

const Loader = () => {
    return (
        <Backdrop
            sx={{ color: '#EC1A25', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <Spin style={{ color: "#EC1A25", background: "red" }} size="large">
                <div style={{ color: "#EC1A25", background: "red" }} className="content" />
            </Spin>
        </Backdrop>
    );
};

export default Loader;
