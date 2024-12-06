import Link from "next/link";

export default function Footer () {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <Link className="logo" href="/">2024</Link>
          <div className="logo">Todos los derechos reservaod</div>
        </div>
      </footer>

      <style>
        {`
          /* footer */
          .footer {
            color: white;
            font-size: 15px;
            margin-bottom: 15px;
          }

          .footer .container {
            background: #1b1919;
            border-radius: 12px;
            margin-top: 20px;
          }

          .logo {
            padding: 20px;
            display: inline-block;
          }

          .nav a {
            padding: 20px;
            display: inline-block;
          }
          /* footer */
        `}
      </style>
    </>
  )
}