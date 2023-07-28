import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { 
    PAGINATION_PRODUCT, 
    PAGINATION_PRODUCT_ADMIN, 
    PAGINATION_ORDER, 
    PAGINATION_ORDER_ADMIN,
    PAGINATION_USER_ADMIN,
    PAGINATION_SEARCH 
} from '../utils/constant';

const Paginate = ({ pages, currentPage, paginationType = '', keyword = '' }) => {
    return (
        pages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination>
                    { [...Array(pages).keys()].map((page) => (
                        <LinkContainer 
                            key={page + 1}
                            to={
                                paginationType === PAGINATION_PRODUCT_ADMIN
                                    ? `/admin/products/all/${page + 1}`
                                    : paginationType === PAGINATION_PRODUCT
                                    ? `/products/page/${page + 1}`
                                    : paginationType === PAGINATION_ORDER_ADMIN
                                    ? `/admin/orders/all/${page + 1}`
                                    : paginationType === PAGINATION_ORDER
                                    ? `/orders/${page + 1}`
                                    : paginationType === PAGINATION_USER_ADMIN
                                    ? `/admin/users/all/${page + 1}`
                                    : paginationType === PAGINATION_SEARCH && keyword
                                    ? `/search/${keyword}/page/${page + 1}`
                                    : '/'
                            }
                        >
                            <Pagination.Item active={page + 1 === currentPage}>{page + 1}</Pagination.Item>
                        </LinkContainer>
                    )) }
                </Pagination>
            </div>
        )
    )
}

export default Paginate;