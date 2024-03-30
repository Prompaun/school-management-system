import React from 'react';

const Pagination  = ({
    totalPageCount,
    currentPage,
    setCurrentPage,
    hasNextPage,
    hasPreviousPage,
    }) => {
    const paginationNumbers = [];

    for (let i = 1; i <= totalPageCount; i++) {
        paginationNumbers.push(i);
    }


    
   
      
    return (
        <>
       
       
       <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            href="#"
                            aria-label="Previous"
                        >
                            <span aria-hidden="true">&laquo;</span>
                            {/* <span className="sr-only">Previous</span> */}
                        </a>
                    </li>
                    {paginationNumbers.map((pageNumber) => (
                        <li
                            key={pageNumber}
                            className={currentPage === pageNumber ? 'active' : null}
                        >
                            <a className="page-link" onClick={() => setCurrentPage(pageNumber)} href="#">
                                {pageNumber}
                            </a>
                        </li>
                    ))}
                    <li
                        className={`page-item ${
                            currentPage === totalPageCount ? 'disabled' : ''
                        }`}
                    >
                        <a
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            href="#"
                            aria-label="Next"
                        >
                            <span aria-hidden="true">&raquo;</span>
                            {/* <span className="sr-only">Next</span> */}
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Pagination;