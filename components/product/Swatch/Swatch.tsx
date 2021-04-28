import cn from 'classnames'
import { FC } from 'react'
import s from './Swatch.module.css'
import Button, { ButtonProps } from '@components/ui/Button'
import { isDark } from '@lib/colors'
interface Props {
  active?: boolean
  children?: any
  className?: string
  label?: string
  price?: number
  outOfStock?: boolean
  locale?: string
  variant?: 'size' | 'color' | string
}

const Swatch: FC<Props & ButtonProps> = ({
  className,
  color = '',
  label,
  variant = 'type',
  active,
  price,
  outOfStock,
  locale,
  ...props
}) => {
  variant = variant?.toLowerCase()
  label = label?.toLowerCase()

  const rootClassName = cn(
    s.root,
    {
      [s.active]: active,
      [s.size]: variant === 'type',
      [s.color]: color,
      [s.dark]: color ? isDark(color) : false,
    },
    className
  )

  return (
    <Button
      className={rootClassName}
      style={active ? { backgroundColor: '#F16131', color: '#fff' } : {}}
      aria-label="Variant Swatch"
      {...props}
    >
      {label}
      {outOfStock && (
        locale === 'pt' ? " (Sem Stock)" : " (Out of Stock)"
      )}
      <br />
      {price && price.toFixed(2)} €
    </Button>
  )
}

export default Swatch
