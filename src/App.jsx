import { useReducer } from 'react'
import '~/App.css'
import SplitterLogo from '~/assets/logo.svg?react'
import FormControl from '~/components/FormControl/FormControl'
import RadioControl from '~/components/RadioControl/RadioControl'

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
      <main id="calculator" className="container">
        <form id="tip-calculator" className="splitter-form">
          <FormControl
            error={state.billAmountError}
            inputIcon="currency"
            inputMode="decimal"
            inputName="bill-amount"
            inputValue={state.billAmount}
            labelText="Bill"
            onInputChange={onBillAmountChange}
          />
          <fieldset className="tip-selections">
            <legend className="legend">Select Tip %</legend>
            {[5, 10, 15, 25, 50].map((value, index) => (
              <RadioControl
                inputChecked={state.tipPercent === value.toString()}
                inputLabel={`${value}%`}
                inputName="tip-percent"
                inputValue={value.toString()}
                key={index}
                onInputChange={onTipPercentChange}
              />
            ))}
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
          <FormControl
            error={state.numberOfPeopleError}
            inputIcon="people"
            inputMode="numeric"
            inputName="num-people"
            inputValue={state.numberOfPeople}
            labelText="Number of People"
            onInputChange={onNumberOfPeopleChange}
          />
        </form>
        <div className="splitter-results">
          <div className="tip-result-data">
            <div className="result-label">
              <p className="title">Tip Amount</p>
              <p className="subtitle">/ person</p>
            </div>
            <div className="result-value">
              <p data-testid="tip-per-person">{state.tipPerPerson}</p>
            </div>
          </div>
          <div className="total-result-data">
            <div className="result-label">
              <p className="title">Total</p>
              <p className="subtitle">/ person</p>
            </div>
            <div className="result-value">
              <p data-testid="total-per-person">
                {state.totalPerPersonWithTip}
              </p>
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
      </main>
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
    maximumFractionDigits: 2,
  }).format(number)
}

/**
 * Calculate tip and total per person.
 *
 * @param {Object} state The current state of the application.
 * @returns {Object} The new state of the application.
 */
function calculateTip(state) {
  const { billAmount, tipPercent, customTipPercent, numberOfPeople } = state

  if (!billAmount || !tipPercent || !numberOfPeople) {
    // Validate inputs, for conditions that cause errors.
    if (billAmount !== '' && Number(billAmount) <= 0) {
      state = { ...state, billAmountError: "Can't be zero." }
    } else if (isNaN(Number(billAmount))) {
      state = { ...state, billAmount: '' }
    } else {
      state = { ...state, billAmountError: '' }
    }

    if (tipPercent !== customTipPercent) {
      state = { ...state, customTipPercent: '' }
    } else if (customTipPercent !== '' && Number(customTipPercent) > 100) {
      state = { ...state, customTipPercent: '100', tipPercent: '100' }
    } else if (
      isNaN(Number(customTipPercent)) ||
      customTipPercent.includes('.') ||
      (customTipPercent !== '' && Number(customTipPercent) < 0)
    ) {
      state = { ...state, customTipPercent: '', tipPercent: '' }
    }

    if (numberOfPeople !== '' && Number(numberOfPeople) <= 0) {
      state = { ...state, numberOfPeopleError: "Can't be zero." }
    } else if (isNaN(Number(numberOfPeople))) {
      state = { ...state, numberOfPeople: '' }
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
