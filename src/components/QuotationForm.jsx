import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../index.css';
import QuotationItemList from '../components/QuotationItemList';

function QuotationForm() {
  const [formData, setFormData] = useState({
    quotationNo: 'A00001',
    quotationDate: new Date().toISOString().split('T')[0],
    from: { businessName: '', phone: '', address: '', email: '' },
    to: { clientName: '', phone: '', address: '', email: '' },
    notes: '',
    items: []
  });

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0 }]
    }));
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = field === 'quantity' || field === 'unitPrice' ? Number(value) : value;
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "quotes"), formData);
      alert("Quote submitted successfully!");
      setFormData({
        quotationNo: 'A00001',
        quotationDate: new Date().toISOString().split('T')[0],
        from: { businessName: '', phone: '', address: '', email: '' },
        to: { clientName: '', phone: '', address: '', email: '' },
        notes: '',
        items: []
      });
    } catch (error) {
      console.error("Error saving quote: ", error);
      alert("Failed to save quote.");
    }
  };

  const renderInput = (section, field, label, type = 'text', required = false) => (
    <div className="relative mb-6">
      <input
        type={type}
        name={field}
        value={formData[section][field]}
        onChange={e => handleChange(section, field, e.target.value)}
        required={required}
        placeholder={label}
        className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg bg-white shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
        {label}
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-start">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-4xl space-y-10">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-6">
          <h1 className="text-4xl font-bold text-gray-800">🧾 Quotation</h1>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Quotation No.</label>
              <input type="text" value={formData.quotationNo} className="bg-gray-100 p-2 rounded-lg w-32" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Date</label>
              <input type="date" value={formData.quotationDate} className="bg-gray-100 p-2 rounded-lg" readOnly />
            </div>
          </div>
        </div>

        {/* Quotation From */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📤 Quotation From</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {renderInput('from', 'businessName', 'Business Name', 'text', true)}
            {renderInput('from', 'phone', 'Phone', 'tel', true)}
            {renderInput('from', 'address', 'Address')}
            {renderInput('from', 'email', 'Email', 'email', true)}
          </div>
        </section>

        {/* Quotation For */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📥 Quotation For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {renderInput('to', 'clientName', 'Client Name', 'text', true)}
            {renderInput('to', 'phone', 'Phone', 'tel', true)}
            {renderInput('to', 'address', 'Address')}
            {renderInput('to', 'email', 'Email', 'email', true)}
          </div>
        </section>

        {/* Item List */}
        <QuotationItemList
          items={formData.items}
          onAdd={addItem}
          onUpdate={updateItem}
          onRemove={removeItem}
        />

        {/* Notes */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">📝 Additional Notes</h2>
          <textarea
            placeholder="Terms, conditions, or extra notes..."
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            className="w-full border p-4 rounded-lg resize-none h-28 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </section>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-transform duration-200"
        >
          💾 Save Quotation
        </button>
      </form>
    </div>
  );
}

export default QuotationForm;
