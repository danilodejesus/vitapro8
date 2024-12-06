export default function Categories({categories}) {
  if (!categories?.length) return <p>No se encontraron categorías.</p>;

  return (
    <>
      <div className="categories direction-row">
        {
          categories && categories.map((cat) => (
            <a className="category" key={cat.id}>{cat.name}</a>
          ))
        }
      </div>

      <style>
        {`
        .categories {
          display: flex;
          justify-content: space-between;
          background: #1b1919;
          padding: 5px 0;
          border-radius: 12px;
          width: 100%;
          overflow: auto;
        }

        .category {
          padding: 10px 20px;
          color: white;
          transition: .25s linear;
          cursor: pointer;
          min-width: 80px;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 30px;
          border: 1px solid #1b1919;
          font-size: 15px;
        }

        .category:hover {
          border: 1px solid white;
        }
        `}
      </style>
    
    </>
  )
}

