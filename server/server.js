const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// API mẫu
app.post("/api/chat", (req, res) => {
  const { message } = req.body;
  console.log("User said:", message);
  res.json({ reply: `Bot nhận được: ${message}` });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
