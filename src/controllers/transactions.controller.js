import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function revenue(req, res) {
  const { value, description } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) res.status(401).send("token not found");
  try {
    const currentSession = await db.collection("session").findOne({ token });
    if (!currentSession) return res.status(401).send("invalid token");

    await db.collection("logs").insertOne({
      value,
      description,
      type: "revenue",
      date: dayjs().format("DD/MM"),
    });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function outgoing(req, res) {
  const { value, description } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) res.status(401).send("token not found");

  try {
    const currentSession = await db.collection("session").findOne({ token });
    if (!currentSession) return res.status(401).send("invalid token");

    await db.collection("logs").insertOne({
      value,
      description,
      type: "outgoing",
      date: dayjs().format("DD/MM"),
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
