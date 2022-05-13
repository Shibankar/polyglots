import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const CustomModal = ({showModal, setShowModal, title, body, onSave, showFooter=false}) => {
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {body}
            </Modal.Body>

            {showFooter && <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                <Button variant="primary" onClick={onSave}>Save changes</Button>
            </Modal.Footer>}
        </Modal>
    );
};