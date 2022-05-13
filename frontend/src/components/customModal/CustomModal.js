import Modal from 'react-bootstrap/Modal';

export const CustomModal = ({showModal, setShowModal, title, body, largeSize=false}) => {
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} size={largeSize? "lg" : "default"} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {body}
            </Modal.Body>
        </Modal>
    );
};