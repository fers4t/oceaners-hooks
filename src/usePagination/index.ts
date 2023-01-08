import { useState, useEffect } from 'react';

interface IPagination {
   currentPage: number;
   hasNext: boolean;
   hasPrev: boolean;
   maxPaginationCount: number;
   pages: number[];
   perPage: number;
   totalPageCount: number;
   /**
    * Calculated total number of pagination pages.
    */
   totalPaginationCount: number;
}

interface IPaginationResult {
   pagination: IPagination;
}

function usePagination({
   currentPage,
   maxPaginationCount = 10,
   perPage,
   totalPageCount
}: {
   currentPage: number;
   /**
    * The maximum number of pages to display in the pagination. Pages array returned will be truncated to this number.
    */
   maxPaginationCount?: number;
   perPage: number;
   totalPageCount: number;
}): IPaginationResult {
   const totalPages = Math.ceil(totalPageCount / perPage);
   const startPage = Math.max(
      1,
      currentPage - Math.floor(maxPaginationCount / 2)
   );
   const endPage = Math.min(startPage + maxPaginationCount - 1, totalPages);
   const pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
   );
   const hasNext = currentPage < totalPages;
   const hasPrev = currentPage > 1;
   const totalPaginationCount = Math.ceil(totalPageCount / perPage);

   const [pagination, setPagination] = useState<IPagination>({
      currentPage,
      maxPaginationCount,
      perPage,
      totalPageCount,
      hasNext,
      hasPrev,
      totalPaginationCount,
      pages
   });

   useEffect(() => {
      setPagination({
         currentPage,
         maxPaginationCount,
         perPage,
         totalPageCount,
         totalPaginationCount,
         hasNext,
         hasPrev,
         pages
      });
   }, [currentPage, maxPaginationCount, perPage, totalPageCount]);

   return { pagination };
}

export { usePagination };
