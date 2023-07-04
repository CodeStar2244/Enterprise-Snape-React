import { Spin } from 'antd';
import { Backdrop, CircularProgress } from '@mui/material';

const SimpleLoader = () => {
    return (
        <div className="simpleloader">
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column justify-content-center">
                    <Spin style={{ color: "#EC1A25", background: "red" }} size="large">
                        <div style={{ color: "#EC1A25", background: "red" }} className="content" />
                    </Spin>
                </div>
            </div>
        </div>
    );
};

export default SimpleLoader;
