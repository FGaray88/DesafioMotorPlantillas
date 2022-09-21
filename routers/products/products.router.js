
const express = require("express")
const Products = require("../../model/products");
const products = new Products();


const router = express.Router();


router.get("/", (req, res) => {    
  const data = products.getAll()
  res.json(data)
})

router.get("/:id",  (req, res) => {
  const { id } = req.params;
  const data =  products.getById(+(id))
  if(data==undefined){
    res.status(404).json({ success: false, error: 'No se ha encontrado el producto' });
  }
  res.send(data)
});

router.post("/",  (req, res) => {
  const { nombre, precio, picture, descr } = req.body;
  if ( !nombre || !precio || !picture || !descr) {
      return res.status(400).json({ success: false, error: 'Wrong body format' });
  }
  const newProduct = {
    nombre,
    precio: +(precio),
    picture,
    descr
  };
  const data =  products.save(newProduct)
  return res.json({ success: true, result: data });
});



router.put("/:id",  (req, res) => {
  const { id } = req.params;
  const { nombre, precio, picture, descr } = req.body;
  if ( !nombre || !precio || !picture || !descr) {
    return res.status(400).json({ success: false, error: 'Wrong body format' });
  }
  const newProduct = {
    nombre,
    precio: +(precio),
    picture,
};
  const updatedID =  products.updateById(+(id), newProduct)
  return res.json(updatedID);
});

router.delete("/:id",  (req, res) => {
  const { id } = req.params;
  const data =  products.deleteById(+(id))
  res.send("El producto se ha eliminado correctamente")
});

module.exports = router;


