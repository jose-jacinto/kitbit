import { FC } from 'react'

import { default as InfiniteScrollComponent } from 'react-infinite-scroll-component'
import cn from 'classnames'

import s from './InfiniteScroll.module.css'

interface Props {
  className?: string
  layout?: 'A' | 'B' | 'C' | 'D' | 'normal'
  dataLength?: any
  next?: any
  hasMore?: any
  children?: any
  locale?: string
}

const InfiniteScroll: FC<Props> = ({
  className,
  layout = 'normal',
  dataLength = 0,
  next,
  hasMore,
  children,
  locale,
}) => {
  const rootClassName = cn(
    s.root,
    {
      [s.layoutA]: layout === 'A',
      [s.layoutB]: layout === 'B',
      [s.layoutC]: layout === 'C',
      [s.layoutD]: layout === 'D',
      [s.layoutNormal]: layout === 'normal',
    },
    className
  )

  return (
    <InfiniteScrollComponent
      className={rootClassName}
      dataLength={dataLength}
      next={next}
      hasMore={hasMore}
      loader={
        <div className={cn(s.importantGrid, 'relative mt-15')}>
          <span className="absolute inset-x-0 text-center">
            {locale === 'pt'
              ? 'A carregar mais resultados'
              : 'Loading more results...'}
          </span>
        </div>
      }
    >
      {children}
    </InfiniteScrollComponent>
  )
}

export default InfiniteScroll
