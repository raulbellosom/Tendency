export const getItems = () => {
  const url = "https://eshop-deve.herokuapp.com/api/v2/orders";
  fetch(url, {
    method: "get",
    headers: {
      Authorization:
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};
