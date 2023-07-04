import { Pagination } from "react-bootstrap";
import "./PaginationsStyles.css";

interface Page {
  itemPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: any;
}

const Paginations = ({ itemPerPage, totalItems,currentPage, paginate }: Page) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
    pageNumbers.push(
      <Pagination.Item className={`customPageNo${currentPage===i ? " active":""}`} key={i} onClick={() => paginate(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return (
      <Pagination className="container-fluid">{pageNumbers}</Pagination>
  );
};

export default Paginations;
