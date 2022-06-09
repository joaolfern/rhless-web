import React, { DetailedHTMLProps } from 'react'

export type ITextarea = {
  forwardedRef?: React.Ref<HTMLTextAreaElement>
} & DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

function Textarea ({ className, forwardedRef, ...rest }: ITextarea) {
  return (
    <textarea
      ref={forwardedRef}
      className={`p-3 rounded outline outline-1 outline-tertiary resize-none ${className || ''}`}
      rows={6}
      {...rest}
    />
  )
}

export default Textarea
