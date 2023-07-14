const bodyParser = require("body-parser");

const cartQueries = require("../util/MYSQL_QUERIES/cart_queries");
const productQueries = require("../util/MYSQL_QUERIES/get_products");

exports.addToCart = [
  bodyParser.json(),
  async (req, res) => {
    const product_id = req.body.id;
    const cust_id = req.cust_id;

    const product = await productQueries.selectedPorduct(product_id);
    const result = await cartQueries.addToCart(cust_id, product_id, product[0]);
    // console.log(result);
    res.status(200).json(result);
  },
];

exports.getCartItems = async (req, res) => {
  const cust_id = req.cust_id;

  const data = await cartQueries.getCartItems(cust_id);
  const images = await productQueries.productImages();

  // convertin images from binary data to stringURL.
  const imagesData = images.map((image) => {
    const bufferData = Buffer.from(image.image_file);
    const stringData = bufferData.toString("utf-8");

    return {
      image_id: image.image_id,
      product_id: image.product_id,
      image_file: stringData,
    };
  });

  // combining cart products data with product images
  const cartItems = data.data.map((item) => {
    const data = imagesData.filter((image) => {
      return image.product_id === item.product_id;
    });
    return {
      cart_item_id: item.cart_item_id,
      product_id: item.product_id,
      product_name: item.product_name,
      product_quantity: item.product_quantity,
      cart_item_quantity: item.quantity,
      product_price: item.product_price,
      product_discount: item.product_discount,
      product_images: data,
    };
  });
  res.status(200).json(cartItems);
};

exports.deleteCartItems = [
  bodyParser.json(),
  async (req, res) => {
    const { product_id, cart_item_id, qty } = req.body;
    // console.log(product_id);
    const result = await cartQueries.deleteCartItem(
      product_id,
      cart_item_id,
      qty
    );
    // console.log(req.body, 'is the request body');
    res.status(200).json(result);
  },
];
