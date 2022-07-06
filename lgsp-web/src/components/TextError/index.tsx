import React, { ReactNode } from 'react'

interface ITextError {
  children: ReactNode
}
const TextError = (props: any) => {
  return (
    <div className="text-error">
        {props.children}
    </div>
  )
}

export default TextError
