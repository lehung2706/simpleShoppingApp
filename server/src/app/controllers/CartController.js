const Cart = require('../models/Cart');

class CartController  {
    addToCart(req, res, next) {
        const user = new Cart(req.body)
        user.save()
            .then(() => {
                res.status(201).send(req.body);
            } )
            .catch(next)
    }

    findItem(req, res, next) {
        Cart.findOne({username: req.body.username, id: req.body.id})
            .then((data)=>{
                if(data){
                    res.send({exists:true,data})
                }
                else{
                    res.send({exists:false})
                }
            })
    }

    listItem(req, res, next) {
        Cart.find({username: req.params.username})
            .then((data) => {
                if(data){
                    res.status(200).send(data)
                }
                else{
                    
                }
            })
    }

    updateItem(req, res, next){
        Cart.findOneAndUpdate({id:req.body.id,username:req.body.username}, {quantity:req.body.quantity,total:req.body.total})
            .then((data) => res.send(data))
            .catch(next)

    }

    deleteItem(req, res, next){
        Cart.deleteOne({_id:req.params.id})
            .then(() => res.status(201))
            .catch(next)
    }

    deleteAll(req, res, next){
        Cart.deleteMany({username:req.params.username})
            .then(() => res.status(201))
            .catch(next)
    }
}

module.exports = new CartController();