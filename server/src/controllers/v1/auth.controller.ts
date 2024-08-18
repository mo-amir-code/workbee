import { DB } from "../../config/index.js";
import { apiHandler } from "../..//middlewares/index.js";
import { loginValidator, registerValidator } from "../../vaildators/index.js";
import { UserTable } from "../../db/schemas/index.js"
import { eq } from "drizzle-orm";

const registerUser = apiHandler(async (req, res) => {
    const { name, username, email, password } = await registerValidator.validateAsync(req.body);

    await DB.insert(UserTable).values({
        name,
        username,
        email,
        password
    })

    const data = await DB.select().from(UserTable);

    return res.send(data);
});

const loginUser = apiHandler(async (req, res) => {
    const { email, password } = await loginValidator.validateAsync(req.body);

    const data = await DB.select().from(UserTable).where(eq(UserTable.email, email));

    return res.send(data);
});


export {
    registerUser,
    loginUser
}