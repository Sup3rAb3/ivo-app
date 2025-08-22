// components/QuotationItemList.jsx
import React from 'react';

function QuotationItemList({ items, onAdd, onUpdate, onRemove }) {
  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">📦 Quotation Items</h2>
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Description</label>
            <input
              type="text"
              placeholder="Item Description"
              value={item.description}
              onChange={e => onUpdate(index, 'description', e.target.value)}
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              placeholder="Qty"
              value={item.quantity || ''}
              onChange={e => onUpdate(index, 'quantity', parseInt(e.target.value) || 1)}
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Unit Price (ZMW)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Price"
              value={item.unitPrice || ''}
              onChange={e => onUpdate(index, 'unitPrice', parseFloat(e.target.value) || 0)}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="flex flex-col justify-between">
            <span className="font-semibold mt-6">
              Total: ZMW {(item.quantity * item.unitPrice).toFixed(2)}
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

      {/* Total Amount */}
      <div className="mt-6 text-right text-xl font-bold text-gray-800">
        Total Amount: ZMW {totalAmount.toFixed(2)}
      </div>
    </section>
  );
}

export default QuotationItemList;
