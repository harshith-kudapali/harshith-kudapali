import React from 'react';
import { format } from 'date-fns';

function VisitorTable({ visitors }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Postal Code</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Network</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {visitors.slice(0, 10).map((v) => ( // Show first 10
            <tr key={v._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{v.ipAddress}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{v.city}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{v.country}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{v.postalCode}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                <div>
                  <span className="font-bold">ISP</span>: {v.network[0] + ","}
                </div>
                <div>
                  <span className="font-bold">Organisation</span>: {v.network[1]}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{format(new Date(v.visitDate), 'PPpp')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default VisitorTable;
