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
          </div>
          <fieldset className="tip-selections">
            <legend className="legend">Select Tip %</legend>
            <div className="radio-control">
              <input
                id="five-percent"
                name="tip-percent"
                type="radio"
                value="5"
              />
              <label htmlFor="five-percent">5%</label>
            </div>
            <div className="radio-control">
              <input
                id="ten-percent"
                name="tip-percent"
                type="radio"
                value="10"
              />
              <label htmlFor="ten-percent">10%</label>
            </div>
            <div className="radio-control">
              <input
                id="fifteen-percent"
                name="tip-percent"
                type="radio"
                value="15"
              />
              <label htmlFor="fifteen-percent">15%</label>
            </div>
            <div className="radio-control">
              <input
                id="twentyfive-percent"
                name="tip-percent"
                type="radio"
                value="25"
              />
              <label htmlFor="twentyfive-percent">25%</label>
            </div>
            <div className="radio-control">
              <input
                id="fifty-percent"
                name="tip-percent"
                type="radio"
                value="50"
              />
              <label htmlFor="fifty-percent">50%</label>
            </div>
            <div>
              <input
                className="input-tip"
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
            <div className="error">Can&apos;t be zero</div>
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
          <div className="form-control">
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
