import React, { useMemo, useState } from "react";
import { useAppSelector } from "store";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { selectPokemons } from "features/pokemons/redux";
import styles from "features/pokemons/styles/PokemonsListPagination.module.scss";

const ITEMS_PER_PAGE = 20;

const PokemonsListPagination: React.FC = () => {
  const { search } = useLocation();
  const currentSearchTerm = search.substring(1);

  const { pokemonsCount, isLoading } = useAppSelector(selectPokemons);
  const totalPages = Math.ceil(pokemonsCount / ITEMS_PER_PAGE);

  const { pageNumber } = useParams();
  const initialPageNumber = pageNumber ? parseInt(pageNumber) : 1;

  const [currentPage, setCurrentPage] = useState(initialPageNumber - 1);

  const navigate = useNavigate();

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    navigate(`/pokemons/${page + 1}`);
  };

  const PaginationButtons = useMemo(() => {
    const pageButtons = [];
    const pagesToShow = 2;

    pageButtons.push(
      <button
        key={0}
        onClick={() => handlePageClick(0)}
        className={
          currentPage === 0 ? styles.currentPageButton : styles.pageButton
        }
      >
        1
      </button>
    );
    if (currentPage > pagesToShow + 2) {
      pageButtons.push(
        <span className={styles.paginationEllipsis} key="ellipsis-start">
          ...
        </span>
      );
    }

    for (
      let page = Math.max(1, currentPage - pagesToShow);
      page < Math.min(totalPages - 1, currentPage + pagesToShow);
      page++
    ) {
      pageButtons.push(
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={
            currentPage === page ? styles.currentPageButton : styles.pageButton
          }
        >
          {page + 1}
        </button>
      );
    }

    if (currentPage < totalPages - pagesToShow - 1) {
      pageButtons.push(
        <span className={styles.paginationEllipsis} key="ellipsis-end">
          ...
        </span>
      );
    }

    if (totalPages > 1) {
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages - 1)}
          className={
            currentPage === totalPages - 1
              ? styles.currentPageButton
              : styles.pageButton
          }
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  }, [currentPage, pokemonsCount]);

  if (isLoading || currentSearchTerm) {
    return <div />;
  }

  return <div className={styles.paginationContainer}>{PaginationButtons}</div>;
};

export default PokemonsListPagination;
