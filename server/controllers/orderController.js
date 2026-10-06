import Order from '../models/Order.js';

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public (Guest) or Private (Logged in)
export const createOrder = async (req, res) => {
  try {
    const {
      customer,
      products,
      deliveryMethod,
      paymentMethod,
      paymentStatus,
      subtotal,
      shippingCost,
      total,
    } = req.body;

    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full customer and delivery information',
      });
    }

    if (!products || !products.length) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item',
      });
    }

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = await Order.create({
      orderId,
      user: req.user ? req.user._id : null,
      customer: {
        name: customer.name,
        email: customer.email || 'guest@store.local',
        phone: customer.phone,
        address: customer.address,
        city: customer.city || 'Lahore',
        province: customer.province || 'Punjab',
        postalCode: customer.postalCode || '54000',
        notes: customer.notes || '',
      },
      products: products.map((item) => ({
        id: item.id || item._id,
        title: item.title,
        price: Number(item.price),
        quantity: Number(item.quantity) || 1,
        thumbnail: item.thumbnail || '',
      })),
      deliveryMethod: deliveryMethod || 'Express Delivery (2-3 Days)',
      paymentMethod: paymentMethod || 'Cash on Delivery (COD)',
      paymentStatus:
        paymentStatus ||
        (paymentMethod === 'Cash on Delivery (COD)' ? 'Pending (COD)' : 'Paid'),
      status: 'Processing',
      subtotal: Number(subtotal) || 0,
      shippingCost: Number(shippingCost) || 0,
      total: Number(total) || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [
        { user: req.user._id },
        { 'customer.email': req.user.email.toLowerCase() },
      ],
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get order by ID or orderId
// @route   GET /api/orders/:id
// @access  Public
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    let order;

    if (id.startsWith('ORD-')) {
      order = await Order.findOne({ orderId: id });
    } else {
      order = await Order.findById(id);
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Order not found' });
  }
};

// @desc    Get all orders (with filters and search)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { 'customer.name': { $regex: search, $options: 'i' } },
        { 'customer.email': { $regex: search, $options: 'i' } },
        { 'customer.phone': { $regex: search, $options: 'i' } },
        { paymentMethod: { $regex: search, $options: 'i' } },
      ];
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const { id } = req.params;

    const order = id.startsWith('ORD-')
      ? await Order.findOne({ orderId: id })
      : await Order.findById(id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    const updatedOrder = await order.save();

    res.json({
      success: true,
      message: `Order status updated to ${updatedOrder.status}`,
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
