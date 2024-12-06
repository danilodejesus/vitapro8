'use client'
import Link from "next/link";
import { useEffect, useState } from "react"
import Baner from "../components/Baner";

export default function Carrito() {
  const [products, setProducts] = useState('');
  const [subtotal, setSubtotal] = useState('');

  useEffect(() => {
    const productsApi = [];
    const subtotales = [];
    const productLocalStorage = localStorage.getItem('cart')
    const productParse = JSON.parse(productLocalStorage).map((p) => {
      Number(p.product)
      console.log(p.product)
      fetch(`http://127.0.0.1:8000/api/product/${p.product}/`)
        .then(response => response.json())
        .then(data => {
          const updatedData = { ...data, cantidad: p.cantidad};
          // subtotales.push({...subtotales, p.cantidad * p.cantidad})
          productsApi.push(updatedData);
          setProducts([...productsApi])

          const updateArray = productsApi.map(item => ({
            ...item,
            subtotal: item.cantidad * item.price
          }))
      
          const totalSum = updateArray.reduce((sum, item) => sum + item.subtotal, 0)

          setSubtotal(totalSum)
      
          console.log(updateArray, totalSum)
        })
    })
    console.log(productsApi)
  
    
  }, [])

  if (!products?.length) return <p>No se ecncontraron productos</p>

  return (
    <>
      <div className="container">
        <Baner title="Tus productos"></Baner>
      </div>

      <div className="container h-48">
        <div className="carrito flex">

          <div className="carrito-products">
            <div className="carrito-product cart-header flex align-center">
              <img width="80" src="https://ludga.com.co/wp-content/uploads/2024/03/TENSIOMETRO_1.jpg"/>
              <p className="cart-name">Productos</p>
              <p className="cart-price">Precio</p>
              <p className="cart-cantidad">Cantidad</p>
              <p className="cart-subtotal">Subtotal</p>
            </div>
            {products && products?.map(e => (
              <div className="carrito-product cart-body flex align-center" key={e.id}>
                <img width="80" src="https://ludga.com.co/wp-content/uploads/2024/03/TENSIOMETRO_1.jpg"/>
                <p className="cart-name">{e.name}</p>
                <p className="cart-price">S/. {e.price}.00</p>
                <p className="cart-cantidad">{e.cantidad}</p>
                <p className="cart-subtotal">S/. {e.price * e.cantidad}.00</p>
              </div>
            ))}
          </div>

          <div className="carrito-resume">
            <h4>TOTALES DEL CARRITO</h4>
            <ul>
              <li className="flex">
                <p>Subtotal</p>
                <p>S/. {subtotal}.00</p>
              </li>
              <li className="flex">
                <p>Envío</p>
                <p>Gratuito
                </p>
              </li>
              <li className="flex">
                <p>Total</p>
                <p>
                  S/. {subtotal}.00
                </p>
              </li>
              <li className="flex">
                <Link href="/finalizar-compra" className="addCart">Finalizar compra</Link>
              </li>
            </ul>
          </div>

        </div>

        <style>
          {`
            .carrito {
              justify-content: space-between;
              width: 100%;
              background: #1b1919;
              border-radius: 12px;
              overflow: hidden;
            }
            .carrito-products {
              width: 67%;
              max-height: 323px;
              overflow: auto;
              scrollbar-color: white black
            }
            .carrito h1  {
              color: white;
              font-weight: 600;
            }

            .cart-header {
              background: #1b1919;
              font-size: 15px;
            }

            .cart-header p {
              text-transform: capitalize;
              padding: 30px 10px;
              font-size: 16px;
              font-weight: bold;
            }

            .cart-header img {
              opacity: 0;
            }

            .cart-header .cart-name,
            .cart-header .cart-price,
            .cart-header .cart-cantidad {
              position: relative;
              left: 20px;
            }

            .cart-body .cart-subtotal,
            .cart-body .cart-price,
            .cart-body .cart-cantidad  {
              position: relative;
              min-width: 80px;
              text-align: center;
            }

            .carrito-product {
              border-bottom: 1px solid white;
              justify-content: space-between;
            }

            .carrito-product p {
              margin-right: 10px;
              color: white;
            }

            .cart-name {
              width: 300px;
            }

            .cart-price {
              width: 65px;
            }

            .carrito-resume {
              width: 33%;
              background-color: white;
              padding: 15px;
            }

            .carrito-resume h4 {
              margin: 0;
              padding: 16px 0 20px 0;
            }

            .carrito-resume ul {
              padding-top: 20px;
            }

            .carrito-resume li{
              justify-content: space-between;
              margin-bottom: 12px;
              font-size: 15px;
              font-weight: bold;
            }

            .carrito-resume li:last-child{
              margin: 20px 0 0 0;
            }
            
            .h-48 {
              min-height: 48vh;
            }
          `}
        </style>
      </div>
    </>
  );
}

