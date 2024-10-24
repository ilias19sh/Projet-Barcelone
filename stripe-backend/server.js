const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
const stripe = Stripe('sk_test_51QDS6kDsuOPau1JCub1x1yV2wx1KWsFNL354Qlwz54BSgj8SkMmbNB4at6UXPpMVo96sUXaKmT9qTVegqmCPEz9900IPRokRV5'); // Remplace par ta clé secrète Stripe
 // Remplace par ta clé secrète Stripe
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint de création de session de paiement
app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'eur', // Change en fonction de ta devise
          product_data: {
            name: item.name,
            // Optionnel : Ajoute une description ou une image
          },
          unit_amount: item.price * 100, // Montant en cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Remplace par ton URL de succès
      cancel_url: 'http://localhost:3000/cancel', // Remplace par ton URL d'annulation
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
