import Categories from "../components/categories";
import Products from "../components/products";

async function getCategory() {
  const res = await fetch(`http://127.0.0.1:8000/api/category/`, {
    cache: 'force-cache',
  })
  return res.json()
}
 
async function getProduct() {
  const res = await fetch(`http://127.0.0.1:8000/api/product/`, {
    cache: 'force-cache',
  })
  return res.json()
}

export default async function Page() {
  const categories = getCategory()
  const products = getProduct()

  const [cat, pro] = await Promise.all([categories, products])
  console.log(cat, pro)

  return (
    <>
      <header className="header">
        <div className="container">
          <a className="logo">VitaPro8</a>

          <nav className="nav">
            <a>Cart</a>
            <a>Sign Up</a>
            <a>Log in</a>
          </nav>
        </div>
      </header>
      <div className="container">
        <Categories categories={cat}/>
        <Products products={pro}/>
      </div>
    </>
  );
}

