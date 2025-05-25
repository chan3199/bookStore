const getConn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const order = async (req, res) => {
  const conn = await getConn();
  try {
    const {
      items,
      delivery,
      totalQuantity,
      totalPrice,
      userId,
      firstBookTitle,
    } = req.body;

    const [deliveryResult] = await conn.query(
      "INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)",
      [delivery.address, delivery.receiver, delivery.contact]
    );
    const deliveryId = deliveryResult.insertId;

    const [orderResult] = await conn.query(
      "INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)",
      [firstBookTitle, totalQuantity, totalPrice, userId, deliveryId]
    );
    const orderId = orderResult.insertId;

    const orderItems = items.map((i) => [orderId, i.bookId, i.quantity]);
    const [finalResult] = await conn.query(
      "INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?",
      [orderItems]
    );

    res.status(StatusCodes.OK).json(finalResult);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  } finally {
    conn.end();
  }
};

const getOrders = (req, res) => {
  res.json("주문 목록 조회");
};

const getOrderDetail = (req, res) => {
  res.json("주문 목록 조회");
};

module.exports = { order, getOrders, getOrderDetail };
