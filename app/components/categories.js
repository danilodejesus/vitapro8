export default function Categories({categories}) {
  if (!categories?.length) return <p>No se encontraron categorías.</p>;

  return (
    <div className="categories">
      {
        categories && categories.map((cat) => (
          <a className="category" key={cat.id}>{cat.name}</a>
        ))
      }
    </div>
  )
}

