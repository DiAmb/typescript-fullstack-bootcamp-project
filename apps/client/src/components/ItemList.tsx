import { useState } from 'react'

type ItemListProps = {
  items: string[]
  addItem: () => void
}

const ItemList = ({ items, addItem }: ItemListProps) => {
  console.log('Renderizando ItemList')

  return (
    <div>
      <button
        className="px-4 py-2 rounded-md bg-red-600 text-white"
        onClick={addItem}
      >
        Agregar Item
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

const ItemContainer = () => {
  const [items, setItems] = useState<string[]>([])

  const addItem = () => {
    console.log('aqui')
    setItems((prevItems) => [...prevItems, `Item ${prevItems.length + 1}`])
  }

  return (
    <div>
      <h2>Ejemplo sin useCallback</h2>
      <ItemList items={items} addItem={addItem} />
    </div>
  )
}

export default ItemContainer
