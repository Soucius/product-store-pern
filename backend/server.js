import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {
            requested: 1
        });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ success: false, message: "Rate limit exceeded" });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ success: false, message: "Access denied for bots" });
            } else {
                return res.status(403).json({ success: false, message: "Access denied" });
            }
        }

        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            res.status(403).json({ success: false, message: "Spoofed bot access denied" });
            return;
        }

        next();
    } catch (error) {
        console.error("Arcjet protection error:", error);
        
        next(error);
    }
});

app.use("/api/products", productRoutes);

async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price decimal(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        console.log("Database initialized successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);

        process.exit(1);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});