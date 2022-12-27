let orders = []

const getListOfAllOrders = (req, res) => {
    res.status(201).json({msg: "list of all orders", orders: orders})
}

const getSpecificOrderItem = (req, res) => {
    const orderId = req.params.orderId;
    const order = orders.find(item => item.id == orderId)
    res.status(201).json({msg: "list of all orders", order: order})
}

const newOrderIsPlaced = (req, res) => {
    const orderItems = req.body.orderItems;
    const orderTotal = req.body.orderTotal;
    const shippingAddress = req.body.shippingAddress;

    const item = {id: orders.length + 1, items: orderItems, totalPrice: orderTotal, shippingAddress: shippingAddress, billingMethod: "Cash On Delivery"}
    orders.push(item)

    console.log(orderItems, orderTotal);
    res.status(201).json({msg: "Order Submited", orders: orders})
}

module.exports = {
    getListOfAllOrders,
    newOrderIsPlaced,
    getSpecificOrderItem
}