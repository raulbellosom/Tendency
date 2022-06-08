import React from "react";

const TableComponent = ({ items, selected }) => {
  const selectId = (id) => {
    selected(id);
  };
  return (
    <div className="w-25">
      <table className="table table-striped table-hover table-info ">
        <thead>
          <tr>
            <th className="text-center">Orden</th>
          </tr>
        </thead>

        <tbody>
          {items !== undefined &&
            items.map((item) => {
              return (
                <tr
                  className="text-center"
                  key={item.id}
                  onClick={() => selectId(item.id)}
                >
                  <td>{item.name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;

export const TableItems = ({ orderFiltered, toggle }) => {
  // console.log("orders", orderFiltered);
  return (
    <div className="w-75 ">
      <div className="d-flex justify-content-between align-items-center ">
        <div>
          Numero de orden: <b> {orderFiltered.name}</b>
        </div>
        <div className="d-flex justify-content-end right-0 mb-2">
          <button className="btn btn-primary" onClick={toggle}>
            Agregar producto
          </button>
        </div>
      </div>
      <table className="table table-striped table-hover table-info ">
        <thead>
          <tr className="text-center">
            <th scope="col">SKU</th>
            <th scope="col">Nombre</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>

        <tbody>
          {orderFiltered !== undefined &&
            orderFiltered.items.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="text-center">{item.sku}</td>
                  <td>{item.name}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-center">{item.price}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
