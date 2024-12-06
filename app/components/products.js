'use client'
import { useEffect, useState } from "react";

export default function Products({products}) {
  if (!products?.length) return <p>No se encontraron productos.</p>;

  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => ({...acc, [product.id]: 0}), {})
  );

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(storedCart)
    
    const updateQuantitis = storedCart.reduce((acc, {product, cantidad}) => {
      if (quantities.hasOwnProperty(product)) {
        console.log({...quantities, [product]: cantidad})
        acc[product] = cantidad
      }
      return acc;
    }, {...quantities})
    
    setQuantities(updateQuantitis)
  }, []);

  const handleProductCart = (cantidad) => {
    const hasQuantity = // filtrar productos con cantidad
    Object.fromEntries(
      Object.entries(cantidad)
        .filter(([key, value]) => value != 0)) 

    const productsCart = Object.entries // formato para guardar el localstorage
      (hasQuantity).map(([key, value]) => ({
        product: key,
        cantidad: value
      }))
    console.log(productsCart)
    localStorage.setItem('cart', JSON.stringify(productsCart))
  }

  // Manejo de eventos
  const addToCart = (id) => {
    setQuantities({...quantities, [id]: 1 }); //Inicializar la cantidad en 1 $$ variable para manejar HTML
    const cantidad = {...quantities, [id]: 1 } // uso la variable cantidad pq actualiza bien el estado
    handleProductCart(cantidad)
  }

  const increaseQuantity = (id) => {
    setQuantities({...quantities, [id]: quantities[id] + 1 });
    const cantidad = {...quantities, [id]: quantities[id] + 1 }
    handleProductCart(cantidad)
  }

  const decreaseQuantity = (id) => {
    if(quantities[id] > 1) {
      setQuantities({...quantities, [id]: quantities[id] - 1 });
      const cantidad = {...quantities, [id]: quantities[id] - 1 }
      handleProductCart(cantidad)
    } else {
      setQuantities({...quantities, [id]: 0 }); // Volver a "Agregar al Carrito"
      const cantidad = {...quantities, [id]: 0 }
      handleProductCart(cantidad)
    }
  }

  return (
    <div className="products">
      {
        products && products?.map((product) => (
          <figure className="product" key={product.id}>
            <p className="discount">{product.discount_percentaje}</p>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPcxTR0hGjy3M7HR74pS6giYusTdldjIEqbw&s" />
            <p className="brand">{product.brand}</p>
            <p className="name">{product.name}</p>
            <div className="prices flex">
              <p className="price priceDiscount">S/.{product.price}.00</p>
              <p className="price">S/.{product.price_discount}.00</p>
            </div>

            {/* <p className="retiroTienda">- Retiro en tienda</p>
            <p className="despachoDomicilio">- Despacho a domicilio</p> */}

            { quantities[product.id] === 0 ? (
              <button
                className="addCart"
                onClick={() => addToCart(product.id)}>Agregar al Carrito</button>
            ) : (
              // Controles de cantidad
              <div className="addCarts flex align-center">
                <button
                  className="addCart w-30"
                  onClick={() => decreaseQuantity(product.id)}>-</button>
                <span>{quantities[product.id]}</span>
                <button
                  className="addCart w-30"
                  onClick={() => increaseQuantity(product.id)}>
                  +
                </button>
              </div>
            )}

          </figure>
        ))
      }

      <style>
        {`
          .products {
            width: 100%;
            background-color: #1b1919;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            padding: 10px 0;
            border-radius: 12px;
            margin: 20px auto 0 auto;
          }

          .product {
            border: 1px solid gray;
            padding: 5px;
            box-sizing: border-box;
            border-radius: 8px;
            width: 19%;
            margin: 10px auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: white;
            align-items: flex-start;
            position: relative;
          }

          .discount {
            border-radius: 12px;
            padding: 5px;
            box-sizing: border-box;
            background: #05364C;
            color: white;
            font-weight: bold;
            display: inline-block;
            position: absolute;
            top: 10px;
            left: 10px;
          }

          .product img {
            max-width: 150px;
            margin: 0 auto;
          }

          .brand {
            font-size: 13px;
            margin-bottom: 10px;
            color: #888888;
          }

          .name {
            font-weight: bold;
            margin-bottom: 20px;
            height: 32px;
          }

          .price {
            margin-bottom: 20px;
            font-weight: bold;
            color: #FD9500;
          }

          .priceDiscount {
            color: #9b9b9b;
            margin-right: 5px;
            position: relative;
          }
          .priceDiscount:before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 1px;
            margin: auto;
            background-color: #9b9b9b;
          }

          .retiroTienda {
            margin-top: 5px;
            font-size: 14px;
          }

          .despachoDomicilio {
            font-size: 14px;
            margin-bottom: 15px;
          }

          .addCarts {
            width: 100%;
            justify-content: space-evenly;
          }
        `}
      </style>
    </div>
  )
}