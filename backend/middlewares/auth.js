import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        // First check cookies
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; 

        if (!token) {
            return res.status(400).json({ message: "Unauthorized Token" });
        }

        console.log("Token received:", token); 

        const decoded = jwt.verify(token, 'socialMedia@123');
        console.log("Decoded token:", decoded); 

        req.user = decoded.userId; 
        next();
    } catch (error) {
        console.error("Authentication error:", error); 
        res.status(500).json({ message: 'Authentication failed' });
    }
};

export default auth;
