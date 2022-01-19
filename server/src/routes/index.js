
const userRouter = require('./user');
const cartRouter = require('./cart');

function route(app) {
    app.use('/user',userRouter);
    app.use('/cart',cartRouter);
}

module.exports = route;
