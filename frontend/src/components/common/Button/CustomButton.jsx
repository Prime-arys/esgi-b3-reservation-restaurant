import PropTypes from 'prop-types';

const CustomButton = ({ buttonText = "Click Me", onClick, disabled = false, ...otherProps }) => {
  return (
    <button 
      className="custom-button" 
      onClick={onClick} 
      disabled={disabled}
      {...otherProps}
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
