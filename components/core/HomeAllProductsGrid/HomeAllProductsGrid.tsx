import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getCategoryPath, getBrandPath } from '@lib/search'

import { Grid } from '@components/ui'
import { ProductCard } from '@components/product'

import s from './HomeAllProductsGrid.module.css'

interface Props {
  categories?: any
  brands?: any
  newestProducts?: any
}

const Head: FC<Props> = ({ categories, brands, newestProducts }) => {
  const { locale } = useRouter()

  return (
    <div className={s.root}>
      <div className={s.asideWrapper}>
        <div className={s.aside}>
          <ul className="mb-10">
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={getCategoryPath('')}>
                <a>
                  {locale === 'pt' ? 'Todas as Categorias' : 'All Categories'}
                </a>
              </Link>
            </li>
            {categories.map((cat: any) => (
              <li key={cat._id} className="py-1 text-accents-8">
                <Link href={`/search?cat=${cat._id}`}>
                  <a>{cat.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="">
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={getBrandPath('')}>
                <a>{locale === 'pt' ? 'Todas as Marcas' : 'All Brands'}</a>
              </Link>
            </li>
            {brands.flatMap((brand: any) => (
              <li key={brand._id} className="py-1 text-accents-8">
                <Link href={`/search?brand=${brand._id}`}>
                  <a>{brand.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <Grid layout="normal">
          {newestProducts.map((item: { uri: string }, i: any) => (
            <ProductCard
              key={item.uri}
              product={item}
              variant="simple"
              imgWidth={480}
              imgHeight={480}
            />
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default Head
