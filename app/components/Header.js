import Link from "next/link";

export default function Header () {
  return (
    <>
      <header className="header">
        <div className="container">
          <Link className="logo" href="/">VitaPro8</Link>

          <nav className="nav">
            <Link href="/carrito">Cart</Link>
            <Link href="/finalizar-compra">Compra</Link>
            <Link href="/login">Log in</Link>
          </nav>
        </div>
      </header>

      <style>
        {`
          /* header */
          .header {
            font-weight: bold;
            color: white;
            font-size: 15px;
          }

          .header .container {
            background: #1b1919;
            border-radius: 12px;
            margin-top: 15px;
          }

          .logo {
            padding: 20px;
            display: inline-block;
          }

          .nav a {
            padding: 20px;
            display: inline-block;
          }
          /* header */
        `}
      </style>
    </>
  )
}