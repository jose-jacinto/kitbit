import { FC, useEffect } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { Menu } from '@headlessui/react'
import { Heart, Bag } from '@components/icons'
import { Avatar } from '@components/core'
import { useUI } from '@components/ui/context'
import DropdownMenu from './DropdownMenu'
import s from './UserNav.module.css'

import { getUser } from 'whitebrim'
interface Props {
  className?: string
}

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  const {
    toggleSidebar,
    closeSidebarIfPresent,
    openModal,
    user,
    setUser,
  } = useUI()

  useEffect(() => {
    //! FOR WHITEBRIM CHECKOUT (NEED TO FIX THIS ISSUE ON CHECKOUT)
    const auth: any =
      '{"currLang":null,"token":null,"userId":null,"userDetails":null,"cart":[]}'
    const persist: any = '{"version":-1,"rehydrated":true}'

    localStorage.setItem(
      'persist:whitebrim',
      JSON.stringify({ auth: auth, _persist: persist })
    )

    if (localStorage.getItem('wb_token')) {
      console.log('Authenticating...')
      getUser()
        .then((response) => {
          setUser(response.data)
          console.log('Authenticated with success!')
        })
        .catch((err) => {
          console.log(err)
          localStorage.removeItem('wb_token')
          localStorage.removeItem('wb_userId')
          console.log('There was an error authenticating.')
        })
    } else {
      console.log('Not Logged In')
    }
  }, [])

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <li className={s.item} onClick={toggleSidebar}>
            <Bag />
            {user && user.cart > 0 && (
              <span className={s.bagCount}>{user.cart.length}</span>
            )}
          </li>
          <li className={s.item}>
            <Link href="/wishlist">
              <a onClick={closeSidebarIfPresent}>
                <Heart />
              </a>
            </Link>
          </li>
          <li className={s.item}>
            {user ? (
              <Menu>
                {({ open }) => (
                  <>
                    <Menu.Button className={s.avatarButton} aria-label="Menu">
                      <Avatar />
                    </Menu.Button>
                    <DropdownMenu open={open} />
                  </>
                )}
              </Menu>
            ) : (
              <button
                className={s.avatarButton}
                aria-label="Menu"
                onClick={() => openModal()}
              >
                <Avatar />
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default UserNav
