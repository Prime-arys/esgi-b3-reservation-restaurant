import PropTypes from 'prop-types';

const CustomButton = ({ buttonText = "Click Me", onClick, disabled = false }) => {
  return (
    <button 
      className="custom-button" 
      onClick={onClick} 
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

CustomButton.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CustomButton;
