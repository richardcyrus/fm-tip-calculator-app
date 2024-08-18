import '~/App.css'
import SplitterLogo from '~/assets/logo.svg?react'

function App() {
  return (
    <>
      <header className="logo-container">
        <SplitterLogo className="logo splitter" />
        <h1 className="sr-only">Splitter</h1>
      </header>
      <div id="calculator" className="container">
        <form
          action=""
          method="post"
          id="tip-calculator"
          className="splitter-form"
        >
          <div className="form-control">
            <label htmlFor="bill-amount">Bill</label>
            <input
              className="input currency"
              id="bill-amount"
              inputMode="decimal"
              name="bill-amount"
              pattern="[^0][0-9]*[.,]?[0-9]*"
              placeholder="0"
              required
              title="Bill amount"
              type="text"
            />
            <div className="invalid-feedback">Can&apos;t be zero</div>
          </div>
          <fieldset className="tip-selections">
            <legend className="legend">Select Tip %</legend>
            <label htmlFor="five-percent" className="radio-control">
              <input
                id="five-percent"
                name="tip-percent"
                type="radio"
                value="5"
              />
              5%
            </label>
            <label htmlFor="ten-percent" className="radio-control">
              <input
                id="ten-percent"
                name="tip-percent"
                type="radio"
                value="10"
              />
              10%
            </label>
            <label htmlFor="fifteen-percent" className="radio-control">
              <input
                id="fifteen-percent"
                name="tip-percent"
                type="radio"
                value="15"
              />
              15%
            </label>
            <label htmlFor="twentyfive-percent" className="radio-control">
              <input
                id="twentyfive-percent"
                name="tip-percent"
                type="radio"
                value="25"
              />
              25%
            </label>
            <label htmlFor="fifty-percent" className="radio-control">
              <input
                id="fifty-percent"
                name="tip-percent"
                type="radio"
                value="50"
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
              />
              <label htmlFor="custom-percent" className="sr-only">
                Custom
              </label>
            </div>
          </fieldset>
          <div className="form-control">
            <label htmlFor="num-people">Number of People</label>
            <input
              className="input people"
              id="num-people"
              inputMode="numeric"
              name="num-people"
              pattern="^[^0][0-9]*"
              placeholder="0"
              required
              title="Number of people"
              type="text"
            />
            <div className="invalid-feedback">Can&apos;t be zero</div>
          </div>
        </form>
        <div className="splitter-results">
          <div className="tip-result-data">
            <div className="result-label">
              <p className="title">Tip Amount</p>
              <p className="subtitle">/ person</p>
            </div>
            <div className="result-value">
              <p>$0.00</p>
            </div>
          </div>
          <div className="total-result-data">
            <div className="result-label">
              <p className="title">Total</p>
              <p className="subtitle">/ person</p>
            </div>
            <div className="result-value">
              <p>$0.00</p>
            </div>
          </div>
          <div className="control">
            <button
              className="button btn-reset"
              form="tip-calculator"
              type="reset"
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
