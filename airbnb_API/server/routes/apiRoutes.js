import express from "express";
import * as controller from "../controllers/controller.js";

const router = express.Router();

router.get("/airbnb", controller.item_get);
router.post("/airbnb", controller.item_post);
router.put("/airbnb/:id", controller.item_put);
router.delete("/airbnb/:id", controller.item_delete);

export default router;
