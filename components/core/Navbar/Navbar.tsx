import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Navbar.module.css'
// import { Logo } from '@components/ui'
import { Searchbar, UserNav } from '@components/core'

import { getItems } from 'whitebrim'

interface Props {
  className?: string
}

const Navbar: FC<Props> = ({ className }) => {
  const { locale } = useRouter()
  const rootClassName = className

  const [categoriesLoaded, setCategoriesLoaded] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    let params = {
      modelName: 'categories',
      currentPage: 1,
      selectedPageSize: 6,
      filterOption: { name: null, id: null },
      filterOption2: { name: null, id: null },
      multi: false,
    }

    if (!categoriesLoaded) {
      getItems(params)
        .then((res) => {
          setCategories(res.data.results)
          setCategoriesLoaded(true)
        })
        .catch(() => {
          setCategories([])
          setCategoriesLoaded(true)
        })
    }
  }, [])

  return (
    <div className={rootClassName}>
      <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
        <div className="flex flex-1 items-center">
          <Link href="/">
            <a className={s.logo} aria-label="Logo">
              KITBIT
              {/* <Logo /> */}
            </a>
          </Link>
          <nav className="space-x-4 ml-6 hidden lg:block">
            <Link href="/search">
              <a className={s.link}>{locale === 'pt' ? 'Todos' : 'All'}</a>
            </Link>
            {categories &&
              categories.map((cat: any) => (
                <Link href={`/search?cat=${cat._id}`}>
                  <a className={s.link}>{cat.name}</a>
                </Link>
              ))}
            {/* <Link href="/search?q=boards">
              <a className={s.link}>{locale === 'pt' ? 'Placas' : 'Boards'}</a>
            </Link>
            <Link href="/search?q=accessories">
              <a className={s.link}>
                {locale === 'pt' ? 'Acessórios' : 'Accessories'}
              </a>
            </Link> */}
          </nav>
        </div>

        <div className="flex-1 justify-center hidden lg:flex">
          <Searchbar locale={locale} />
        </div>

        <div className="flex flex-1 justify-end space-x-8">
          <UserNav />
        </div>
      </div>

      <div className="flex pb-4 lg:px-6 lg:hidden">
        <Searchbar locale={locale} id="mobileSearch" />
      </div>
    </div>
  )
}

export default Navbar
