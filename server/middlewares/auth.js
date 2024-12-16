import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization']; // Retrieve the Authorization header
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token

    if (!token) {
        return res.json({
            success: false,
            message: "Not Authorized Login again",
        });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.SECRET);

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id; // Attach the user ID to the request
            next(); // Proceed to the next middleware
        } else {
            return res.json({
                success: false,
                message: "Not Authorized Login again",
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            message: "Invalid or Expired Token",
        });
    }
};

export default userAuth;
