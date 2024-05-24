import React from 'react';
import Chart from 'react-apexcharts';

const Dashboard = () => {
  const lineChartOptions = {
    series: [
      {
        name: 'TEAM A',
        type: 'area',
        data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
      },
      {
        name: 'TEAM B',
        type: 'line',
        data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43]
      }
    ],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      type: 'solid',
      opacity: [0.35, 1]
    },
    labels: [
      'Dec 01', 'Dec 02', 'Dec 03', 'Dec 04', 'Dec 05',
      'Dec 06', 'Dec 07', 'Dec 08', 'Dec 09', 'Dec 10', 'Dec 11'
    ],
    markers: {
      size: 0
    },
    yaxis: [
      {
        title: {
          text: 'Series A'
        }
      },
      {
        opposite: true,
        title: {
          text: 'Series B'
        }
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => (y !== undefined ? `${y.toFixed(0)} points` : y)
      }
    }
  };

  const radialChartOptions = {
    series: [44, 55, 67, 83],
    chart: {
      height: 350,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px'
          },
          value: {
            fontSize: '16px'
          },
          total: {
            show: true,
            label: 'Total',
            formatter: () => 249
          }
        }
      }
    },
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries']
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <main className="bg-gray-100 border-4 border-red-400 rounded-3xl p-8">
        <div className="grid grid-cols-12 gap-6 mb-4 pb-10">
          <div className="col-span-12 mt-8">
            <div className="flex items-center h-10">
              <h2 className="mr-5 text-lg font-medium truncate">Overview</h2>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              {['blue-400', 'yellow-400', 'pink-600', 'green-400'].map((color, index) => (
                <a key={index} className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 bg-white" href="#">
                  <div className="p-5">
                    <div className="flex justify-between">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 text-${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <div className={`bg-green-500 rounded-full h-6 px-2 flex items-center text-white font-semibold text-sm`}>
                        <span>30%</span>
                      </div>
                    </div>
                    <div className="ml-2 w-full flex-1">
                      <div>
                        <div className="mt-3 text-3xl font-bold leading-8">4.510</div>
                        <div className="mt-1 text-base text-gray-600">Item Sales</div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-12 mt-5">
            <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
              <div className="bg-white shadow-lg p-4">
                <Chart options={lineChartOptions} series={lineChartOptions.series} type="line" height={350} />
              </div>
              <div className="bg-white shadow-lg p-4">
                <Chart options={radialChartOptions} series={radialChartOptions.series} type="radialBar" height={350} />
              </div>
            </div>
          </div>
          <div className="col-span-12 mt-5">
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h1 className="font-bold text-base">Table</h1>
              <div className="mt-4">
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto">
                    <div className="py-2 align-middle inline-block min-w-full">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">PRODUCT NAME</th>
                              <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                              <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                              <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                <p>Apple MacBook Pro 13</p>
                                <p className="text-xs text-gray-400">PC & Laptop</p>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">77</td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                <div className="flex text-green-500">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <p>Active</p>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                <div className="flex space-x-4">
                                  <a href="#" className="text-blue-500 hover:text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <p>Edit</p>
                                  </a>
                                  <a href="#" className="text-red-500 hover:text-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M19 13v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8M5 7h14a2 2 0 012 2v0a2 2 0 01-2 2H5a2 2 0 01-2-2v0a2 2 0 012-2z" />
                                    </svg>
                                    <p>Delete</p>
                                  </a>
                                </div>
                              </td>
                            </tr>
                            {/* Repeat the row for more items */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4">
                  <div>
                    <p className="text-sm leading-5 text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">200</span> of <span className="font-medium">2000</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex shadow-sm">
                      <div>
                        <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-lg border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 3a1 1 0 00-.894.553l-5 9A1 1 0 004 14h12a1 1 0 00.894-1.447l-5-9A1 1 0 0010 3zM4.618 12L10 4.618 15.382 12H4.618z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                      <div>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 border-t border-b border-r border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue">1</a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 border-t border-b border-r border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue">2</a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 border-t border-b border-r border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue">3</a>
                      </div>
                      <div>
                        <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-lg border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 3a1 1 0 00.894.553l5 9A1 1 0 0016 14H4a1 1 0 00-.894 1.447l5 9A1 1 0 0010 3zM15.382 12L10 4.618 4.618 12h10.764z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
