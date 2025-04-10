const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

// Frame 1: Default - Show My Bags
app.get("/frame", (req, res) => {
  res.json({
    image: "https://yourdomain.com/preview.png",
    buttons: [
      {
        label: "Show my Bags",
        action: "post",
        target: "https://yourdomain.com/frame/rate"
      }
    ]
  });
});

// Frame 2: Rate Buttons
app.post("/frame/rate", (req, res) => {
  res.json({
    image: "https://yourdomain.com/preview.png",
    buttons: [
      {
        label: "Dumpster",
        action: "post",
        target: "https://yourdomain.com/frame/result?choice=Dumpster"
      },
      {
        label: "Okayish",
        action: "post",
        target: "https://yourdomain.com/frame/result?choice=Okayish"
      },
      {
        label: "Respectable",
        action: "post",
        target: "https://yourdomain.com/frame/result?choice=Respectable"
      },
      {
        label: "Giga",
        action: "post",
        target: "https://yourdomain.com/frame/result?choice=Giga"
      }
    ]
  });
});

// Frame 3: Final Result
app.post("/frame/result", (req, res) => {
  const rating = req.query.choice || "Unknown";
  res.json({
    image: `https://yourdomain.com/public/${rating.toString().toLowerCase()}.png`,
    buttons: [
      {
        label: "Share",
        action: "link",
        target: "https://warpcast.com/~/compose?text=I%20just%20rated%20my%20bags!"
      }
    ]
  });
});

app.listen(PORT, () => console.log(`Rate My Bags running on port ${PORT}`));
