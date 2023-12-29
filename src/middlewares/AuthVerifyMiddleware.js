const jwt = require('jsonwebtoken');

const AuthVerify = (req, res, next) => {
    const token = req.headers['token'];
    console.log(token);

    if (!token) {
        return res.status(401).json({ status: 'fail', message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, 'YourSecretKey', (error, decoded) => {
        if (error) {
            console.error('JWT verification error:', error);
            return res.status(401).json({ status: 'fail', message: 'Unauthorized: Invalid token' });
        }

        const email = decoded['data'];
        console.log('Decoded email:', email);

        // Add the email to request headers for further use in routes
        req.headers.email = email;

        // Continue with the next middleware or route handler
        next();
    });
};

module.exports = AuthVerify;




// const jwt = require('jsonwebtoken');


// const AuthVerify = (req, res, next) => {
//     try {
//         const token = req.headers['token'];
//         if (!token) {
//             return res.status(401).json({ status: 'fail', message: 'Unauthorized: No token provided' });
//         }

//         jwt.verify(token, 'YourSecretKey', (error, decoded) => {
//             if (error) {
//                 console.log(token);
//                 res.status(401).json({ status: 'Unauthorized' })
//             } else {
//                 const email = decoded['data'];
//                 console.log(email);
//                 req.headers.email = email;
//                 next();
//             }
//         })
//     } catch (error) {
//         return next(error);
//     }
// }

// module.exports = AuthVerify;