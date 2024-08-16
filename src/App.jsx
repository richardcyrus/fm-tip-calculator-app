import '~/App.css'
import splitterLogo from '~/assets/logo.svg'

function App() {
  return (
    <>
      <header className="logo-container">
        <img src={splitterLogo} className="logo splitter" alt="Splitter logo" />
      </header>
      <div id="calculator" className="container">
        <form action="" method="post" id="tip-calculator">
          <div className="splitter-inputs">
            <div className="form-control">
              <label htmlFor="bill-amount">Bill</label>
              <input
                type="text"
                name="bill-amount"
                id="bill-amount"
                inputMode="decimal"
                title="Bill amount"
                placeholder="0"
              />
            </div>
            <div>
              <fieldset>
                <legend>Select Tip %</legend>
                <label>
                  <input
                    type="radio"
                    name="tip-pct"
                    id="five-percent"
                    value="5"
                  />
                  5%
                </label>
                <label>
                  <input
                    type="radio"
                    name="tip-percent"
                    id="ten-percent"
                    value="10"
                  />
                  10%
                </label>
                <label>
                  <input
                    type="radio"
                    name="tip-percent"
                    id="fifteen-percent"
                    value="15"
                  />
                  15%
                </label>
                <label>
                  <input
                    type="radio"
                    name="tip-percent"
                    id="twentyfive-percent"
                    value="25"
                  />
                  25%
                </label>
                <label>
                  <input
                    type="radio"
                    name="tip-percent"
                    value="50"
                    id="fifty-percent"
                  />
                  50%
                </label>
                <label>
                  <input
                    type="text"
                    name="tip-percent"
                    id="custom-percent"
                    placeholder="Custom"
                  />
                  <span>Custom</span>
                </label>
              </fieldset>
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
              />
            </div>
          </div>
        </form>
        <div className="splitter-results">
          <div className="result-data">
            <div className="result-label">
              <p>Tip Amount</p>
              <p>/ person</p>
            </div>
            <div className="result-value">
              <p>$0.00</p>
            </div>
          </div>
          <div className="result-data">
            <div className="result-label">
              <p>Total</p>
              <p>/ person</p>
            </div>
            <div className="result-value">
              <p>$0.00</p>
            </div>
          </div>
          <div className="form-control">
            <button type="reset" form="tip-calculator">
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
