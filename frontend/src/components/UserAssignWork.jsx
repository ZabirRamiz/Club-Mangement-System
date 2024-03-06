import { useState } from 'react';

const TailwindFlobiteTemple = () => {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [assigningDate, setAssigningDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md h-96">
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="from" className="block text-sm font-medium text-gray-600">
            FROM
          </label>
          <select
            id="from"
            name="from"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="EM">EM</option>
            <option value="HR">HR</option>
            <option value="PR">PR</option>
          </select>
        </div>

        <div className="w-1/2">
          <label htmlFor="to" className="block text-sm font-medium text-gray-600">
            TO
          </label>
          <select
            id="to"
            name="to"
            value={toValue}
            onChange={(e) => setToValue(e.target.value)}
            className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="EM">EM</option>
            <option value="HR">HR</option>
            <option value="PR">PR</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="assigningDate" className="block text-sm font-medium text-gray-600">
            Assigning Date
          </label>
          <input
            type="date"
            id="assigningDate"
            name="assigningDate"
            value={assigningDate}
            onChange={(e) => setAssigningDate(e.target.value)}
            className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="w-1/2">
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-600">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-600">
          Description
        </label>
        <textarea
          id="description"
          rows="4"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
    </div>
  );
};

export default TailwindFlobiteTemple;
