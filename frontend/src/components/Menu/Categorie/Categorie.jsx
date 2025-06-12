import PropTypes from 'prop-types';
import Plat from '../Plat/Plat';
import './Categorie.css';
const Categorie = ({ nom, plats, ...otherProps}) => {
    return (
        <div className="categorie">
            <h2>{nom}</h2>
            <div className="plats">
                {plats.map((plat) => (
                    <Plat key={plat.id} {...plat} />
                ))}
            </div>
        </div>
    );
};

Categorie.propTypes = {
    nom: PropTypes.string.isRequired,
    plats: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        nom: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        prix: PropTypes.number.isRequired,
    })).isRequired,
};

export default Categorie;