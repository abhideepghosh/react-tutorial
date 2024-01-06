import "./App.css";
import { useState, useEffect } from "react";
function App() {
  /**
   * WHEN THE WEBSITE IS DONE WITH LOADING -> []
   * [Anything inside the array -> whenever the value of this specific variable changes -> useEffect will be called again]
   * useEffect has a return statement -> it will be called when the component is unmounted
   */

  const [products, setProducts] = useState([]);
  const [clicks, setClicks] = useState(1);

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data = await response.json();
      setProducts(data);
      console.log(data);
    })();
    console.log("UseEffect Called");
    return () => {
      setProducts([]);
    };
  }, []);

  return (
    <>
      <h1 onClick={handleClick}>Hello World {clicks}</h1>
      <div className="container">
        <div className="row">
          {products &&
            products.map((el) => (
              <div key={el.id} className="col-sm text-center">
                <div className="card" style={{ width: `10rem` }}>
                  <img
                    className="card-img-top img-height"
                    src={el.image}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{el.title}</h5>
                    <p className="card-text">{el.price}</p>
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
              // <div key={el.id}>{el.title}</div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
