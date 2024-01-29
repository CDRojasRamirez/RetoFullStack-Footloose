import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
    const token = req.cookies.token;

    console.log(token);

    if(!token){
        return res.json({Error: 'No estas authenticado.'})
    } else {
        jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if(err) {
                return res.json({Error: 'El token es invalido'})
            } else {
                req.rol_id = decoded.rol_id;
                req.user_id = decoded.user_id;
                req.name = decoded.name;
                req.email = decoded.email;
                next()
            }
        })
    }
}