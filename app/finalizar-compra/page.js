'use client'
import { useEffect, useState } from "react"
import Baner from "../components/Baner";

export default function FinalizarCompra() {
  const [products, setProducts] = useState('');
  const [subtotal, setSubtotal] = useState('');
  const [delivery, setDelivery] = useState('store');

  useEffect(() => {
    const productsApi = [];
    const productLocalStorage = localStorage.getItem('cart')
    JSON.parse(productLocalStorage).map((p) => {
      Number(p.product)
      fetch(`http://127.0.0.1:8000/api/product/${p.product}/`)
        .then(response => response.json())
        .then(data => {
          const updatedData = { ...data, cantidad: p.cantidad};
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
  }, [])

  const handleRadioDelivery = e => {
    setDelivery(e.target.value);
  }

  if (!products?.length) return <p>No se ecncontraron productos</p>

  return (
    <>
      <div className="container">
        <Baner title="Finalizar compra" height="60"></Baner>
      </div>
      <div className="container">
        <div className="carrito flex">
          <div className="left-side">
            <h4>Datos de entrega
            </h4>
            <form className="form">
              <div className="flex inputs">
                <div className="form-input">
                  <p>Nombres</p>
                  <input type="text" placeholder="Nombre" />
                </div>
                <div className="form-input">
                  <p>Apellidos</p>
                  <input type="text" placeholder="Apellido" />
                </div>
              </div>
              <div className="flex inputs">
                <div className="form-input">
                  <p>Email</p>
                  <input type="text" placeholder="Email" />
                </div>
                <div className="form-input">
                  <p>Celular</p>
                  <input type="text" placeholder="Celular" />
                </div>
              </div>
              
              <div className="flex radios">
                <div className="form-radio">
                  <label htmlFor="store">Recoger en tienda</label>
                  <input 
                    type="radio" 
                    id="store" 
                    name="delivery" 
                    value="store"
                    checked={delivery === "store"}
                    onChange={handleRadioDelivery} />
                </div>
                <div className="form-radio">
                  <label htmlFor="house">Enviar a domicilio</label>
                  <input 
                    type="radio" 
                    id="house" 
                    name="delivery" 
                    value="house"
                    checked={delivery === "house"}
                    onChange={handleRadioDelivery} />
                </div>
              </div>
              {delivery && delivery === 'house' ? (
                <div className="flex inputs">
                  <div className="form-input m-0">
                    <p>Dirección</p>
                    <input type="text" placeholder="Dirección" />
                  </div>
                  <div className="form-input m-0">
                    <p>Quién recibe?</p>
                    <input type="text" placeholder="Recibe" />
                  </div>
                </div>
              ) : (
                <div className="house" style={{color: 'white'}}>
                  <p>Byens Pizza House</p>
                  <p>Søndergade 12, 4130 Viby Sjælland</p>
                </div>
              )}
              <div className="form-input textarea">
                <p>Notas</p>
                <textarea placeholder="Notas" />
              </div>
            </form>
          </div>

          <div className="right-side">
            <div className="carrito-products">
              <div className="carrito-product cart-header flex align-center">
                <p className="cart-name">PRODUCTOS</p>
                <p className="cart-subtotal">SUBTOTAL</p>
              </div>
              <div className="carrito-products-body">
                {products && products?.map(e => (
                  <div className="carrito-product cart-body flex align-center" key={e.id}>
                    <img width="60" src="https://ludga.com.co/wp-content/uploads/2024/03/TENSIOMETRO_1.jpg"/>
                    <p className="cart-name">{e.name}</p>
                    <p className="cart-subtotal">{e.price * e.cantidad}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="carrito-resume">
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
                <li>
                  <button className="addCart">Realizar pedido</button>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <style>
          {`
            .carrito {
              width: 100%;
            }
            .left-side {
              background: black;
              width: 60%;
              padding: 20px;
              border-radius: 12px 0 0 12px;
            }
            .left-side h4 {
              color: white;
              margin-bottom: 20px;
              font-size: 22px;
            }
            .form .inputs {
              display: flex;
              justify-content: space-between;
            }
            .form-input {
              display: flex;
              color: white;
              flex-direction: column;
              margin-bottom: 17px;
              width: 47%;
              border: none;
            }
            .form-input p {
              margin-bottom: 10px;
              font-size: 14px;
            }
            .form-input input,
            .form-input textarea {
              height: 28px;
              border-radius: 5px;
              padding: 5px 10px;
              box-sizing: border-box;
            }
            .form-input textarea {
              height: 40px;
            }
            .form-input.textarea {
              margin-top: 20px;
              margin-bottom: 0;
            }
            .form .radios {
              color: white;
              margin: 0px auto 20px auto;
            }
            .form-radio {
              display: flex;
              flex-direction: column;
              margin: 10px 30px 0 0;
            }
            .form-radio label {
              margin-bottom: 10px;
              font-size: 14px;
            }
            .house {
              color: white;
              font-size: 14px;
              font-weight: bold;
            }

            .right-side {
              width: 40%;
              background: white;
              border-radius: 0px 12px 12px 0px;
              overflow: hidden;
            }
            .carrito-products-body {
              max-height: 195px;
              overflow: auto;  
            }
            .cart-header {
              justify-content: space-between;
              margin-bottom: 30px;
            }
            .cart-header p {
              font-weight: bold;
            }
            .cart-body {
              margin-bottom: 10px;
              border-bottom: 1px solid #c5c5c5;
              padding-bottom: 10px;
              display: flex;
              justify-content: space-between;
            }
            .carrito-products,
            .carrito-resume {
              width: 100%;
              background: white;
              padding: 20px;
            }
            .carrito-products {
              padding-bottom: 0;
            }
            .carrito-resume li {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
              font-size: 15px;
              font-weight: bold;
            }
            .carrito-resume li:last-child {
              margin-bottom: 0;
            }
            .carrito-products p {
              color: black;
            }
            .carrito-product .cart-name {
              width: 240px;
            }

            .m-0 {
              margin: 0;
            }
          `}
        </style>
      </div>
    </>
  );
}

