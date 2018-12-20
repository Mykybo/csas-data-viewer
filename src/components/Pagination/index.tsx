// @flow
import { getPaginationItems } from '@/lib/utils'
import React, { Fragment } from 'react'

import { IPagination } from '../DataView'
import { LinkButton, PageItem, PaginationList, PaginationWrapper, StyledLink } from './styled'

interface IProps {
  pagination: IPagination
}

const Pagination = ({
  pagination: { pageNumber: active, pageSize, pageCount, recordCount },
}: IProps) => {
  const hasNext = active < pageCount
  const hasPrev = active !== 0

  const visibleCount = hasNext
    ? pageSize
    : recordCount === 0
    ? 0
    : recordCount % pageSize || pageSize

  const paginationItems = getPaginationItems(active, pageCount)

  return (
    <PaginationWrapper>
      <nav aria-label='Pagination Navigation'>
        <PaginationList>
          {hasPrev && (
            <li>
              <LinkButton to={`?page=${active - 1}`}>Předchozí</LinkButton>
            </li>
          )}
          {paginationItems.map(pageNumber => {
            return (
              <Fragment key={pageNumber}>
                {pageNumber === null ? (
                  <PageItem key={pageNumber} empty>
                    <span>...</span>
                  </PageItem>
                ) : (
                  <PageItem key={pageNumber}>
                    <StyledLink
                      state={pageNumber === active ? 'active' : 'none'}
                      to={pageNumber === 1 ? '/' : `?page=${pageNumber}`}
                    >
                      {pageNumber}
                    </StyledLink>
                  </PageItem>
                )}
              </Fragment>
            )
          })}
          {hasNext && (
            <li>
              <LinkButton to={`?page=${active + 1}`}>Další</LinkButton>
            </li>
          )}
        </PaginationList>
      </nav>
      <div className='pagination-count-info'>
        Zobrazeno {visibleCount} ze {recordCount} položek
      </div>
    </PaginationWrapper>
  )
}

export default Pagination
