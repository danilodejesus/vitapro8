export default function ProductCart({products}) {
  console.log(products)

  return (
    <div>
      <h2>Products Cart</h2>

      <div className="products">
        {products.name}
      </div>
    </div>
  )
}