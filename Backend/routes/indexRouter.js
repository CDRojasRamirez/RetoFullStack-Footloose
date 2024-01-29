import { Router } from 'express';
import { verifyUser } from '../middlewares/authentication.js';
import productsRouter from './ProductsRouter.js';
import registerRouter from './RegisterRouter.js';
import loginRouter from './LoginRouter.js';

const indexRouter = Router();

indexRouter.use('/products', productsRouter);
indexRouter.use('/register', registerRouter);
indexRouter.use('/login', loginRouter);

// Ruta principal con autenticación
indexRouter.get('/', verifyUser, (req, res) => {
    return res.json({ Status: 'Success', details: { rol_id: req.rol_id, user_id: req.user_id, name: req.name, email: req.email } });
});

// Ruta de logout
indexRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: 'Success' });
});

export { indexRouter };
