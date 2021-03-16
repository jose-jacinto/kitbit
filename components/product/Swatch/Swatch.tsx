import cn from 'classnames'
import { FC } from 'react'
import s from './Swatch.module.css'
import { Check } from '@components/icons'
import Button, { ButtonProps } from '@components/ui/Button'
import { isDark } from '@lib/colors'
interface Props {
  active?: boolean
  children?: any
  className?: string
  label?: string
  price?: number
  variant?: 'size' | 'color' | string
}

const Swatch: FC<Props & ButtonProps> = ({
  className,
  color = '',
  label,
  variant = 'type',
  active,
  price,
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
      style={active ? { backgroundColor: '#5F3DC4', color: '#fff' } : {}}
      aria-label="Variant Swatch"
      {...props}
    >
      {label}
      <br />
      {price && price.toFixed(2)} €
    </Button>
  )
}

export default Swatch
