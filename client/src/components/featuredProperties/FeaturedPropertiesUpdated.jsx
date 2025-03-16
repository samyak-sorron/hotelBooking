import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(`${process.env.url}/hotels?featured=true&&limit=4 `);
  
  return (
    <div className="fp">
      {loading ? "Loading" : error ? <div>Error fetching data</div> : (
        data.map((hotel, index) => (
          <div className="fpItem" key={index}>
            <img
              src={hotel.image}
              alt=""
              className="fpImg"
            />
            <span className="fpName">{hotel.name}</span>
            <span className="fpCity">{hotel.city}</span>
            <span className="fpPrice">{hotel.price}</span>
            <div className="fpRating">
              <button>{hotel.rating}</button>
              
              <span>Excellent</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FeaturedProperties;
