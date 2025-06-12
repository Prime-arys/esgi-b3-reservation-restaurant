import Categorie from "../components/Menu/Categorie/Categorie";
import { getPlatsInfo } from "../api/PlatsInfo";
import "./Menu.css";
import { useQuery } from "@tanstack/react-query";

// eslint-disable-next-line no-unused-vars
const Menu = (...otherProps) => {
  const {isPending, data: plats} = useQuery({
    queryKey: ["plats"],
    queryFn: getPlatsInfo,
    refetchOnWindowFocus: false,
  });

  if (isPending) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="menu">
      <h1>Menu</h1>
      <div className="categories">
        <Categorie nom="ENTREES" plats={plats.filter(plat => plat.category === "APPETIZER")} />
        <Categorie nom="PLATS PRINCIPAUX" plats={plats.filter(plat => plat.category === "MAIN")} />
        <Categorie nom="DESSERTS" plats={plats.filter(plat => plat.category === "DESSERT")} />
        <Categorie nom="BOISSONS" plats={plats.filter(plat => plat.category === "BEVERAGE")} />
        <Categorie nom="SPECIAL" plats={plats.filter(plat => plat.category === "SPECIAL")} />
      </div>
    </div>
  );
};

export default Menu;