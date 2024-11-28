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
            <img src="https://ludga.com.co/wp-content/uploads/2024/03/TENSIOMETRO_1.jpg" />
            <p className="brand">{product.brand}</p>
            <p className="name">{product.name}</p>
            <div className="prices flex">
              <p className="price priceDiscount">S/.{product.price}.00</p>
              <p className="price">S/.{product.price_discount}.00</p>
            </div>

            <p className="retiroTienda">- Retiro en tienda</p>
            <p className="despachoDomicilio">- Despacho a domicilio</p>

            { quantities[product.id] === 0 ? (
              <button
                className="addCart"
                onClick={() => addToCart(product.id)}>Agregar al Carrito</button>
            ) : (
              // Controles de cantidad
              <div className="addCarts flex align-center">
                <button
                  className="addCart w30"
                  onClick={() => decreaseQuantity(product.id)}>-</button>
                <span>{quantities[product.id]}</span>
                <button
                  className="addCart w30"
                  onClick={() => increaseQuantity(product.id)}>
                  +
                </button>
              </div>
            )}

          </figure>
        ))
      }
    </div>
  )
}