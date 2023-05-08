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
        <Button variant="info " id="all">
          <TiSortAlphabetically />
          All
        </Button>{" "}
      </Link>
      <Link to="/categories/family">
        <Button variant="info " id="family">
          <GiFamilyHouse />
          Family
        </Button>{" "}
      </Link>
      <Link to="/categories/fitness">
        <Button variant="info " id="fitness">
          <GiWeightLiftingUp />
          Fitness & Sports
        </Button>{" "}
      </Link>
      <Link to="/categories/pet">
        <Button variant="info " id="pet">
          <GiSittingDog />
          Pet Supplies
        </Button>{" "}
      </Link>
      <Link to="/categories/office">
        <Button variant="info " id="office">
          <GiOfficeChair />
          Office Products
        </Button>{" "}
      </Link>
      <Link to="/categories/furniture">
        <Button variant="info " id="furniture">
          <GiSofa />
          Furniture
        </Button>{" "}
      </Link>
      <Link to="/categories/car">
        <Button variant="info " id="car">
          <GiSteeringWheel />
          Vehicles
        </Button>{" "}
      </Link>
      <Link to="/categories/phone">
        <Button variant="info " id="phone">
          <GiConsoleController />
          Electronics
        </Button>{" "}
      </Link>

      <Link to="/categories/clothing">
        <Button variant="info  " id="clothing">
          <GiPoloShirt />
          Clothing & Accessories
        </Button>{" "}
      </Link>
      <Link to="/categories/hobbies">
        <Button variant="info  " id="hobbies">
          <GiSoccerBall />
          Hobbies
        </Button>{" "}
      </Link>
      <Link to="/categories/garden">
        <Button variant="info   " id="garden">
          <GiSunflower />
          Garden
        </Button>{" "}
      </Link>
    </div>
  );
}

export default CategoriesNav;
