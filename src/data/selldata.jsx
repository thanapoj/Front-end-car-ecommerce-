import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NewCard } from '../components/components_home/newcard';
import example_products from './example_products';
import { onSearchCar } from '../components/API/API_Cars';
import Search from '../components/champ/search';
import ChangeArrow from '../../src/assets/sell_page/Frame 104.png'
import ChangeArrowRight from '../../src/assets/sell_page/Frame 103.png'

const imagesPerPage = 6;

export const Selldata = () => {
  const location = useLocation();
  const initialSearchValue = location.state?.searchValue || '';
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);



  useEffect(() => {
    if (initialSearchValue) {
      handleSearch(initialSearchValue);
    }
  }, [initialSearchValue]);

  useState(() => {
    const fetchProducts = async () => {
      try {
        const products = await example_products();
        setProducts(products);
        setSearchResults(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (initialSearchValue) {
      handleSearch(initialSearchValue);
    }
  }, [initialSearchValue]);

  //---------------test--------------

  const [zoomClass, setZoomClass] = useState('');

  useEffect(() => {
    const handleZoom = () => {
      if (window.devicePixelRatio === 1.25) {
        setZoomClass('');
      } else {
        setZoomClass('lg:mt-14');
      }
    };

    window.addEventListener('resize', handleZoom);
    handleZoom(); 

    return () => window.removeEventListener('resize', handleZoom);
  }, []);

  //---------------test--------------


  const handleSearch = async (searchValue) => {
    try {
      const result = await onSearchCar(searchValue);
      setSearchResults(result);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching for cars:', error);
    }
  };



  const handleClearSearch = async () => {
    try {
      const showall = await example_products();
      setSearchResults(showall);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error clearing search:', error);
    }
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((searchResults?.length || 0) / imagesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className={`flex justify-center ${zoomClass}`}>
        <Search
          onSearchSubmit={handleSearch}
          initialSearchValue={initialSearchValue}
          Clear={handleClearSearch}
        />
      </div>
      {Array.isArray(searchResults) && searchResults.length > 0 ? (
        <>      <div class="md:grid md:place-items-center">
          <div class=" md:mt-12 md:grid md:grid-cols-3 md:w-[1128px] md:gap-6 mb-12">
        {/* <div className="grid grid-cols-3 justify-center gap-8 my-20 md:my-20 md:mx-0 lg:mx-24"> */}
              {searchResults
                .slice(indexOfFirstImage, indexOfLastImage)
                .map((product, index) => (
                  <NewCard key={index} product={product} />
                ))}
            </div>
      </div>
          <div className="flex justify-center ">
            <div className="text-[16px] mb-12 flex gap-6">
              <button
                onClick={() => handleClick(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
              >
                <img src={ChangeArrow} alt="" className='h-8 '/>
              </button>
              <div>
              <div className="flex flex-row space-x-6 ">
            {pageNumbers.map((number) => (
                
              <button
                    key={number}
                    onClick={() => handleClick(number)}
                    className={`px-3 py-1 rounded transition-colors duration-200 ${currentPage === number ? 'font-bold bg-[#3E5685] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    
                {number}
                  </button>
                ))}
                </div>

          </div>
              <button
                onClick={() =>
                  handleClick(Math.min(currentPage + 1, pageNumbers.length))
                }
                disabled={currentPage === pageNumbers.length}
              >
                <img src={ChangeArrowRight} alt="" className='h-8 '/>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center my-20 text-xl">No Results</div>
      )}
    </>
  );
};

export default Selldata;
