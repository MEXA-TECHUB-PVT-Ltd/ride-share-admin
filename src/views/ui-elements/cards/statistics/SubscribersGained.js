// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import { UserPlus } from 'react-feather'

// ** Custom Components
import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart'

const SubscribersGained = () => {
  // ** State
  const [data, setData] = useState([{
    name: 'Non Insurance Users',
    data: [31, 40, 28, 51, 42, 109, 100]
  },
  ])


  return (
    <StatsWithAreaChart
      icon={<UserPlus size={21} />}
      color='primary'
      stats='43'
      statTitle='Non Insurance Users'
      series={data}
      type='area'
    />
  )
}

export default SubscribersGained
