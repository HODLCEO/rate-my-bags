const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static("public"));

// Frame 1: Entry Frame
app.get("/frame", (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta property="og:title" content="Rate My Bags" />
      <meta property="og:image" content="https://rate-my-bags-production.up.railway.app/public/preview.png" />
      <meta name="fc:frame" content="vNext" />
      <meta name="fc:frame:image" content="https://rate-my-bags-production.up.railway.app/public/preview.png" />
      <meta name="fc:frame:button:1" content="Show My Bags" />
      <meta name="fc:frame:post_url" content="https://rate-my-bags-production.up.railway.app/frame/rate" />
    </head>
    <body>
      <h1>Rate My Bags Frame is live</h1>
    </body>
  </html>
  `;
  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

// Frame 2: Rating Buttons
app.post("/frame/rate", (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta property="og:title" content="Rate My Bags" />
      <meta property="og:image" content="https://rate-my-bags-production.up.railway.app/public/preview.png" />
      <meta name="fc:frame" content="vNext" />
      <meta name="fc:frame:image" content="https://rate-my-bags-production.up.railway.app/public/preview.png" />
      <meta name="fc:frame:button:1" content="Dumpster" />
      <meta name="fc:frame:button:2" content="Okayish" />
      <meta name="fc:frame:button:3" content="Respectable" />
      <meta name="fc:frame:button:4" content="Giga" />
      <meta name="fc:frame:post_url" content="https://rate-my-bags-production.up.railway.app/frame/result" />
    </head>
    <body>
      <h1>How strong are these bags?</h1>
    </body>
  </html>
  `;
  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

// Frame 3: Final Result
app.post("/frame/result", (req, res) => {
  const rating = req.body.untrustedData.buttonIndex || "Unknown";
  const ratingLabels = ["", "Dumpster", "Okayish", "Respectable", "Giga"];
  const tier = ratingLabels[parseInt(rating)] || "Mystery";

  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta property="og:title" content="You were rated ${tier}" />
      <meta property="og:image" content="https://rate-my-bags-production.up.railway.app/public/${tier.toLowerCase()}.png" />
      <meta name="fc:frame" content="vNext" />
      <meta name="fc:frame:image" content="https://rate-my-bags-production.up.railway.app/public/${tier.toLowerCase()}.png" />
      <meta name="fc:frame:button:1" content="Share" />
      <meta name="fc:frame:post_url" content="https://warpcast.com/~/compose?text=I%20just%20got%20rated%20${tier}%20on%20Rate%20My%20Bags!" />
    </head>
    <body>
      <h1>You were rated ${tier}</h1>
    </body>
  </html>
  `;
  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
