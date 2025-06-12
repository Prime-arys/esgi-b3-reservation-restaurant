import Categorie from "../components/Menu/Categorie/Categorie";
import "./Menu.css";

// eslint-disable-next-line no-unused-vars
const Menu = (...otherProps) => {
  return (
    <div className="menu">
      <h1>Menu</h1>
      <div className="categories">
        <Categorie nom="Pizzas" plats={[
          { id: 1, nom: "Pizza Margherita", description: "Classic pizza with tomato and mozzarella", image: "/images/pizza-margherita.jpg", prix: 10.99 },
          { id: 2, nom: "Pizza Pepperoni", description: "Spicy pepperoni with cheese", image: "/images/pizza-pepperoni.jpg", prix: 12.99 },
        ]} />
        <Categorie nom="Salads" plats={[
          { id: 3, nom: "Caesar Salad", description: "Crispy romaine lettuce with Caesar dressing", image: "/images/caesar-salad.jpg", prix: 8.99 },
          { id: 4, nom: "Greek Salad", description: "Fresh vegetables with feta cheese and olives", image: "/images/greek-salad.jpg", prix: 9.99 },
        ]} />
      </div>
    </div>
  );
};

export default Menu;