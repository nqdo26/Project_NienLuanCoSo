import { notification, Table } from 'antd';
import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { useEffect, useState } from 'react';
import { getUserApi } from '../../utils/api';

const cx = classNames.bind(styles);

function User() {
    const [dataSource, setDataSources] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUserApi();
            if (!res?.message) {
                setDataSources(res);
            } else {
                notification.error({
                    message: 'Unauthorized',
                    description: res.message,
                })
            }
        };

        fetchUser();
    }, []);

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'ROLE',
            dataIndex: 'role',
        },
    ];

    return (
        <div className={cx('table')}>
            <Table dataSource={dataSource} columns={columns} bordered rowKey={"_id"}></Table>
        </div>
    );
}

export default User;
