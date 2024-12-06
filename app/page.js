import Baner from "./components/Baner"
import Categories from "./components/categories"
import Products from "./components/Products"
import RootLayout from "./layout"

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

  return (
    <div className="container direction-column">

      <Baner title="Ofertas del mes"></Baner>

      <Categories categories={cat}/>

      <Products products={pro}/>

      <style>
        {`
        `}
      </style>

    </div>
  );
}

