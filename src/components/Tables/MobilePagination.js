import PropTypes from "prop-types";
// Components
import MKPagination from "components/MKPagination";
import Icon from "@mui/material/Icon";

MobilePagination.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalRows: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default function MobilePagination({ pageIndex, pageSize, totalRows, onPageChange }) {
  const numberOfPages = Math.ceil(totalRows / pageSize);
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === numberOfPages - 1;

  function getInit() {
    if (isFirstPage) return 0;
    if (isLastPage) return numberOfPages - 3;
    return pageIndex - 1;
  }

  function getEnd() {
    if (isFirstPage && isLastPage) return 0;
    if (isFirstPage) return 2;
    if (isLastPage) return numberOfPages - 1;
    return pageIndex + 1;
  }

  const init = getInit();
  const end = getEnd();
  const pages = [...Array(end - init + 1).keys()].map((i) => i + init);

  return (
    <MKPagination color="primary" variant="contained">
      <MKPagination item onClick={() => !isFirstPage && onPageChange(pageIndex - 1)}>
        <Icon>keyboard_arrow_left</Icon>
      </MKPagination>
      {pages?.map((i) => (
        <MKPagination
          key={`page_item_${i}`}
          item
          active={i === pageIndex}
          onClick={() => i !== pageIndex && onPageChange(i)}>
          {i + 1}
        </MKPagination>
      ))}
      <MKPagination item onClick={() => !isLastPage && onPageChange(pageIndex + 1)}>
        <Icon>keyboard_arrow_right</Icon>
      </MKPagination>
    </MKPagination>
  );
}
