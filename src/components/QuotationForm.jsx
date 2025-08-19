import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function QuotationForm() {
  const [formData, setFormData] = useState({
    quotationNo: 'A00001',
    quotationDate: new Date().toISOString().split('T')[0],
    from: {
      businessName: '',
      phone: '',
      address: '',
      email: ''
    },
    to: {
      clientName: '',
      phone: '',
      address: '',
      email: ''
    },
    notes: ''
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
        notes: ''
      });
    } catch (error) {
      console.error("Error saving quote: ", error);
      alert("Failed to save quote.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex justify-center items-start">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-4xl space-y-10">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-6">
          <h1 className="text-4xl font-bold text-gray-800">Quotation</h1>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Quotation No.</label>
              <input type="text" value={formData.quotationNo} className="mt-1 p-2 border rounded-lg w-32 bg-gray-50" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Date</label>
              <input type="date" value={formData.quotationDate} className="mt-1 p-2 border rounded-lg bg-gray-50" readOnly />
            </div>
          </div>
        </div>

        {/* Quotation From */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Quotation From</h2>
          <div className="grid grid-cols-2 gap-6">
            {['businessName', 'phone', 'address', 'email'].map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-600 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  placeholder={field}
                  value={formData.from[field]}
                  onChange={e => handleChange('from', field, e.target.value)}
                  className="mt-1 p-3 border rounded-lg w-full bg-white shadow-sm"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Quotation For */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Quotation For</h2>
          <div className="grid grid-cols-2 gap-6">
            {['clientName', 'phone', 'address', 'email'].map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-600 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  placeholder={field}
                  value={formData.to[field]}
                  onChange={e => handleChange('to', field, e.target.value)}
                  className="mt-1 p-3 border rounded-lg w-full bg-white shadow-sm"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Notes */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Additional Notes</h2>
          <textarea
            placeholder="Terms, conditions, or extra notes..."
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            className="w-full border p-4 rounded-lg resize-none h-28 bg-white shadow-sm"
          />
        </section>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Save Quotation
        </button>
      </form>
    </div>
  );
}

export default QuotationForm;
