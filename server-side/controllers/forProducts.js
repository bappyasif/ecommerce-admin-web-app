const products = [
    {id: 1, title: "Product Een", description: "Product Description For Product Een Goes Here", price: 9.99, productPicture: "https://via.placeholder.com/150"},
    {id: 2, title: "Product Twee", description: "Product Description For Product Twee Goes Here", price: 6.99, productPicture: "https://via.placeholder.com/150"},
    {id: 3, title: "Product Drie", description: "Product Description For Product Drie Goes Here", price: 4.99, productPicture: "https://via.placeholder.com/150"},
    {id: 4, title: "Product Vier", description: "Product Description For Product Vier Goes Here", price: 2.99, productPicture: "https://via.placeholder.com/150"},
    {id: 5, title: "Product Vijf", description: "Product Description For Product Vijf Goes Here", price: 9.99, productPicture: "https://via.placeholder.com/150"},
    {id: 6, title: "Product Zes", description: "Product Description For Product Zes Goes Here", price: 6.99, productPicture: "https://via.placeholder.com/150"},
    {id: 7, title: "Product Zeven", description: "Product Description For Product Zeven Goes Here", price: 4.99, productPicture: "https://via.placeholder.com/150"},
    {id: 8, title: "Product Acht", description: "Product Description For Product Acht Goes Here", price: 2.99, productPicture: "https://via.placeholder.com/150"},
];

const getAllAvailableProducts = (req, res) => {
    res.status(201).json({msg: "list of all products", products: products})
}

const getSpecificProductFromProductsList = (req, res) => {
    let productId = req.params.prodId
    const product = products.find(item => item.id == productId);
    // console.log(productId, product, "product!!")
    res.status(201).json({msg: "Product specifics are enclosed", product: product})
}

module.exports = {
    getAllAvailableProducts,
    getSpecificProductFromProductsList
}