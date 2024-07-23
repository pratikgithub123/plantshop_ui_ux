const Order = require('../mode/o');

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        if (!orders) {
            return res.status(404).json({ message: 'Orders not found' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};