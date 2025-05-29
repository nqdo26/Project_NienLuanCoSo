import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';

function DeleteConfirm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteProductApi(id)
            .then(() => {
                navigate('/productmanage');
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const showConfirm = () => {
        Modal.confirm({
            title: 'Are you sure you want to delete this product?',
            onOk: handleDelete,
            onCancel() {
                navigate('/productmanage'); 
            },
        });
    };

    React.useEffect(() => {
        showConfirm();
    }, []);

    return null; 
}

export default DeleteConfirm;
