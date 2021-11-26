import React from "react";
import { Nav, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Nav.Link
            as={Link}
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productslist/${x + 1}`
            }
            active={x + 1 === page}
          >
            {x + 1}
          </Nav.Link>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
