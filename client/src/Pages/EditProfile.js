import { useEffect, useState } from "react";
import ActiveSells from "../components/Profile/Sells/ActiveSells";
import { getUser, editUserProfile } from "../services/userData";
import {
  Col,
  Row,
  Button,
  OverlayTrigger,
  Tooltip,
  Spinner,
  Alert,
} from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail, MdPhoneAndroid } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { AiFillCloseSquare } from "react-icons/ai";

function EditProfile({ history }) {
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [alertShow, setAlertShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getUser()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, [setUser]);

  const handleDiscard = () => {
    history.push(`/profile/${user._id}`);
  };
  const handleChanges = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
    if (e.target.files) {
      setUser({ ...user, avatar: e.target.files[0] });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let { _id, name, phoneNumber, email, avatar } = user;
    let obj = { name, phoneNumber, email };
    setLoading(true);
    if (typeof avatar == "object") {
      getBase64(avatar)
        .then((data) => {
          obj["avatar"] = data;
          editUserProfile(_id, obj)
            .then((res) => {
              if (!res.error) {
                history.push(`/profile/${_id}`);
              } else {
                setLoading(false);
                setError(res.error);
                setAlertShow(true);
              }
            })
            .catch((err) => console.error("edit profile err: ", err));
        })
        .catch((err) => console.log("base64 error: ", err));
    } else {
      editUserProfile(_id, obj)
        .then((res) => {
          if (!res.error) {
            history.push(`/profile/${_id}`);
          } else {
            setLoading(false);
            setError(res.error);
            setAlertShow(true);
          }
        })
        .catch((err) => console.error("edit profile err: ", err));
    }
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <>
      <div>
        <div className="container">
          <form>
            {alertShow && (
              <Alert
                variant="danger"
                onClose={() => setAlertShow(false)}
                dismissible
              >
                <p>{error}</p>
              </Alert>
            )}
            <Row>
              <Col>
                <label htmlFor="file-upload" className="custom-file-upload">
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Click to select a photo</Tooltip>}
                  >
                    <img id="avatar" src={user.avatar} alt="user-avatar" />
                  </OverlayTrigger>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  name="avatar"
                  onChangeCapture={handleChanges}
                />
              </Col>
              <Col>
                <p>
                  <BsFillPersonFill />{" "}
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChanges}
                    required
                  />
                </p>
                <p>
                  <MdEmail />{" "}
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChanges}
                    required
                  />
                </p>
                <p>
                  <MdPhoneAndroid />{" "}
                  <input
                    type="text"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleChanges}
                    required
                  />
                </p>
              </Col>
              <Col lg={2} id="edit-profile-icons">
                {loading ? (
                  <Spinner animation="border" />
                ) : (
                  <>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip> Save</Tooltip>}
                    >
                      <span onClick={handleSave}>
                        <TiTick />
                      </span>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip>Discard</Tooltip>}
                    >
                      <span onClick={handleDiscard}>
                        <AiFillCloseSquare />
                      </span>
                    </OverlayTrigger>
                  </>
                )}
              </Col>
            </Row>
          </form>
        </div>
      </div>
      <div className="container">
        <Row>
          <Col id="aside">
            <Button disabled variant="dark" id="active-sells">
              Active Sells
            </Button>{" "}
            <Button disabled variant="dark" id="archived-sells">
              Archived
            </Button>{" "}
            <Button disabled variant="dark" id="wishlist">
              Wishlist
            </Button>{" "}
          </Col>
          <Col lg={10} sm={12} disabled>
            <ActiveSells params={user} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EditProfile;
