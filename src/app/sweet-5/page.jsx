'use client';

import React from 'react';
import {
  Shirt,
  ShoppingBag,
  Archive, // For box/package
  Glasses,
  Users, // For Groups
  MessageSquare, // For Message
  RefreshCw, // For Refunds
  Package, // For New Orders
  ArchiveRestore, // For New Items (or FilePlus)
  Dot, // For small dot in stock numbers
  UserCircle2, // Placeholder for Hat
  RollerCoaster, // Placeholder for Skates
} from 'lucide-react';

// --- Component for Stat Card ---
const StatCard = ({ value, unit, label }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center text-center h-full">
      <span className="text-3xl font-bold text-gray-800">{value}</span>
      <span className="text-xs text-gray-500 uppercase mt-0.5">{unit}</span>
      <span className="text-sm text-gray-600 mt-1.5 uppercase font-medium">{label}</span>
    </div>
  );
};

// --- Component for Sales Chart Card ---
const SalesChartCard = () => {
  const salesData = [
    { label: 'Confirmed', value: 60, color: 'bg-gray-300' },
    { label: 'Packed', value: 85, color: 'bg-gray-700' },
    { label: 'Refunded', value: 25, color: 'bg-gray-300' },
    { label: 'Shipped', value: 100, color: 'bg-gray-700' },
  ];
  const maxValue = Math.max(...salesData.map(d => d.value));

  return (
    <div className="bg-white p-5 rounded-lg shadow col-span-1 lg:col-span-3">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales</h3>
      <div className="relative h-48">
        {/* Grid Lines */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 border-t border-gray-200"
            style={{ bottom: `${(i / 4) * 100}%` }} // 0%, 25%, 50%, 75%, 100%
          ></div>
        ))}
        {/* Bars */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end h-[calc(100%-2rem)] px-2">
          {salesData.map((item) => (
            <div key={item.label} className="flex flex-col items-center w-1/5">
              <div
                className={`w-4 sm:w-5 rounded-t-sm ${item.color} transition-all duration-500 ease-out`}
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      {/* Labels */}
      <div className="flex justify-around mt-2 pt-2 border-t border-gray-200">
        {salesData.map((item) => (
          <span key={item.label} className="text-xs text-gray-500 w-1/5 text-center">
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};

// --- Component for Top Item Categories Card ---
const TopItemCategoriesCard = () => {
  const categories = [
    { id: 1, icon: Shirt, label: 'T-Shirt' },
    { id: 2, icon: UserCircle2, label: 'Hat' }, // Placeholder for Hat
    { id: 3, icon: ShoppingBag, label: 'Bag' },
    { id: 4, icon: RollerCoaster, label: 'Skates' }, // Placeholder for Skates
    { id: 5, icon: Archive, label: 'Box' },
    { id: 6, icon: Glasses, label: 'Glasses' },
  ];

  return (
    <div className="bg-white p-5 rounded-lg shadow col-span-1 lg:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Top item categories</h3>
        <a href="#" className="text-xs text-gray-400 hover:text-gray-600 uppercase font-medium">
          View All
        </a>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            className="bg-gray-100 p-3 rounded-md flex items-center justify-center aspect-square hover:bg-gray-200 transition-colors"
            aria-label={category.label}
          >
            <category.icon size={28} className="text-gray-700" />
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Component for Stock Numbers Card ---
const StockNumbersCard = () => {
  const stockItems = [
    { id: 1, name: 'Low stock items', count: 12 },
    { id: 2, name: 'Item categories', count: 6 },
    { id: 3, name: 'Refunded items', count: 1 },
  ];

  return (
    <div className="bg-white p-5 rounded-lg shadow col-span-1 lg:col-span-2">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Stock numbers</h3>
      <ul className="space-y-3">
        {stockItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center text-sm">
            <span className="text-gray-600">{item.name}</span>
            <div className="flex items-center">
              <span className="text-gray-800 font-medium">{item.count}</span>
              <Dot size={24} className="text-gray-300 ml-1" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- Component for Stores List Card ---
const StoresListCard = () => {
  const stores = [
    { id: 1, name: 'Manchester, UK', employees: 23, items: 308, orders: 2 },
    { id: 2, name: 'Yorkshire, UK', employees: 11, items: 291, orders: 15 },
    { id: 3, name: 'Hull, UK', employees: 5, items: 41, orders: 11 },
    { id: 4, name: 'Leicester, UK', employees: 16, items: 261, orders: 8 },
  ];

  return (
    <div className="bg-white p-5 rounded-lg shadow col-span-1 lg:col-span-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Stores list</h3>
        <a href="#" className="text-xs text-gray-400 hover:text-gray-600 uppercase font-medium">
          View All
        </a>
      </div>
      <ul className="space-y-3">
        {stores.map((store) => (
          <li key={store.id} className="grid grid-cols-4 gap-2 text-sm pb-2 border-b border-gray-100 last:border-b-0">
            <span className="text-gray-700 font-medium col-span-1 truncate" title={store.name}>{store.name}</span>
            <span className="text-gray-500 col-span-1 text-right">{store.employees} employees</span>
            <span className="text-gray-500 col-span-1 text-right">{store.items} items</span>
            <span className="text-gray-500 col-span-1 text-right">{store.orders} orders</span>
          </li>
        ))}
      </ul>
    </div>
  );
};


// --- Main Page Component ---
export default function Sweet5Page() {
  const stats = [
    { id: 1, value: 741, unit: 'Qty', label: 'New Items', icon: ArchiveRestore },
    { id: 2, value: 123, unit: 'Qty', label: 'New Orders', icon: Package },
    { id: 3, value: 12, unit: 'Qty', label: 'Refunds', icon: RefreshCw },
    { id: 4, value: 1, unit: 'Qty', label: 'Message', icon: MessageSquare },
    { id: 5, value: 4, unit: 'Qty', label: 'Groups', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              value={stat.value}
              unit={stat.unit}
              label={stat.label}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <SalesChartCard />
          <TopItemCategoriesCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <StockNumbersCard />
          <StoresListCard />
        </div>
      </div>
    </div>
  );
}