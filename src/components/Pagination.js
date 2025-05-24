import styled from 'styled-components';
import { useData } from './providers';
import { useCallback } from 'react';

export function Pagination() {
  const { apiURL, info, activePage, setActivePage, setApiURL } = useData();

  const pageClickHandler = useCallback(
    (index) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const URLWithPage = new URL(apiURL);
      URLWithPage.searchParams.set('page', index + 1);
      setApiURL(URLWithPage);
      setActivePage(index);
    },
    [apiURL, setApiURL, setActivePage]
  );

  const handlePageClick = useCallback(
    (pageNumber) => {
      return () => pageClickHandler(pageNumber);
    },
    [pageClickHandler]
  );

  if (info.pages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 1; // сколько страниц показывать слева и справа от активной
    const range = [];

    if (activePage > delta) {
      range.push(
        {
          pageNumber: 0,
          pageName: '« First'
        },
        {
          pageNumber: -1,
          pageName: '...'
        }
      );
    }

    for (let i = activePage - delta; i <= activePage + delta; i++) {
      if (i >= 0 && i < info.pages) {
        range.push({
          pageNumber: i,
          pageName: i + 1
        });
      }
    }

    if (activePage < info.pages - delta - 1) {
      range.push(
        {
          pageNumber: -2,
          pageName: '...'
        },
        {
          pageNumber: info.pages - 1,
          pageName: 'Last »'
        }
      );
    }

    return range;
  };

  return (
    <StyledPagination>
      {getPageNumbers().map(({ pageNumber, pageName }) =>
        pageName === '...' ? (
          <Ellipsis key={pageNumber} tabIndex={-1}>
            ...
          </Ellipsis>
        ) : (
          <Page
            key={pageNumber}
            active={pageNumber === activePage}
            onClick={handlePageClick(pageNumber)}
          >
            {pageName}
          </Page>
        )
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.button`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
