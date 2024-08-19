import { useReducer } from 'react'
import '~/App.css'
import SplitterLogo from '~/assets/logo.svg?react'

function App() {
  const [state, dispatch] = useReducer(calculateTipReducer, initialState)

  const onBillAmountChange = (e) => {
    dispatch({ type: 'SET_BILL_AMOUNT', payload: e.target.value })
  }

  const onTipPercentChange = (e) => {
    dispatch({ type: 'SET_TIP_PERCENT', payload: e.target.value })
  }

  const onCustomTipPercentChange = (e) => {
    dispatch({ type: 'SET_CUSTOM_TIP_PERCENT', payload: e.target.value })
  }

  const onNumberOfPeopleChange = (e) => {
    dispatch({ type: 'SET_NUMBER_OF_PEOPLE', payload: e.target.value })
  }

  const onReset = () => {
    dispatch({ type: 'RESET' })
  }

  return (
    <>
      <header className="logo-container">
        <SplitterLogo className="logo splitter" />
        <h1 className="sr-only">Splitter</h1>
      </header>
      <div id="calculator" className="container">
        <form id="tip-calculator" className="splitter-form">
          <div className="form-control">
            <label htmlFor="bill-amount">Bill</label>
            <input
              className={`input currency ${state.billAmountError && 'invalid'}`}
              id="bill-amount"
              inputMode="decimal"
              name="bill-amount"
              placeholder="0"
              required
              title="Bill amount"
              type="text"
              value={state.billAmount}
              onChange={onBillAmountChange}
            />
            {state.billAmountError !== '' ? (
              <div className="invalid-feedback">{state.billAmountError}</div>
            ) : null}
          </div>
          <fieldset className="tip-selections">
            <legend className="legend">Select Tip %</legend>
            <label htmlFor="five-percent" className="radio-control">
              <input
                id="five-percent"
                name="tip-percent"
                type="radio"
                value="5"
                checked={state.tipPercent === '5'}
                onChange={onTipPercentChange}
              />
              5%
            </label>
            <label htmlFor="ten-percent" className="radio-control">
              <input
                id="ten-percent"
                name="tip-percent"
                type="radio"
                value="10"
                checked={state.tipPercent === '10'}
                onChange={onTipPercentChange}
              />
              10%
            </label>
            <label htmlFor="fifteen-percent" className="radio-control">
              <input
                id="fifteen-percent"
                name="tip-percent"
                type="radio"
                value="15"
                checked={state.tipPercent === '15'}
                onChange={onTipPercentChange}
              />
              15%
            </label>
            <label htmlFor="twentyfive-percent" className="radio-control">
              <input
                id="twentyfive-percent"
                name="tip-percent"
                type="radio"
                value="25"
                checked={state.tipPercent === '25'}
                onChange={onTipPercentChange}
              />
              25%
            </label>
            <label htmlFor="fifty-percent" className="radio-control">
              <input
                id="fifty-percent"
                name="tip-percent"
                type="radio"
                value="50"
                checked={state.tipPercent === '50'}
                onChange={onTipPercentChange}
              />
              50%
            </label>
            <div className="input-tip">
              <input
                id="custom-percent"
                inputMode="numeric"
                name="custom-tip-percent"
                placeholder="Custom"
                type="text"
                value={state.customTipPercent}
                onChange={onCustomTipPercentChange}
              />
              <label htmlFor="custom-percent" className="sr-only">
                Custom tip percentage, enter as whole number.
              </label>
            </div>
          </fieldset>
          <div className="form-control">
            <label htmlFor="num-people">Number of People</label>
            <input
              className={`input people ${state.numberOfPeopleError && 'invalid'}`}
              id="num-people"
              inputMode="numeric"
              name="num-people"
              placeholder="0"
              required
              title="Number of people"
              type="text"
              value={state.numberOfPeople}
              onChange={onNumberOfPeopleChange}
            />
            {state.numberOfPeopleError !== '' ? (
              <div className="invalid-feedback">
                {state.numberOfPeopleError}
              </div>
            ) : null}
          </div>
        </form>
        <div className="splitter-results">
          <div className="tip-result-data">
            <div className="result-label">
              <p className="title">Tip Amount</p>
              <p className="subtitle">/ person</p>
            </div>
            <div className="result-value">
              <p>{state.tipPerPerson}</p>
            </div>
          </div>
          <div className="total-result-data">
            <div className="result-label">
              <p className="title">Total</p>
              <p className="subtitle">/ person</p>
            </div>
            <div className="result-value">
              <p>{state.totalPerPersonWithTip}</p>
            </div>
          </div>
          <div className="control">
            <button
              className="button btn-reset"
              form="tip-calculator"
              type="button"
              disabled={state.isNew}
              onClick={onReset}
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

const initialState = {
  billAmount: '',
  tipPercent: '',
  customTipPercent: '',
  numberOfPeople: '',
  tipPerPerson: '$0.00',
  totalPerPersonWithTip: '$0.00',
  isNew: true,
  billAmountError: '',
  numberOfPeopleError: '',
}

/**
 * Reducer to calculate tip and total per person.
 *
 * @param {Object} state The current state of the application.
 * @param {Object} action The action to take.
 * @returns {Object} The new state of the application.
 */
function calculateTipReducer(state, action) {
  switch (action.type) {
    case 'SET_BILL_AMOUNT': {
      return calculateTip({
        ...state,
        billAmount: action.payload,
      })
    }
    case 'SET_TIP_PERCENT': {
      return calculateTip({
        ...state,
        tipPercent: action.payload,
      })
    }
    case 'SET_CUSTOM_TIP_PERCENT': {
      return calculateTip({
        ...state,
        tipPercent: action.payload,
        customTipPercent: action.payload,
      })
    }
    case 'SET_NUMBER_OF_PEOPLE': {
      return calculateTip({
        ...state,
        numberOfPeople: action.payload,
      })
    }
    case 'RESET': {
      return initialState
    }
    default: {
      throw new Error('Unhandled action type: ' + action.type)
    }
  }
}

/**
 * Format a number as currency.
 *
 * @param {number} number The number to format.
 * @returns {string} The formatted string.
 */
function formatCurrency(number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(number)
}

/**
 * Calculate tip and total per person.
 *
 * @param {Object} state The current state of the application.
 * @returns {Object} The new state of the application.
 */
function calculateTip(state) {
  const { billAmount, tipPercent, numberOfPeople } = state

  if (!billAmount || !tipPercent || !numberOfPeople) {
    // Validate inputs, for conditions that cause errors.
    if (billAmount !== '' && billAmount <= 0) {
      state = { ...state, billAmountError: "Can't be zero or less." }
    } else {
      state = { ...state, billAmountError: '' }
    }

    if (numberOfPeople !== '' && numberOfPeople <= 0) {
      state = { ...state, numberOfPeopleError: "Can't be zero or less." }
    } else {
      state = { ...state, numberOfPeopleError: '' }
    }

    return state
  }

  let billAmountFloat = parseFloat(billAmount)
  let tipPercentFloat = parseFloat(tipPercent) / 100
  let numberOfPeopleInt = parseInt(numberOfPeople, 10)

  // Guard against divide by zero error.
  if (billAmountFloat <= 0) {
    return { ...state, billAmountError: "Can't be zero or less." }
  }

  if (numberOfPeopleInt <= 0) {
    return { ...state, numberOfPeopleError: "Can't be zero or less." }
  }

  // Don't calculate unless values are greater than zero.
  if (billAmountFloat > 0 && numberOfPeopleInt > 0) {
    let tipPerPerson = (billAmountFloat * tipPercentFloat) / numberOfPeopleInt
    let totalPerPersonWithTip =
      billAmountFloat / numberOfPeopleInt + tipPerPerson

    return {
      ...state,
      isNew: false,
      tipPerPerson: formatCurrency(tipPerPerson),
      totalPerPersonWithTip: formatCurrency(totalPerPersonWithTip),
    }
  }

  // Always return state.
  return state
}
