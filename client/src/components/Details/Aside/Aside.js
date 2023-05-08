import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  RiMessage2Fill,
  RiInboxArchiveFill,
  RiEdit2Fill,
} from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail, MdPhoneAndroid } from "react-icons/md";
import { FaSellsy } from "react-icons/fa";
import { archiveSell } from "../../../services/productData";
import { createChatRoom } from "../../../services/messagesData";
import "./Aside.css";
//Handling archieving items and messages
function Aside({ params, history }) {
  const [showMsg, setShowMdg] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = () => setShowMdg(false);
  const handleShow = () => setShowMdg(true);
  const handleCloseArchive = () => setShowArchive(false);
  const handleShowArchive = () => setShowArchive(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    archiveSell(params._id)
      .then((res) => {
        setShowArchive(false);
        history.push(`/profile/${params.seller}`);
      })
      .catch((err) => console.log(err));
  };

  const handleMsgChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };
  const onMsgSent = (e) => {
    e.preventDefault();
    createChatRoom(params.sellerId, message)
      .then((res) => {
        history.push(`/messages/${res.messageId}`);
      })
      .catch((err) => console.log(err));
  };
  // Contacting the sellet via message if logged in.
  return (
    <aside>
      <div className="product-details-seller">
        <div>
          {params.isSeller && (
            <>
              <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                <span id="edit-icon">
                  <Link
                    to={`/categories/${params.category}/${params._id}/edit`}
                  >
                    <RiEdit2Fill />
                  </Link>
                </span>
              </OverlayTrigger>
              <OverlayTrigger overlay={<Tooltip>Archive</Tooltip>}>
                <span id="archive-icon" onClick={handleShowArchive}>
                  <RiInboxArchiveFill />
                </span>
              </OverlayTrigger>
            </>
          )}
          {params.price && (
            <h1 id="price-heading">{params.price.toFixed(2)}€</h1>
          )}
        </div>
        {params.isAuth ? (
          <>
            {!params.isSeller && (
              <Button
                variant="primary "
                className="col-sm-4"
                id="btnContact"
                onClick={handleShow}
              >
                Contact Seller
                <RiMessage2Fill />
              </Button>
            )}
            <Link to={`/profile/${params.sellerId}`}>
              <Col lg={12}>
                <img id="avatar" src={params.avatar} alt="user-avatar" />
              </Col>
              <Col lg={12}>
                <p>
                  <BsFillPersonFill /> {params.name}
                </p>
                <p>
                  <MdEmail /> {params.email}
                </p>
                <p>
                  <MdPhoneAndroid /> {params.phoneNumber}
                </p>
                <p>
                  <FaSellsy /> {params.createdSells} total sells
                </p>
              </Col>
            </Link>
          </>
        ) : (
          <p id="guest-msg">
            <Link to="/auth/login">Sign In</Link> to contact the seller!
          </p>
        )}
      </div>
      <Modal show={showMsg} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control as="textarea" onChange={handleMsgChange} rows={3} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary " onClick={onMsgSent}>
            Send
          </Button>
          <Button variant="dark  " onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showArchive} onHide={handleCloseArchive}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to archive this item?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Archive
          </Button>
          <Button variant="dark " onClick={handleCloseArchive}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </aside>
  );
}

export default Aside;
