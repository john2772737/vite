const Order = require('./../models/orders.model')

const createOrder = async(req,res)=>{

    try {
        
        const order = await Order.create(req.body)
        res.status(200).json(order)
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

module.exports={createOrder}