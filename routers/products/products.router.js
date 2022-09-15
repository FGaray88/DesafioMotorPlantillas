
const express = require("express")
const Contenedor = require("../../data/container")
const products = new Contenedor("data/products.json")


const router = express.Router();


router.get("/", async (req, res) => {    
  const data = await products.getAll()
  console.log(data)
  res.json(data)
})

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await products.getById(+(id))
  res.send(data)
});

router.post("/", async (req, res) => {
  const { title, price, thumbnail } = req.body;
  console.log(req.body);
  if ( !title || !price || !thumbnail) {
      return res.status(400).json({ success: false, error: 'Wrong body format' });
  }
  const newProduct = {
      title,
      price: +(price),
      thumbnail
  };
  const data = await products.save(newProduct)

  
  console.log(data)
  return res.json({ success: true, result: data });
});



router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;
  console.log(req.body);
  if ( !title || !price || !thumbnail) {
      return res.status(400).json({ success: false, error: 'Wrong body format' });
  }
  const newProduct = {
    title,
    price: +(price),
    thumbnail,
    id: +(id)
};
  const updatedID = await products.updateById(+(id), newProduct)
  return res.json(updatedID);

});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await products.deleteById(+(id))
  res.send("El producto se ha eliminado correctamente")
});

module.exports = router;


