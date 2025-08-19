// components/QuotationItemList.jsx
import React from 'react';

function QuotationItemList({ items, onAdd, onUpdate, onRemove }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">📦 Quotation Items</h2>
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Description"
            value={item.description}
            onChange={e => onUpdate(index, 'description', e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={item.quantity}
            onChange={e => onUpdate(index, 'quantity', e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Unit Price"
            value={item.unitPrice}
            onChange={e => onUpdate(index, 'unitPrice', e.target.value)}
            className="p-2 border rounded"
          />
          <div className="flex items-center justify-between">
            <span className="font-semibold">
              Total: {(item.quantity * item.unitPrice).toFixed(2)}
            </span>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        ➕ Add Item
      </button>
    </section>
  );
}

export default QuotationItemList;
