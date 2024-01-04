// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import { Users } from 'react-feather'

// ** Custom Components
import TinyChartStats from '@components/widgets/stats/TinyChartStats'
import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart'

const OrdersBarChart = ({ warning, count }) => {
  // ** State
  const [data, setData] = useState([{
    name: 'users',
    data: [31, 40, 28, 51, 42, 109, 100]
  },
  ])

  // useEffect(() => {
  //   axios.get('/card/card-statistics/orders-bar-chart').then(res => setData(res.data))
  //   return () => setData(null)
  // }, [])

  const options = {
    chart: {
      stacked: true,
      toolbar: {
        show: false
      }
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
        top: -15,
        bottom: -15
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '20%',
        borderRadius: [0, 5],
        colors: {
          backgroundBarColors: ['#f3f3f3', '#f3f3f3', '#f3f3f3', '#f3f3f3', '#f3f3f3'],
          backgroundBarRadius: 5
        }
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    colors: [warning],
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      x: {
        show: false
      }
    }
  }

  return data !== null ? (
    <StatsWithAreaChart
    icon={<Users size={21} />}
    color='secondary'
    stats={count}
    statTitle='Users'
    series={data}
    type='bar'
  />
    // <TinyChartStats
    //   height={70}
    //   type='bar'
    //   options={options}
    //   stats="200"
    //   title="Users" 
    //   series={data}
    // />
  ) : null
}

export default OrdersBarChart
