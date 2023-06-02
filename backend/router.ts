import { Router } from "express";
import { body } from "express-validator";
import { nanoid } from "nanoid";
import prisma from "./db";
import { handleInputValidation } from "./validation";

const router = Router();

// Shorten
router.post(
  "/shrink",
  body("url").isURL({
    require_tld: true,
    require_valid_protocol: true,
    protocols: ["https"],
  }),
  handleInputValidation,
  async (req, res) => {
    const url = req.body.url.toLowerCase();
    try {
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
    } catch (error) {
      console.error(error);
    }
  }
);

// Get + Redirect
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const url = await prisma.link.findFirst({ where: { shrinKode: id } });

  if (url) {
    res.status(200).json({ actualURl: url.fullUrl });
  } else {
    res.status(404).json("Reference does not exist");
  }
});

export default router;
