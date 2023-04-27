import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
//Bringin product information.
function ProductCard({ params }) {
  return (
    <Card>
      <Link to={`/categories/${params.category}/${params._id}/details`}>
        <Card.Img variant="top" src={params.image} />
        <Card.Body>
          <Card.Title>{params.title}</Card.Title>
          <Card.Text>{params.price.toFixed(2)}€</Card.Text>
        </Card.Body>
      </Link>
      <Card.Footer>
        <Moment format="d MMM YYYY HH:mm">{params.addedAt}</Moment>-{" "}
        <strong>{params.city}</strong>
      </Card.Footer>
    </Card>
  );
}

export default ProductCard;
