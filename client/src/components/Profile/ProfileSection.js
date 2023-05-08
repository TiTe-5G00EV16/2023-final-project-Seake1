import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail, MdPhoneAndroid } from "react-icons/md";
import { FaSellsy } from "react-icons/fa";
import { BiMessageAltEdit } from "react-icons/bi";
//Setting data on profile page.
function ProfileSection({ params }) {
  return (
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
          <span id="edit-icon">
            <Link to={`/profile/${params._id}/edit`}>
              <BiMessageAltEdit />
            </Link>
          </span>
        </Row>
      </div>
    </div>
  );
}

export default ProfileSection;
