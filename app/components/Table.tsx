import React from "react";

interface TableProps<T extends Record<string, any>> {
    columns: { key: keyof T; label: string }[];
    data: T[];
  }

export default function Table<T>({ columns, data }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">

        <thead className="bg-gray-100 text-gray-800">
          <tr className="border-b">
            {columns.map((col) => (
              <th key={col.key as string} className="px-4 py-2 text-left">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="text-gray-500 border-b hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key as string} className="px-4 py-2">
                  {String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
