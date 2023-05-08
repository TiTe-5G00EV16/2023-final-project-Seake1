import { useState, useEffect } from "react";
import {
  Row,
  Tabs,
  Tab,
  Image,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { wishProduct } from "../../../services/productData";
//Setting the product information
function ProductInfo({ params }) {
  const [wish, setWish] = useState(false);

  useEffect(() => {
    if (params.isWished === true) {
      setWish(true);
    } else {
      setWish(false);
    }
  }, [params.isWished, setWish]);

  const onHearthClick = () => {
    if (wish === false) {
      wishProduct(params._id)
        .then((res) => {
          setWish(true);
        })
        .catch((err) => console.log(err));
    } else {
      wishProduct(params._id)
        .then((res) => {
          setWish(false);
        })
        .catch((err) => console.log(err));
    }
  };
  //Changing the heart icon depending if user wishlisted the item or not.
  return (
    <>
      <Image src={params.image} />
      <Row>
        <h1 className="col-sm-12">{params.title}</h1>
        <span id="heartIconDetails" className=" col-lg" onClick={onHearthClick}>
          {params.isAuth && (
            <>
              {!wish ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Wishlist</Tooltip>}
                >
                  <BsHeart />
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Remove Wishlist</Tooltip>}
                >
                  <BsHeartFill />
                </OverlayTrigger>
              )}
            </>
          )}
        </span>
      </Row>
      <div id="detailsCardText">
        <Tabs defaultActiveKey="details">
          <Tab eventKey="details">
            {params.description}
            <hr />
            <p id="details-footer">Product listed at {params.addedAt}</p>
          </Tab>
          {}
        </Tabs>
      </div>
    </>
  );
}

export default ProductInfo;
