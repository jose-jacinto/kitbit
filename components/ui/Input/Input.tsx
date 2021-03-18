import cn from 'classnames'
import s from './Input.module.css'
import React, { forwardRef, InputHTMLAttributes } from 'react'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  ref?: any
}

const Input: React.FC<Props> = forwardRef((props, ref) => {
  const { className, children, ...rest } = props

  const rootClassName = cn(s.root, {}, className)

  return (
    <label>
      <input
        ref={ref}
        className={rootClassName}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
    </label>
  )
})

export default Input
