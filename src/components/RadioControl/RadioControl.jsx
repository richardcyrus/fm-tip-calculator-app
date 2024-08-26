import PropTypes from 'prop-types'
import { useId } from 'react'

/**
 * A reusable radio control component that renders a radio input field with a label.
 *
 * @param {object} props - The component props
 * @param {string} props.inputLabel - The text to display as the label
 * @param {string} props.inputName - The name attribute of the input field
 * @param {string} props.inputValue - The value attribute of the input field
 * @param {function} props.onInputChange - The callback function for input changes
 * @param {boolean} props.inputChecked - Whether the radio input is checked
 * @return {JSX.Element} The rendered radio control component
 */
function RadioControl({
  inputLabel,
  inputName,
  inputValue,
  onInputChange,
  inputChecked,
}) {
  const id = useId()
  return (
    <label htmlFor={id} className="radio-control">
      <input
        id={id}
        name={inputName}
        type="radio"
        value={inputValue}
        checked={inputChecked}
        onChange={onInputChange}
      />
      {inputLabel}
    </label>
  )
}

RadioControl.propTypes = {
  inputLabel: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  inputChecked: PropTypes.bool,
}

export default RadioControl
