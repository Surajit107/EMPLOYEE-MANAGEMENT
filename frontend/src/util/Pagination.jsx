import React from 'react';
import ReactPaginate from 'react-paginate'

const Pagination = ({ pageCount, changePage }) => {

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                previousLabel={<span aria-hidden="true">&laquo;</span>}
                nextLabel={<span aria-hidden="true">&raquo;</span>}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination pagination-rounded justify-content-end mt-3 mb-0"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
                renderOnZeroPageCount={null}
            />
        </>
    )
}

export default Pagination