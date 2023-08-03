import { Skeleton, Spin } from 'antd';

const ReviewLoader = () => {
    return (
        <div className='p-2'>
            <Skeleton avatar={{ size: 'large', style: { width: 75, height: 75 } }} paragraph={{ rows: 1, style: { height: '100px' } }} active />
            <Skeleton avatar={{ size: 'large', style: { width: 75, height: 75 } }} paragraph={{ rows: 1, style: { height: '100px' } }} active />
        </div>
    );
};

export default ReviewLoader;
