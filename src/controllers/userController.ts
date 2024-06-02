import { comparePassword, getJwtSecret, encryptPassword } from "../utils/utils";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../postgres/services/userService";

export const createUserMiddleware = async (req, res) => {
    const data = { ...req.body };
    const passwordHash = await encryptPassword(data.password);
    const user = await createUser({ ...data, password: passwordHash });
    const { password, ...rest } = user.dataValues;
    res.status(200).json(rest);
}

export const loginMiddleware = async (req, res) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
        res.status(403).send("Forbidden");  
    }
    const isPasswordCorrect = await comparePassword(password, user.dataValues.password);

    if (!isPasswordCorrect) {
        res.status(401).send("Unauthorized");
    }

    const token = jwt.sign(
      { email: user.dataValues.email, role: user.dataValues.role },
      getJwtSecret(),
      {
        expiresIn: "2h",
      }
    );
    res.status(200).send(token);
}

export const authorizationMiddleware = async (req, res, next) => {
    const auth = req.headers["authorization"];
    if(!auth || !auth.startsWith("Bearer")) {
        return res.status(401).json({ status: 401, message: "Unauthorized" });
    }
    const [ _, encodedToken ] = auth.split(" ");
    try {
        const token = jwt.verify(encodedToken, getJwtSecret());
        console.log(token);
        req.user = token.email;
        req.role = token.role;
    } catch (err) {
        return res.status(403).json({ status: 401, message: "Forbidden" });
    }

    next();
}

export const isAdminMiddleware = (req, res, next) => {
  const role = req.role;
  if (role !== "admin") {
    res.status(403).json({ status: 403, message: "Forbidden" });
  }
  next();
};