import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cn from 'classnames'

import s from './Navbar.module.css'

import { Searchbar, UserNav } from '@components/core'
import { Logo } from '@components/ui'

import { getItems } from 'whitebrim'

interface Props {
  className?: string
}

const Navbar: FC<Props> = ({ className }) => {
  const { locale, push, query } = useRouter()
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
            <a aria-label="Logo">
              <Logo width="140px" />
            </a>
          </Link>
          <nav className="space-x-4 ml-6 hidden lg:block">
            <Link href="/search">
              <a className={s.link}>{locale === 'pt' ? 'Todos' : 'All'}</a>
            </Link>
            {categories &&
              categories.map((cat: any) => (
                <a
                  className={cn(s.link, {
                    underline: query.cat === cat._id,
                  })}
                  onClick={() =>
                    push(
                      {
                        pathname: `/search`,
                        query: { cat: cat._id },
                      },
                      undefined,
                      { shallow: true }
                    )
                  }
                >
                  {cat.name}
                </a>
              ))}
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
