// userSearch.ts

import express from "express";
import fs from "fs/promises";

const userSearchRouter = express.Router();

// Route for searching by name
userSearchRouter.get("/search/name", async (req, res) => {
  try {
    const usersData = await fs.readFile("users.json", "utf8");
    const users = JSON.parse(usersData);

    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Name parameter is required" });
    }

    const searchResult = Object.values(users).filter((user: any) =>
      user.username.toLowerCase().includes((name as string).toLowerCase())
    );

    res.json(searchResult);
  } catch (error) {
    console.error("Error reading users data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for searching by email
userSearchRouter.get("/search/email", async (req, res) => {
  try {
    const usersData = await fs.readFile("users.json", "utf8");
    const users = JSON.parse(usersData);

    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }

    const searchResult = Object.values(users).filter((user: any) =>
      user.email.toLowerCase().includes((email as string).toLowerCase())
    );

    res.json(searchResult);
  } catch (error) {
    console.error("Error reading users data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default userSearchRouter;
