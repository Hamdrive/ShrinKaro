import { Router } from "express";
import { validationResult, body } from "express-validator";
import { nanoid } from "nanoid";
import prisma from "./db";

const router = Router();

// Shorten
router.post(
  "/shrink",
  body("url").isURL({
    require_tld: true,
    require_valid_protocol: true,
    protocols: ["https"],
  }),
  async (req, res) => {
    //http://localhost:5000/api/shrink, {body: url: "https://www.abc.com"}
    const { url } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);
      res.json({ errors: errors.array() });
    }

    const generateShrinKode = nanoid(6);

    const shrinkUrl = await prisma.link.create({
      data: { fullUrl: url, shrinKode: generateShrinKode },
    });

    res.status(201).json({
      data: shrinkUrl,
    });
  }
);

// Get + Redirect
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const url = await prisma.link.findFirst({ where: { shrinKode: id } });
  if (!url) {
    res.status(404).json({
      message:
        "Requested URL not found, please check your shrink code and try again",
    });
  } else {
    res.status(301).redirect(url.fullUrl)
  }

});

export default router;
