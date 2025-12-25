import { Router } from "express";
import authRoutes from "./auth.routes.js";
import contentRoutes from "./content.routes.js";
import subscriptionRoutes from "./subscription.routes.js";

const router = new Router();

router.use("/auth", authRoutes);
router.use("/content", contentRoutes);
router.use("/sub-info", subscriptionRoutes);

export default router;
