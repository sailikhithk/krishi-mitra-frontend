import { FC, ReactNode } from 'react'

declare module '../components/ui/select' {
  export interface SelectProps {
    onValueChange: (value: string) => void
    children: ReactNode
  }

  export interface SelectSubComponents {
    Trigger: FC<{ children: ReactNode }>
    Value: FC<{ placeholder: string }>
    Content: FC<{ children: ReactNode }>
    Item: FC<{ value: string; children: ReactNode }>
  }

  export const Select: FC<SelectProps> & SelectSubComponents
}