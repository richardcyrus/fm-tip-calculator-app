import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe } from 'vitest'
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

describe('Behavior', () => {
  describe('when the `Bill` input is changed', () => {
    it('should show an error state when the value is zero', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByLabelText('Bill')
      await user.type(input, '0')

      expect(input).toHaveClass('invalid')
      expect(await screen.findByText("Can't be zero.")).toBeInTheDocument()
    })

    it('should not accept non-numeric values', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByLabelText('Bill')
      await user.type(input, 'abc')

      expect(input).toHaveValue('')
    })
  })

  describe('when the `Custom` tip percentage is changed', () => {
    it('should not accept a value less than zero', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByPlaceholderText('Custom')
      await user.type(input, '-1')

      expect(input).toHaveValue('1')
    })

    it('should not accept a value greater than 100', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByPlaceholderText('Custom')
      await user.type(input, '101')

      expect(input).toHaveValue('100')
    })

    it('should not accept non-numeric values', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByPlaceholderText('Custom')
      await user.type(input, 'abc')

      expect(input).toHaveValue('')
    })

    it('should not accept fractional values', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByPlaceholderText('Custom')
      await user.type(input, '1.5')

      expect(input).toHaveValue('5')
    })
  })

  describe('when a Tip percentage is selected', () => {
    it('should clear the custom tip if the amount is different', async () => {
      const user = userEvent.setup()
      render(<App />)

      const customInput = screen.getByPlaceholderText('Custom')
      await user.type(customInput, '20')

      const radioInput = screen.getByLabelText('10%')
      await user.click(radioInput)

      expect(screen.getByPlaceholderText('Custom')).toHaveValue('')
    })

    it('should leave the custom tip if the amount is the same', async () => {
      const user = userEvent.setup()
      render(<App />)

      const customInput = screen.getByPlaceholderText('Custom')
      await user.type(customInput, '25')

      const radioInput = screen.getByLabelText('25%')
      await user.click(radioInput)

      expect(screen.getByPlaceholderText('Custom')).toHaveValue('25')
    })
  })

  describe('when the `Number of People` input is changed', () => {
    it('should show an error state when the value is zero', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByLabelText('Number of People')
      await user.type(input, '0')

      expect(input).toHaveClass('invalid')
      expect(await screen.findByText("Can't be zero.")).toBeInTheDocument()
    })

    it('should not accept non-numeric values', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByLabelText('Number of People')
      await user.type(input, 'abc')

      expect(input).toHaveValue('')
    })
  })

  describe('when a Tip is to be calculated', () => {
    it('should calculate and display the tip amount per person', async () => {
      const user = userEvent.setup()
      render(<App />)

      const billInput = screen.getByLabelText('Bill')
      const tipInput = screen.getByLabelText('10%')
      const peopleInput = screen.getByLabelText('Number of People')

      await user.type(billInput, '100')
      await user.click(tipInput)
      await user.type(peopleInput, '5')

      expect(screen.getByTestId('tip-per-person')).toHaveTextContent('$2.00')
    })

    it('should calculate and display the total amount per person', async () => {
      const user = userEvent.setup()
      render(<App />)

      const billInput = screen.getByLabelText('Bill')
      const tipInput = screen.getByLabelText('50%')
      const peopleInput = screen.getByLabelText('Number of People')

      await user.type(billInput, '100.00')
      await user.click(tipInput)
      await user.type(peopleInput, '5')

      expect(screen.getByTestId('tip-per-person')).toHaveTextContent('$10.00')
      expect(screen.getByTestId('total-per-person')).toHaveTextContent('$30.00')
    })

    it('should accept a custom tip amount', async () => {
      const user = userEvent.setup()
      render(<App />)

      const billInput = screen.getByLabelText('Bill')
      const tipInput = screen.getByPlaceholderText('Custom')
      const peopleInput = screen.getByLabelText('Number of People')

      await user.type(billInput, '100.00')
      await user.type(tipInput, '20')
      await user.type(peopleInput, '5')

      expect(screen.getByTestId('tip-per-person')).toHaveTextContent('$4.00')
      expect(screen.getByTestId('total-per-person')).toHaveTextContent('$24.00')
    })
  })

  describe('when the `RESET` button is clicked', () => {
    it('should reset the app state', async () => {
      const user = userEvent.setup()
      render(<App />)

      const billInput = screen.getByLabelText('Bill')
      const tipInput = screen.getByPlaceholderText('Custom')
      const peopleInput = screen.getByLabelText('Number of People')
      const resetButton = screen.getByRole('button', { name: 'RESET' })

      await user.type(billInput, '100.00')
      await user.type(tipInput, '20')
      await user.type(peopleInput, '5')

      expect(resetButton).not.toBeDisabled()

      await user.click(resetButton)

      expect(screen.getByTestId('tip-per-person')).toHaveTextContent('$0.00')
      expect(screen.getByTestId('total-per-person')).toHaveTextContent('$0.00')
      expect(billInput).toHaveValue('')
      expect(tipInput).toHaveValue('')
      expect(peopleInput).toHaveValue('')
      expect(resetButton).toBeDisabled()
    })
  })
})
