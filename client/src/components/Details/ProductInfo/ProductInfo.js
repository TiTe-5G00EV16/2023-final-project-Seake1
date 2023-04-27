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
      <Image className="" src={params.image} rounded />
      <Row>
        <h1 className="  product-info-heading">{params.title}</h1>
        <span
          id="heartIconDetails"
          className=" col-sm-1"
          onClick={onHearthClick}
        >
          {params.isAuth && (
            <>
              {!wish ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Add to Wishlist</Tooltip>}
                >
                  <BsHeart />
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Remove from Wishlist</Tooltip>}
                >
                  <BsHeartFill />
                </OverlayTrigger>
              )}
            </>
          )}
        </span>
      </Row>
      <div id="detailsCardText" className="col-lg-12">
        <Tabs defaultActiveKey="details" transition={false}>
          <Tab eventKey="details" title="Details" id="tab-details">
            {params.description}
            <hr />
            <p id="details-footer" className="text-muted">
              Product listed at {params.addedAt}
            </p>
          </Tab>
          {}
        </Tabs>
      </div>
    </>
  );
}

export default ProductInfo;
