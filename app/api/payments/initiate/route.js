// app/api/payments/initiate/route.js
//
// এই route Express-এর মতোই "controller"। ফাইল সিস্টেম রুট ঠিক করে
// (app/api/payments/initiate/route.js → POST /api/payments/initiate),
// আলাদা করে app.post('/api/payments/initiate', ...) লেখার দরকার নেই।
//
// এখানে যা হচ্ছে (Stripe checkout session create-এর সমতুল্য ফ্লো):
//   1. client থেকে শুধু orderId/cart reference নেওয়া হয় — amount না
//   2. Supabase থেকে actual cart items + price server-side পুনরায় ভেরিফাই করা হয়
//   3. Supabase-এ "pending" status দিয়ে order insert হয় (service_role client দিয়ে)
//   4. BDGate-কে POST করে payment session বানানো হয়
//   5. payment_url client-কে ফেরত দেওয়া হয় redirect করার জন্য
/*
import { supabaseAdmin } from '@/app/lib/supabaseAdmin';
import 'dotenv/config';

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerInfo, items, deliveryCharge } = body;

    // ---- Basic input validation ----
    if (!customerInfo?.name || !customerInfo?.phone || !Array.isArray(items) || items.length === 0) {
      return Response.json({ error: 'Invalid order data' }, { status: 400 });
    }

    // ---- সার্ভার-সাইড price recalculation ----
    // client পাঠানো item.price কখনো trust করা যাবে না — DevTools দিয়ে বদলানো সম্ভব।
    // প্রতিটা item-এর id দিয়ে Supabase "products" টেবিল থেকে আসল দাম টেনে আনছি।
    const productIds = items.map((item) => item.id);
    const { data: products, error: productError } = await supabaseAdmin
      .from('products')
      .select('id, price, title')
      .in('id', productIds);

    if (productError || !products || products.length === 0) {
      return Response.json({ error: 'Could not verify products' }, { status: 400 });
    }

    const priceMap = new Map(products.map((p) => [p.id, Number(p.price)]));

    let totalPrice = 0;
    const verifiedItems = items.map((item) => {
      const realPrice = priceMap.get(item.id);
      if (realPrice === undefined) {
        throw new Error(`Unknown product id: ${item.id}`);
      }
      totalPrice += realPrice * item.quantity;
      return { ...item, price: realPrice }; // client-এর price বাদ, DB-এর price রাখা হলো
    });

    const grandTotal = totalPrice + Number(deliveryCharge || 0);

    if (grandTotal < 1) {
      return Response.json({ error: 'Invalid order amount' }, { status: 400 });
    }

    // ---- Supabase-এ pending order তৈরি ----
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        customer_name: customerInfo.name,
        phone: customerInfo.phone,
        division: customerInfo.division,
        district: customerInfo.district,
        upazila: customerInfo.upazila,
        area: customerInfo.area,
        address_note: customerInfo.note || '',
        items: verifiedItems,
        total_price: totalPrice,
        delivery_charge: deliveryCharge,
        grand_total: grandTotal,
        payment_method: 'card',
        payment_status: 'pending', // নতুন কলাম — নিচে নোট দেখো
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order insert failed:', orderError);
      return Response.json({ error: 'Could not create order' }, { status: 500 });
    }

    // ---- BDGate-কে payment session তৈরির অনুরোধ ----
    const bdgateRes = await fetch(`https://api.bdgate.net/api/v1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-api-key": `bd_test_149cbb37633da0224d66f142d577176225817537`, // ✅ use env var
      },
      body: JSON.stringify({
        full_name: customerInfo.name,
        email: customerInfo.email || 'no-email@yourdomain.com',
        amount: Number(grandTotal), // ✅ ensure numeric
        metadata: { order_id: order.id },
        redirect_url: `http://localhost:3000/order/success?orderId=${order.id}`,
        cancel_url: `http://localhost:3000/order/cancelled?orderId=${order.id}`,
      }),
    });


    if (!bdgateRes.ok) {
      // BDGate call ব্যর্থ হলে order-টা "failed" করে রাখা ভালো, অনির্দিষ্টকাল pending না রেখে
      await supabaseAdmin.from('orders').update({ payment_status: 'failed' }).eq('id', order.id);
      return Response.json({ error: 'Payment gateway error' }, { status: 502 });
    }

    const bdgateData = await bdgateRes.json();

    // BDGate-এর payment_id সংরক্ষণ করা হচ্ছে যাতে webhook আসলে মেলানো যায়
    await supabaseAdmin
      .from('orders')
      .update({ bdgate_payment_id: bdgateData.payment_id })
      .eq('id', order.id);

    return Response.json({
      paymentUrl: bdgateData.payment_url,
      orderId: order.id,
    });
  } catch (err) {
    console.error('Payment initiate error:', err);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}*/