import PropTypes from 'prop-types';

const InputField = ({ inputType="text", placeholder="Enter text here..."}) => {
  return (
    <div className="input-field">
      <input type={inputType} placeholder={placeholder} />
    </div>
  );
};

InputField.propTypes = {
    placeholder: PropTypes.string,
    inputType: PropTypes.string,
}

export default InputField;
