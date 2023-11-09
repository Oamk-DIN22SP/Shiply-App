import React, {useState} from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = date => {
        setSelectedDate(date);
    };
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="text-center mb-8 space-x-4 mt-4">
        <h1 className="text-3xl font-bold ">Latest Notifications</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Sender
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Receiver
        </button>
        <button className="bg-blue-500 hover-bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Location
        </button>
        <br />
        
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="w-64 p-2 border rounded mt-4"
        />
        
           <br />
        
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="w-64 p-2 border rounded mt-4"
        />
           <br />
        
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="w-64 p-2 border rounded mt-4"
        />
      </div>
    </div>
  );
}