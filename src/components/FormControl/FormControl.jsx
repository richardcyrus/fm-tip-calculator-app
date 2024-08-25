import PropTypes from 'prop-types'
import { useId } from 'react'

/**
 * A reusable form control component that renders a label and an input field.
 * The input field can display an error message and has a dynamic input icon.
 *
 * @param {object} props - The component props
 * @param {string} props.labelText - The text to display as the label
 * @param {string} props.error - The error message to display (if any)
 * @param {string} props.inputName - The name attribute of the input field
 * @param {string} props.inputValue - The value attribute of the input field
 * @param {function} props.onInputChange - The callback function for input changes
 * @param {string} props.inputIcon - The CSS class for the input icon
 * @param {string} props.inputMode - The input mode for the input field
 * @return {JSX.Element} The rendered form control component
 */
function FormControl({
  labelText,
  error,
  inputName,
  inputValue,
  onInputChange,
  inputIcon,
  inputMode,
}) {
  const id = useId()

  return (
    <div className="form-control">
      <label htmlFor={id}>{labelText}</label>
      <input
        className={`input ${inputIcon} ${error ? 'invalid' : ''}`}
        id={id}
        inputMode={inputMode}
        name={inputName}
        placeholder="0"
        required
        type="text"
        value={inputValue}
        onChange={onInputChange}
      />
      {error !== '' ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  )
}

FormControl.propTypes = {
  labelText: PropTypes.string.isRequired,
  error: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  inputIcon: PropTypes.string,
  inputMode: PropTypes.string,
}

export default FormControl
