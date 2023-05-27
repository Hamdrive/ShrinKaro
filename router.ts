import { Router } from "express";
import { validationResult, body } from "express-validator";
import { init } from "@paralleldrive/cuid2";
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

    const createId = init({ length: 6 });
    const generateShrinKode = createId();

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
    res
      .status(404)
      .json({
        message:
          "Requested URL not found, please check your shrink code and try again",
      });
  }
  res.status(200).json({
    message: `Received your url with the code ${id}, redirecting you to the actual website!`,
  });
});

export default router;
