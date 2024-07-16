import React from 'react';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

export const SalesValueChart = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Sales',
      data: [1, 2, 2, 3, 3, 4, 3],
      fill: true,
      backgroundColor: 'rgba(135, 206, 250, 0.2)',
      borderColor: 'rgba(135, 206, 250, 1)'
    }]
  };

  const options = {
    maintainAspectRatio: false, // Aspect ratio'yu koruma, bu sayede yükseklik ve genişlik bağımsız ayarlanabilir
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => `$${value}k`
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: tooltipItem => `$${tooltipItem.raw}k`
        }
      }
    },
    layout: {
      padding: {
        top: 20
      }
    }
  };

  // Canvas elementinin yüksekliğini belirtmek için bir div ile sarmalayabiliriz.
  return (
    <div style={{ height: '350px' }}> 
      <Line data={data} options={options} />
    </div>
  );
};


// Aynı SalesValueChart bileşeni, ancak mobil için düzenlenmiş genişlik ayarıyla
export const SalesValueChartphone = () => {
  return <SalesValueChart />;
};




export const CircleChart = ({ series = [10, 20, 30], donutWidth = 20 }) => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
      data: series,
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };

  const options = {
    circumference: 360,
    rotation: 270,
    cutout: donutWidth
  };

  return <Pie data={data} options={options} />;
};



export const BarChart = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],  // Günlük etiketler
    datasets: [
      {
        label: 'July',
        data: [1, 5, 2, 5, 4, 3],  // Temmuz verileri, totalOrders'dan alınan veriler
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
        barPercentage: 0.4,
        categoryPercentage: 0.8
      },
      {
        label: 'August',
        data: [2, 3, 4, 8, 1, 2],  // Ağustos verileri, totalOrders'dan alınan veriler
        backgroundColor: 'rgba(40, 167, 69, 0.5)',
        borderColor: 'rgba(40, 167, 69, 1)',
        borderWidth: 1,
        barPercentage: 0.4,
        categoryPercentage: 0.8
      }
    ]
  };

  const options = {
    scales: {
      x: {
        stacked: true,  // X ekseni üzerinde gruplama yapılacak
      },
      y: {
        beginAtZero: true,
        stacked: true,  // Y ekseni üzerinde gruplama yapılacak
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        position: 'nearest' 
      }
    }
  };

  return <Bar data={data} options={options} />;
};