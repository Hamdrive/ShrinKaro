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

    const checkExistingFullUrl = await prisma.link.findFirst({
      where: { fullUrl: url },
    });

    if (checkExistingFullUrl) {
      res.status(201).json({
        data: checkExistingFullUrl,
      });
    } else {
      let generateShrinKode = nanoid(6);

      while (
        await prisma.link.findUnique({
          where: {
            shrinKode: generateShrinKode,
          },
        })
      ) {
        generateShrinKode = nanoid(6);
      }

      const shrinkUrl = await prisma.link.create({
        data: { fullUrl: url, shrinKode: generateShrinKode },
      });

      res.status(201).json({
        data: shrinkUrl,
      });
    }
  }
);

// Get + Redirect
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const url = await prisma.link.findFirst({ where: { shrinKode: id } });

  console.log("here",id, url)
  
  if (url) {
    res.status(307).json({actualURl: url.fullUrl});
  } else {
    res.status(404).json("Reference does not exist");
  }
});

export default router;
