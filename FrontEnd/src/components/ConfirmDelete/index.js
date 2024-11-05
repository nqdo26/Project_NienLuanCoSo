import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';

function DeleteConfirm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {
        // Gọi API để xóa sản phẩm dựa trên ID
        // Giả sử bạn có một hàm gọi API tên là deleteProductApi
        deleteProductApi(id)
            .then(() => {
                // Sau khi xóa thành công, chuyển hướng về trang productmanage
                navigate('/productmanage');
            })
            .catch((error) => {
                console.error("Có lỗi xảy ra khi xóa sản phẩm:", error);
            });
    };

    const showConfirm = () => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa sản phẩm này không?',
            onOk: handleDelete,
            onCancel() {
                navigate('/productmanage'); // Nếu không, quay lại trang quản lý sản phẩm
            },
        });
    };

    React.useEffect(() => {
        showConfirm();
    }, []);

    return null; // Không cần render gì trong trang này
}

export default DeleteConfirm;
