import {mongooseConnect} from "@/lib/mongoose";
import {buffer} from 'micro';
import {Order} from "@/models/Order";
import {Product} from "@/models/Product";

const stripe = require('stripe')(process.env.STRIPE_SK);
const endpointSecret = "whsec_fd5352e34ba6d2d569d819764f257a961bb8d2992f8254a7363d56ba66aa9d41";
export default async function handler(req,res) {
    await mongooseConnect();
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const data = event.data.object;
            const orderId = data.metadata.orderId;
            const paid = data.payment_status === 'paid';
            const pID = data.metadata.price_data.product_data.name, qty = data.metadata.price_data.quantity;
            if(orderId && paid) {
                await Order.findByIdAndUpdate(orderId,{
                    paid:true,
                })
                const productDetail = await Product.findOne(pID)
                const stockDetail = productDetail[0].stock;

                await Product.findByIdAndUpdate("64dd199b179054576ae898b1",{
                    stock: 0
                })

            }
            // Then define and call a function to handle the event payment_intent.succeeded
            console.log(data);
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).send('ok');

}

export const config ={
    api: {bodyParser:false,}
};

// bright-thrift-cajole-lean
// acct_1NcUmOBpqqvgmZe6