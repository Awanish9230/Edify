import jwt from 'jsonwebtoken';

// Middleware to verify admin role
export const adminAuth = async (req, res, next) => {
    try {
        // First check if user is authenticated (should be done by auth middleware first)
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        // Check if user has admin role
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required.'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error in admin authentication'
        });
    }
};
