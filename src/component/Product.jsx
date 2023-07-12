import React, { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { IoFilterSharp } from "react-icons/io5";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Modal, Spinner} from "react-bootstrap";
import "./Product.css"; 
import ProductDataService from "../services/ProductService";
import DetailViewProduct from "../component/DetailviewProduct";


const LoanProduct = () => {
  const [loanProducts, setLoanProducts] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");
  const [filteredLoanProducts, setFilteredLoanProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedLoanProduct, setSelectedLoanProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    irt: null,
    lnLmt: null,
    usge: null,
    maxRdptTrm: null,
    ofrInstNm: null,
  });

  useEffect(() => {
    fetchLoanProducts();
  }, []);

  useEffect(() => {
    filterLoanProducts();
  }, [loanProducts, searchTerms, filters]);

  const fetchLoanProducts = async () => {
    try {
      const response = await ProductDataService.getProductData();
      setLoanProducts(response);
    } catch (error) {
      console.error("Error retrieving loan products:", error);
    }
  };

  const handleOpenModal = (loanProduct) => {
    setSelectedLoanProduct(loanProduct);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filterLoanProducts = () => {
    const filteredProducts = loanProducts.filter((loanProduct) => {
      const searchTerm = searchTerms.toLowerCase();
      const productName = loanProduct.finPrdNm.toLowerCase();
      const filterKeys = Object.keys(filters);
      for (let key of filterKeys) {
        if (filters[key] && loanProduct[key] !== filters[key]) {
          return false;
        }
      }
      return productName.includes(searchTerm);
    });
    setFilteredLoanProducts(filteredProducts);
    setCurrentPage(1); // Reset current page when the filter changes
  };

  const toggleFilterPopup = () => {
    setIsFilterOpen((prevState) => !prevState);
  };
  const resetFilters = () => {
    setFilters({
      irt: null,
      lnLmt: null,
      usge: null,
      maxRdptTrm: null,
      ofrInstNm: null,
    });
  };
  const handleFilterChange = (fieldName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [fieldName]: value,
    }));
  };

  const handleSearch = (e) => {
    setSearchTerms(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = getTotalPages();
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getTotalPages = () => {
    return Math.ceil(filteredLoanProducts.length / itemsPerPage);
  };  

  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filterLoanProducts.slice(startIndex, endIndex);
  };

  const renderLoanProducts = () => {
    if (filteredLoanProducts.length === 0) {
      return <p>No loan products found.</p>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredLoanProducts.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    return currentItems.map((loanProduct, index) => (
      <div key={loanProduct.seq} className="product-item">
        <div className="product-wrapper">
          <h3 className="product-name">상품명: {loanProduct.finPrdNm}</h3>
          <div className="product-details">
            <p>금리: {loanProduct.irt}</p>
            <p>대출한도: {loanProduct.lnLmt}</p>
            <p>용도: {loanProduct.usge}</p>
            <p>총대출기간: {loanProduct.maxRdptTrm}</p>
            <p>제공기관: {loanProduct.ofrInstNm}</p>
            {/* Add more fields as needed */}
            <button onClick={() => handleOpenModal(loanProduct)}>
            자세히보기
          </button>
          </div>
        </div>
        {index % 2 === 0 && <div className="clear"></div>}
      </div>
    ));
  };

  const totalPages = Math.ceil(filteredLoanProducts.length / itemsPerPage);

  return (
    <>
    <div className="Product">
      <div className="LoanProduct-wrapper">
        <div className="LoanProduct-container">
          <h1>대출상품 비교해줘.</h1>
          <div className="Search-LoanProduct">
            <Input
              className="search-input"
              size="lg"
              type="text"
              placeholder="상품명으로 검색"
              value={searchTerms}
              onChange={handleSearch}
              variant="outlined"
              color="primary"
            />
            <Button
              className="filter-button"
              variant="outlined"
              onClick={toggleFilterPopup}
            >
              <IoFilterSharp />
            </Button>
            <Button
              className="reset-button"
              variant="outlined"
              onClick={resetFilters}
            >
              <GrPowerReset />
            </Button>
          </div>

          {/* 필터추가 */}
          {isFilterOpen && (
            <div className="filter-container-wrapper">
              <div className="filter-container">
              <div className="interest-rate">
              <h3>금리</h3>
              <label>
                <input
                  type="radio"
                  name="irt"
                  value="0.5"
                  checked={filters.irt === "0.5"}
                  onChange={() => handleFilterChange("irt", "0.5")}
                />
                0.5
              </label>
              <label>
                <input
                  type="radio"
                  name="irt"
                  value="1.8"
                  checked={filters.irt === "1.8"}
                  onChange={() => handleFilterChange("irt", "1.8")}
                />
                1.8
              </label>
              <label>
                <input
                  type="radio"
                  name="irt"
                  value="2"
                  checked={filters.irt === "2"}
                  onChange={() => handleFilterChange("irt", "2")}
                />
                2
              </label>
              <label>
                <input
                  type="radio"
                  name="irt"
                  value="2.9"
                  checked={filters.irt === "2.9"}
                  onChange={() => handleFilterChange("irt", "2.9")}
                />
                2.9 이하
              </label>
              <label>
                <input
                  type="radio"
                  name="irt"
                  value="2.78"
                  checked={filters.irt === "2.78"}
                  onChange={() => handleFilterChange("irt", "2.78")}
                />
                2.78
              </label>
              <label>
                <input
                  type="radio"
                  name="irt"
                  value="2.6"
                  checked={filters.irt === "2.6"}
                  onChange={() => handleFilterChange("irt", "2.6")}
                />
                2.6
              </label>
              <label>
                <input
                  type="radio"
                  name="irt"
                  value="negative"
                  checked={filters.irt === "negative"}
                  onChange={() => handleFilterChange("irt", "negative")}
                />
                0 이하
              </label>
              </div>
              <div className="credit_line">
              <h3>대출한도</h3>
              <label>
                <input
                  type="radio"
                  name="lnLmt"
                  value="1000"
                  checked={filters.lnLmt === "1000"}
                  onChange={() => handleFilterChange("lnLmt", "1000")}
                />
                1000 이상
              </label>
              <label>
                <input
                  type="radio"
                  name="lnLmt"
                  value="5000"
                  checked={filters.lnLmt === "5000"}
                  onChange={() => handleFilterChange("lnLmt", "5000")}
                />
                5000 이상
              </label>
              <label>
                <input
                  type="radio"
                  name="lnLmt"
                  value="10000"
                  checked={filters.lnLmt === "10000"}
                  onChange={() => handleFilterChange("lnLmt", "10000")}
                />
                10000 이상
              </label>
              </div>
              <div className="Loan period">
              <h3>총대출기간</h3>
              <label>
                <input
                  type="radio"
                  name="maxRdptTrm"
                  value="2"
                  checked={filters.maxRdptTrm === "2"}
                  onChange={() => handleFilterChange("maxRdptTrm", "2")}
                />
                2
              </label>
              <label>
                <input
                  type="radio"
                  name="maxRdptTrm"
                  value="3"
                  checked={filters.maxRdptTrm === "3"}
                  onChange={() => handleFilterChange("maxRdptTrm", "3")}
                />
                3
              </label>
              <label>
                <input
                  type="radio"
                  name="maxRdptTrm"
                  value="4"
                  checked={filters.maxRdptTrm === "4"}
                  onChange={() => handleFilterChange("maxRdptTrm", "4")}
                />
                4
              </label>
              <label>
                <input
                  type="radio"
                  name="maxRdptTrm"
                  value="5"
                  checked={filters.maxRdptTrm === "5"}
                  onChange={() => handleFilterChange("maxRdptTrm", "5")}
                />
                5
              </label>
              <label>
                <input
                  type="radio"
                  name="maxRdptTrm"
                  value="10"
                  checked={filters.maxRdptTrm === "10"}
                  onChange={() => handleFilterChange("maxRdptTrm", "10")}
                />
                10
              </label>
              </div>
              <div className="Provision_period">
              <h3>제공기관</h3>
              {/* Add checkbox filters for ofrInstNm */}
              <label>
                <input
                  type="checkbox"
                  name="ofrInstNm"
                  value="IBK기업은행"
                  checked={filters.ofrInstNm === "IBK기업은행"}
                  onChange={() =>
                    handleFilterChange("ofrInstNm", "IBK기업은행")
                  }
                />
                IBK기업은행
              </label>
              <label>
                <input
                  type="checkbox"
                  name="ofrInstNm"
                  value="경기신용보증재단"
                  checked={filters.ofrInstNm === "경기신용보증재단"}
                  onChange={() =>
                    handleFilterChange("ofrInstNm", "경기신용보증재단")
                  }
                />
                경기신용보증재단
              </label>
              <label>
                <input
                  type="checkbox"
                  name="ofrInstNm"
                  value="우리은행"
                  checked={filters.ofrInstNm === "우리은행"}
                  onChange={() => handleFilterChange("ofrInstNm", "우리은행")}
                />
                우리은행
              </label>
              <label>
                <input
                  type="checkbox"
                  name="ofrInstNm"
                  value="지역신용보증재단"
                  checked={filters.ofrInstNm === "지역신용보증재단"}
                  onChange={() =>
                    handleFilterChange("ofrInstNm", "지역신용보증재단")
                  }
                />
                지역신용보증재단
              </label>
              <label>
                <input
                  type="checkbox"
                  name="ofrInstNm"
                  value="충북신용보증재단"
                  checked={filters.ofrInstNm === "충북신용보증재단"}
                  onChange={() =>
                    handleFilterChange("ofrInstNm", "충북신용보증재단")
                  }
                />
                충북신용보증재단
              </label>
              <label>
                <input
                  type="checkbox"
                  name="ofrInstNm"
                  value="충청북도기업진흥원"
                  checked={filters.ofrInstNm === "충청북도기업진흥원"}
                  onChange={() =>
                    handleFilterChange("ofrInstNm", "충청북도기업진흥원")
                  }
                />
                충청북도기업진흥원
              </label>
              <label>
                <input
                  type="checkbox"
                  name="ofrInstNm"
                  value="한국예술인복지재단"
                  checked={filters.ofrInstNm === "한국예술인복지재단"}
                  onChange={() =>
                    handleFilterChange("ofrInstNm", "한국예술인복지재단")
                  }
                />
                한국예술인복지재단
              </label>
              <label>
                <input
                  type="checkbox"
                  name="ofrInstNm"
                  value="한국주택금융공사"
                  checked={filters.ofrInstNm === "한국주택금융공사"}
                  onChange={() =>
                    handleFilterChange("ofrInstNm", "한국주택금융공사")
                  }
                />
                한국주택금융공사
              </label>
              </div>
            </div>
            </div>
          )}
          <div className="renderLoanProduct-wrapper">
          <div>
            <h2>총 {loanProducts.length}개</h2>
          </div>
          <div className="renderLoanProduct-container">
            {renderLoanProducts()}
          </div>
          {/* 페이지 */}
          <div className="d-flex justify-content-center mt-3">
  <nav>
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          이전
        </button>
      </li>
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        const startPage = (Math.ceil(currentPage / itemsPerPage) - 1) * itemsPerPage + 1;
        const endPage = startPage + itemsPerPage - 1;
        if (page >= startPage && page <= endPage) {
          return (
            <li
              className={`page-item ${page === currentPage ? "active" : ""}`}
              key={i}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          );
        }
        return null;
      })}
      <li
        className={`page-item ${
          currentPage === getTotalPages() ? "disabled" : ""
        }`}
      >
        <button
          className="page-link"
          onClick={handleNextPage}
          disabled={currentPage === getTotalPages()}
        >
          다음
        </button>
      </li>
    </ul>
  </nav>
</div>
          </div>
        </div>
        {/* 자세히보기  */}
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Loan Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : selectedLoanProduct ? (
            <DetailViewProduct seq={selectedLoanProduct.seq} />
          ) : (
            <p>No loan product details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="footerbutton"
          onClick={handleCloseModal}>Close</button>
        </Modal.Footer>
      </Modal>
      </div>
      </div>
    </>
  );
};

export default LoanProduct;