import React, { FC, useState } from 'react'
import cn from 'classnames'
import { Heart } from '@components/icons'
import { useUI } from '@components/ui/context'

type Props = {
  productId: number
  variant: any
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const WishlistButton: FC<Props> = ({
  productId,
  variant,
  className,
  ...props
}) => {
  const [loading, setLoading] = useState(false)
  const { openModal, setModalView } = useUI()

  const handleWishlistChange = async (e: any) => {
    e.preventDefault()

    if (loading) return

    // A login is required before adding an item to the wishlist
    if (!localStorage.getItem('wb_token')) {
      setModalView('LOGIN_VIEW')
      return openModal()
    }

    setLoading(true)

    try {
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <button
      aria-label="Add to wishlist"
      className={cn({ 'opacity-50': loading }, className)}
      onClick={handleWishlistChange}
      {...props}
    >
      <Heart fill={false ? 'var(--pink)' : 'none'} />
    </button>
  )
}

export default WishlistButton
