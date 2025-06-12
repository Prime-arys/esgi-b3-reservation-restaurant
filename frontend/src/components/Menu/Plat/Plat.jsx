import PropTypes from 'prop-types';
import "./Plat.css"

const Plat = ({ nom, description, image, prix, ...otherProps }) => {
    return (
        <div className="plat">
            <h2>{nom}</h2>
            <img src={image} alt={nom} sizes='(max-width: 600px) 100vw, 600px' />
            <p>{description}</p>
            <p>Prix: {prix} €</p>
        </div>
    );
};

Plat.propTypes = {
  nom: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  prix: PropTypes.number.isRequired,
};

export default Plat;