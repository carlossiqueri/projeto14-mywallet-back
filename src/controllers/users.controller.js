import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function singup(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });
    if (user) return res.status(409).send("E-mail já cadastrado!");

    const hash = bcrypt.hashSync(password, 10);

    await db.collection("users").insertOne({ name, email, password: hash });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function singin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(404).send("invalid email");
    const validatePassword = bcrypt.compareSync(password, user.password);
    if (!validatePassword) return res.status(401).send("invalid password");

    const token = uuid();
    await db
      .collection("session")
      .insertOne({ userName: user.name, userId: user._id, token });
    res.status(200).send(token);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function userAuth(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) res.status(404).send("token not found");

  try {
    const currentSession = await db.collection("session").findOne({ token });
    if (!currentSession) return res.status(401).send("invalid token");

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(currentSession.userId) });

    delete user.password;

    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
