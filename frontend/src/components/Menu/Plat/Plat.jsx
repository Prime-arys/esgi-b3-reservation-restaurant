import PropTypes from 'prop-types';
import "./Plat.css"

const Plat = ({ name, description, price, ...otherProps }) => {
    return (
        <div className="plat">
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Prix: {price} €</p>
        </div>
    );
};

Plat.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Plat;