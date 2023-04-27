import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Categories.css";
import {
  GiFamilyHouse,
  GiWeightLiftingUp,
  GiSittingDog,
  GiOfficeChair,
  GiSofa,
  GiSteeringWheel,
  GiConsoleController,
  GiPoloShirt,
  GiSoccerBall,
  GiSunflower,
} from "react-icons/gi";
import { TiSortAlphabetically } from "react-icons/ti";
//Creating all the categories for the home page and linking them.
function CategoriesNav() {
  return (
    <div className="container" id="categories">
      <Link to="/categories/all">
        <Button variant="dark" id="all">
          <TiSortAlphabetically />
          All
        </Button>{" "}
      </Link>
      <Link to="/categories/family">
        <Button variant="dark" id="family">
          <GiFamilyHouse />
          Family
        </Button>{" "}
      </Link>
      <Link to="/categories/fitness">
        <Button variant="dark" id="fitness">
          <GiWeightLiftingUp />
          Fitness & Sports
        </Button>{" "}
      </Link>
      <Link to="/categories/pet">
        <Button variant="dark" id="pet">
          <GiSittingDog />
          Pet Supplies
        </Button>{" "}
      </Link>
      <Link to="/categories/office">
        <Button variant="dark" id="office">
          <GiOfficeChair />
          Office Products
        </Button>{" "}
      </Link>
      <Link to="/categories/furniture">
        <Button variant="dark" id="furniture">
          <GiSofa />
          Furniture
        </Button>{" "}
      </Link>
      <Link to="/categories/car">
        <Button variant="dark" id="car">
          <GiSteeringWheel />
          Vehicles
        </Button>{" "}
      </Link>
      <Link to="/categories/phone">
        <Button variant="dark" id="phone">
          <GiConsoleController />
          Electronics
        </Button>{" "}
      </Link>

      <Link to="/categories/clothing">
        <Button variant="dark" id="clothing">
          <GiPoloShirt />
          Clothing & Accessories
        </Button>{" "}
      </Link>
      <Link to="/categories/hobbies">
        <Button variant="dark" id="hobbies">
          <GiSoccerBall />
          Hobbies
        </Button>{" "}
      </Link>
      <Link to="/categories/garden">
        <Button variant="dark" id="garden">
          <GiSunflower />
          Garden
        </Button>{" "}
      </Link>
    </div>
  );
}

export default CategoriesNav;
