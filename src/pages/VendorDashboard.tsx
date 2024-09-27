import { Select } from "../components/ui/select"
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../components/ui/dialog"
import potatoImage from '../assets/potato.jpg'  // Adjust the path as needed
import tomatoImage from '../assets/tomato.jpg'  // Adjust the path as needed

function VendorDashboard() {
  const [value, setValue] = useState('')

  const handleValueChange = (newValue: string) => {
    console.log('Selected value:', newValue)
    setValue(newValue)
  }

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ]

  return (
    <div>
      <h1>Vendor Dashboard</h1>
      <Select onValueChange={handleValueChange}>
        <Select.Trigger>
          <Select.Value placeholder="Select an option" />
        </Select.Trigger>
        <Select.Content>
          {options.map((option) => (
            <Select.Item key={option.value} value={option.value}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
      <p>Selected value: {value}</p>
      <Dialog>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog content.
          </DialogDescription>
          {/* Your dialog content here */}
        </DialogContent>
      </Dialog>
      <div>
        <img src={potatoImage} alt="Potato" />
        <img src={tomatoImage} alt="Tomato" />
      </div>
    </div>
  )
}

export default VendorDashboard