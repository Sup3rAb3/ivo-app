import { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

function App() {

  const [formData, setFormData] = useState({

    clientName: "",
    clientEmail: "",
    service: "",
    amount: "",
    date: "",
    notes: ""
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "quotes"), formData);
      alert("Quote submitted successfully!");
      setFormData({
        clientName: "",
        clientEmail: "",
        service: "",
        amount: "",
        date: "",
        notes: ""
      });
    } catch (error) {
      console.error("Error saving quote: ", error);
      alert("Failed to save quote.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create Quote</h2>

        <input
          type="text"
          name="clientName"
          placeholder="Client Name"
          value={formData.clientName}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />  

        <input
          type="text"
          name="service"
          placeholder="Service"
          value={formData.service}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />     
      
      <input
          type="text"
          name="clientEmail"
          placeholder="Email"
          value={formData.clientEmail}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        /> 

        <input
          type="text"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="text"
          name="date"
          placeholder="Date (YYYY-MM-DD)"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
          Save Quote
          </button>
          </form>
          </div>
      
      );
      
}

export default App;