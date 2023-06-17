import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(8);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.spacexdata.com/v3/launches?limit=100"
        );
        setData(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      const filtered = data.filter((item) => item.launch_year === selectedYear);
      setFilteredData(filtered);
      setCurrentPage(1); // Reset current page when the year filter changes
    } else {
      setFilteredData(data);
    }
  }, [data, selectedYear]);

  useEffect(() => {
    function updateCardsPerPage() {
      if (window.innerWidth >= 1440) {
        setCardsPerPage(10);
      } else {
        setCardsPerPage(8);
      }
    }

    updateCardsPerPage();

    window.addEventListener('resize', updateCardsPerPage);

    return () => {
      window.removeEventListener('resize', updateCardsPerPage);
    };
  }, []);

  const handleFilter = (year) => {
    setSelectedYear(year);
  };

  // Pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowAll = () => {
    setSelectedYear("");
  };


  return (
    <div className="main__container">
      <h3 className="container__title">SpaceX Launch Programs</h3>
      <div className="container">
        <div className="sidebar">
          <div className="sidebar__title">Filter</div>
          <div className="sidebar__launch-text">Launch Year</div>
          <div className="sidebar__buttons">
            <button onClick={() => handleFilter('2006')}>2006</button>
            <button onClick={() => handleFilter('2007')}>2007</button>
            <button onClick={() => handleFilter('2008')}>2008</button>
            <button onClick={() => handleFilter('2009')}>2009</button>
            <button onClick={() => handleFilter('2010')}>2010</button>
            <button onClick={() => handleFilter('2011')}>2011</button>
            <button onClick={() => handleFilter('2012')}>2012</button>
            <button onClick={() => handleFilter('2013')}>2013</button>
            <button onClick={() => handleFilter('2014')}>2014</button>
            <button onClick={() => handleFilter('2015')}>2015</button>
            <button onClick={() => handleFilter('2016')}>2016</button>
            <button onClick={() => handleFilter('2017')}>2017</button>
            <button onClick={() => handleFilter('2018')}>2018</button>
            <button onClick={() => handleFilter('2019')}>2019</button>
            <button onClick={() => handleFilter('2020')}>2020</button>
            <button onClick={handleShowAll}>All</button>
          </div>
        </div>
        <div className="main-menu">
          {currentCards.length === 0 ? (
            <div className="no-launches-container">
              <img src="/apollo.gif" alt="No Launch" className="no-launch-image" />
              <h3 className="no-launches">No launches found</h3>
            </div>
          ) : (
            <div className="card-container">
              {currentCards.map((item, index) => (
                <div className="card" key={index}>
                  <img
                    src={item.links.mission_patch_small}
                    alt="Mission"
                    className="card__image"
                  />
                  <h2 className="card__title">{item.mission_name}</h2>
                  <p className="card__property">
                    Mission ID: {item.mission_id.join(", ")}
                  </p>
                  <p className="card__property">
                    Launch Year: {item.launch_year}
                  </p>
                  <p className="card__property">
                    Launch Success: {item.launch_success ? "Yes" : "No"}
                  </p>
                  <p className="card__property">
                    Landing Success:{" "}
                    {item.rocket.first_stage.cores[0].land_success ? "Yes" : "No"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Pagination */}
      {filteredData.length > cardsPerPage && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredData.length / cardsPerPage) }, (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
      <h5 className="developer__name">
        Developed By: Sohail khan
      </h5>
    </div>
  );
};

export default Dashboard;
