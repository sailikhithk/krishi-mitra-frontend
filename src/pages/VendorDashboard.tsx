import { Select } from "../components/ui/select"
import { useState } from 'react'

function VendorDashboard() {
  const [value, setValue] = useState('')

  const handleValueChange = (newValue: string) => {
    console.log('Selected value:', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <h1>Vendor Dashboard</h1>
      <Select onValueChange={handleValueChange}>
        <Select.Trigger>
          <Select.Value placeholder="Select an option" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="option1">Option 1</Select.Item>
          <Select.Item value="option2">Option 2</Select.Item>
          <Select.Item value="option3">Option 3</Select.Item>
        </Select.Content>
      </Select>
      <p>Selected value: {value}</p>
    </div>
  )
}

export default VendorDashboard