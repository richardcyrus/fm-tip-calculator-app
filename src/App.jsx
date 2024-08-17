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
              type="text"
              name="bill-amount"
              id="bill-amount"
              inputMode="decimal"
              title="Bill amount"
              placeholder="0"
              className="input currency"
            />
          </div>
          <div>
            <h2 className="legend">Select Tip %</h2>
            <div className="tip-selections">
              <div>
                <input
                  type="radio"
                  name="tip-percent"
                  id="five-percent"
                  value="5"
                />
                <label htmlFor="five-percent" className="radio-control">
                  5%
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="tip-percent"
                  id="ten-percent"
                  value="10"
                />
                <label htmlFor="ten-percent" className="radio-control">
                  10%
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="tip-percent"
                  id="fifteen-percent"
                  value="15"
                />
                <label htmlFor="fifteen-percent" className="radio-control">
                  15%
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="tip-percent"
                  id="twentyfive-percent"
                  value="25"
                />
                <label htmlFor="twentyfive-percent" className="radio-control">
                  25%
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="tip-percent"
                  value="50"
                  id="fifty-percent"
                />
                <label htmlFor="fifty-percent" className="radio-control">
                  50%
                </label>
              </div>
              <div>
                <input
                  type="text"
                  name="custom-tip-percent"
                  id="custom-percent"
                  inputMode="numeric"
                  placeholder="Custom"
                  className="input-tip"
                />
                <label htmlFor="custom-percent">
                  <span className="sr-only">Custom</span>
                </label>
              </div>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="num-people">Number of People</label>
            <input
              type="text"
              name="num-people"
              id="num-people"
              inputMode="numeric"
              title="Number of people"
              placeholder="0"
              className="input people"
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
              type="reset"
              form="tip-calculator"
              className="button btn-reset"
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
