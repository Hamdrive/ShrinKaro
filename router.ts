import { Router } from "express";

const router = Router();

// Shorten
router.post("/url", (req, res) => {
  //http://localhost:5000/api/url?q=abc.com
  const { q } = req.query;
  res.json({
    message: `Received your url ${q}, and stored in DB, here's your code`,
  });
});

// Get + Redirect
router.get("/id", (req, res) => {
  res.json({
    message: `Received your url with the code ${req.query.id}, redirecting you to the actual website!`,
  });
});


export default router;
