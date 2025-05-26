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

    const [deliveryResult] = await conn.execute(
      "INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)",
      [delivery.address, delivery.receiver, delivery.contact]
    );
    const deliveryId = deliveryResult.insertId;

    const [orderResult] = await conn.execute(
      "INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)",
      [firstBookTitle, totalQuantity, totalPrice, userId, deliveryId]
    );
    const orderId = orderResult.insertId;

    const [cartItems, _] = await conn.query(
      `SELECT book_id, quantity FROM cartItems WHERE id IN (?)`,
      [items]
    );

    const orderItems = cartItems.map((i) => [orderId, i.book_id, i.quantity]);
    const [finalResult] = await conn.query(
      "INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?",
      [orderItems]
    );

    deleteCartItems(conn, items);

    res.status(StatusCodes.OK).json(finalResult);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).end();
  } finally {
    conn.end();
  }
};

const deleteCartItems = async (conn, items) => {
  const sql = `DELETE FROM cartItems WHERE id IN (?)`;

  return await conn.query(sql, [items]);
};

const getOrders = (req, res) => {
  res.json("주문 목록 조회");
};

const getOrderDetail = (req, res) => {
  res.json("주문 목록 조회");
};

module.exports = { order, getOrders, getOrderDetail };
