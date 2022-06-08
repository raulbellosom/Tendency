import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Navbar from "./Navbar";
import TableComponent, { TableItems } from "./TableComponent";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectOrder, setSelectOrder] = useState("");
  const [orderFiltered, setOrderFiltered] = useState(null);
  const [active, setActive] = useState(false);
  const [newProduct, setNewProduct] = useState({
    sku: "",
    name: "",
    quantity: "",
    price: "",
  });
  // const [items, setItems] = useState([]);
  const url = "https://eshop-deve.herokuapp.com/api/v2/orders";

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setOrderFiltered(orders.find((item) => item.id === selectOrder));
  }, [selectOrder, orderFiltered, orders]);

  async function fetchItems() {
    await fetch(url, {
      method: "get",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setOrders(response.orders);
        console.log(response.orders);
      })
      .catch((err) => console.error(err));
  }
  const addItem = () => {
    if (
      !newProduct.sku ||
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.quantity
    ) {
      return setActive(true);
    }

    const item = {
      sku: newProduct.sku,
      name: newProduct.name,
      price: newProduct.price,
      quantity: newProduct.quantity,
    };

    orders.filter((element) => {
      if (element.id === selectOrder) {
        const key =
          orderFiltered.items.length === 1
            ? orderFiltered.items.length
            : orderFiltered.items.length + 1;
        item.id = key;
        element.items.push(item);

        setNewProduct({ name: "", price: "", quantity: "", sku: "" });
        setActive(false);
      }
    });
  };
  const toggle = () => {
    setActive(!active);
  };

  (function () {
    var forms = document.querySelectorAll(".needs-validation");

    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();

  return (
    <div className="bg-light">
      <Navbar />
      <div className="container bg-white ">
        <div className="pt-3">
          <h2>Mis ordenes de compra</h2>
          <p>Selecciona una orden de compra para examinar tus productos</p>
        </div>
        <div className="d-md-flex gap-5 pt-3">
          <TableComponent items={orders} selected={setSelectOrder} />
          {orderFiltered && (
            <TableItems orderFiltered={orderFiltered} toggle={toggle} />
          )}
        </div>

        <Modal active={active} toggle={toggle}>
          <h4>Agregar producto a la orden de compra</h4>
          <div className="pt-5 d-flex justify-content-center ">
            <form className="needs-validation" noValidate>
              <div className=" w-100 ">
                <div className="col-md-12">
                  <label htmlFor="validationCustom01" className="form-label">
                    SKU
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    value={newProduct.sku}
                    onChange={(e) =>
                      setNewProduct((value) => ({
                        ...value,
                        sku: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="validationCustom01" className="form-label">
                    Nombre del producto
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct((value) => ({
                        ...value,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="validationCustom01" className="form-label">
                    Cantidad
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    value={newProduct.quantity}
                    onChange={(e) =>
                      setNewProduct((value) => ({
                        ...value,
                        quantity: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="validationCustom01" className="form-label">
                    Precio
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct((value) => ({
                        ...value,
                        price: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-center pt-5">
                <button className="btn btn-primary " onClick={addItem}>
                  Añadir producto
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Orders;
