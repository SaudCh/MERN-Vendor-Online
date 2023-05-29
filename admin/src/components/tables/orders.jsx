import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { LoadingContext } from "../../contexts/loadingContext";

const columns = [
  { headerName: "Order ID" },

  {
    headerName: "Product Date",
  },
  {
    headerName: "Product Name",
  },
  {
    headerName: "Product Price",
  },

  {
    headerName: "Product Status",
  },
];
export default function OrderTable() {
  const [data, setData] = React.useState([]);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);

      setLoading(false);
    };

    getProduct();
  }, []);

  return (
    <div>
      <div className="block py-2   mx-1 md:mx-2 rounded-md">
        <div className="flex justify-center">
          <table>
            <thead>
              {columns.map((column) => (
                <th>{column.headerName}</th>
              ))}
            </thead>
            <tbody>
              <tr>
                <td data-label="id">
                  <Link to="/order/id">#268FCDs</Link>
                </td>
                <td data-label="date">
                  <Link to="/order/id">23-3-2023</Link>
                </td>
                <td data-label="name">
                  <Link to="/order/id">Decorative Box</Link>
                </td>
                <td data-label="price">
                  <Link to="/order/id">Rs 800.00</Link>
                </td>
                <td data-label="status">
                  <Link to="/order/id">Delivered</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
