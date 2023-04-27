import { useState } from "react";
import ActiveSells from "./Sells/ActiveSells";
import { Col, Row, Button, Form, Modal } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail, MdPhoneAndroid } from "react-icons/md";
import { FaSellsy } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { createChatRoom } from "../../services/messagesData";
//Gather seller profile data
function SellerProfile({ params, history }) {
  const [showMsg, setShowMdg] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = () => setShowMdg(false);
  const handleShow = () => setShowMdg(true);
  //Handling messages
  const handleMsgChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };
  const onMsgSent = (e) => {
    e.preventDefault();
    createChatRoom(params._id, message)
      .then((res) => {
        history.push(`/messages`);
      })
      .catch((err) => console.log(err));
  };
  return (
    //Seller information and button to contact seller.
    <>
      <div id="profile-head">
        <div className="container">
          <Row className="profile-row">
            <img id="avatar" alt="avatar" src={params.avatar} />

            <Col lg={2} md={2} sm={2}>
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
                <FaSellsy /> {params.totalSells} sells
              </p>
            </Col>
            <Col lg={3}>
              <Button
                variant="primary"
                className="col-lg-8"
                id="btnContact"
                onClick={handleShow}
              >
                <RiMessage3Fill />
                Contact Seller
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <div className="container">
        <Row>
          <Col lg={12}>
            <ActiveSells params={params} />
          </Col>
        </Row>
      </div>
      <Modal show={showMsg} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                as="textarea"
                name="textarea"
                onChange={handleMsgChange}
                rows={4}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onMsgSent}>
            Send
          </Button>
          <Button variant="danger " onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SellerProfile;
