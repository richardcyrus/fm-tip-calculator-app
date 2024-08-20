import { render, screen } from '@testing-library/react'
import App from '~/App'

describe('App when rendered', () => {
  it('should have an accessible heading', () => {
    render(<App />)
    expect(screen.getByText('Splitter')).toBeInTheDocument()
  })

  it('should have an input field with the label `Bill`', () => {
    render(<App />)
    expect(screen.getByLabelText('Bill')).toBeInTheDocument()
  })

  it('should have a selection of tip amounts with the label `Select Tip %`', () => {
    render(<App />)
    expect(
      screen.getByRole('group', { name: 'Select Tip %' })
    ).toBeInTheDocument()
  })

  it('should have an input field for a custom tip percentage', () => {
    render(<App />)
    expect(screen.getByPlaceholderText('Custom')).toBeInTheDocument()
  })

  it('should have an input field with the label `Number of People`', () => {
    render(<App />)
    expect(screen.getByLabelText('Number of People')).toBeInTheDocument()
  })

  it('should show the tip amount per person', () => {
    render(<App />)
    expect(screen.getByTestId('tip-per-person')).toBeInTheDocument()
    expect(screen.getByTestId('tip-per-person')).toHaveTextContent('$0.00')
  })

  it('should show the total cost per person', () => {
    render(<App />)
    expect(screen.getByTestId('total-per-person')).toBeInTheDocument()
    expect(screen.getByTestId('total-per-person')).toHaveTextContent('$0.00')
  })

  it('should have a button with the text `RESET`', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: 'RESET' })).toBeInTheDocument()
  })

  it('should render with the `RESET` button disabled', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: 'RESET' })).toBeDisabled()
  })
})

// TODO: Add more tests
// describe.skip('Behavior', () => {})
