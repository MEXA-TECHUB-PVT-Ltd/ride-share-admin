// ** React Imports
import { useContext, useState } from 'react'

// ** Icons Imports
import { Award, ChevronDown, List } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'
// import Timeline from '../../../'
import AvatarGroup from '@components/avatar-group'
import DataTable from 'react-data-table-component'
// ** Utils
// import { kFormatter } from '@utils'
import ReactPaginate from 'react-paginate'
import adimage from "@src/assets/images/pages/adimage.png";

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'
import './table.css' 
import SupportTracker from '../../ui-elements/cards/analytics/SupportTracker'

import SubscribersGained from '../../ui-elements/cards/statistics/SubscribersGained'
import OrdersReceived from '../../ui-elements/cards/statistics/OrdersReceived'
import AvgSessions from '../../ui-elements/cards/analytics/AvgSessions'
import ProfitLineChart from '../../ui-elements/cards/statistics/ProfitLineChart'
import { Card, Button, Input, Col, Row } from 'reactstrap'
import CardCongratulations from '../../ui-elements/cards/advance/CardCongratulations'
import OrdersBarChart from "../../ui-elements/cards/statistics/OrdersBarChart"
import MyTable from '../../Table'

import CompanyTable from './CompanyTable'
const AnalyticsDashboard = () => {
  const [value, setValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  // ** Context
  const { colors } = useContext(ThemeColors)
 
  
  const data = [
    { id: 1, name: 'John', email: "john@gmail.com", dob: "20 Jan,2000", gender: "male", age: "30", status: "active" },
    { id: 2, name: 'John', email: "john@gmail.com", dob: "20 Jan,2000", gender: "male", age: "30", status: "active" },
    { id: 3, name: 'John', email: "john@gmail.com", dob: "20 Jan,2000", gender: "male", age: "30", status: "active" },
    { id: 4, name: 'John', email: "john@gmail.com", dob: "20 Jan,2000", gender: "male", age: "30", status: "active" },
    { id: 5, name: 'John', email: "john@gmail.com", dob: "20 Jan,2000", gender: "male", age: "30", status: "active" },
    { id: 6, name: 'John', email: "john@gmail.com", dob: "20 Jan,2000", gender: "male", age: "30", status: "active" },
    { id: 7, name: 'John', email: "john@gmail.com", dob: "20 Jan,2000", gender: "male", age: "30", status: "active" },
    { id: 8, name: 'John', email: "john@gmail.com", dob: "20 Jan,2000", gender: "male", age: "30", status: "active" },
];

const columns = [
    {
        name: 'Profile Image',
        cell: row => (
            <>
                <div style={{ display: "flex", justifyContent: "center", alignContent: "center", gap: "10px" }}>
                    <img src={adimage} alt="..." style={{ borderRadius: "50px", width: "40px", height: "40px" }} />
                </div>
            </>
        ),
    },
    { name: 'Name', selector: 'name', sortable: true },
    { name: 'Email', selector: 'email', sortable: true },
    { name: 'DOB', selector: 'dob', sortable: true },
    { name: 'Gender', selector: 'gender', sortable: true },
    { name: 'Age', selector: 'age', sortable: true },
    // {
    //     name: 'Status',
    //     cell: row => (
    //         <>
    //             <div style={{ display: "flex", justifyContent: "center", alignContent: "center", gap: "10px" }}>
    //                 <Button
    //                     color='success'
    //                     onClick={()=>{console.log(row)}}
    //                 >
                       
    //                     Active
    //                 </Button>
    //             </div>
    //         </>
    //     ),
    // }, 
];

  const handlePagination = page => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        status: statusValue,
        perPage: rowsPerPage,
        page: page.selected + 1
      })
    )
    setCurrentPage(page.selected + 1)
  }

  const CustomPagination = () => {
    const count = Number((data.length / rowsPerPage).toFixed(0))

    return (
      <ReactPaginate
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        pageCount={count || 1}
        activeClassName='active'
        breakClassName='page-item'
        pageClassName={'page-item'}
        breakLinkClassName='page-link'
        nextLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousLinkClassName={'page-link'}
        previousClassName={'page-item prev'}
        onPageChange={page => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    )
  }
  
  const customStyles = {
    table: {
        style: {
            marginBottom: "5px",
        },
    },
    headCells: {
        style: {
            display: "flex", justifyContent: "center", alignContent: "center"
        },
    },
    cells: {
        style: {
            display: "flex", justifyContent: "center", alignContent: "center"
        },
    },
};

  return (
    <div id='dashboard-analytics'>
      <Row className='match-height'>
        {/* <Col lg='6' xs='12'>
          <CardCongratulations />
        </Col> */}
        <Col lg='4' xs='12' sm='6'>
          <SubscribersGained  
          />
        </Col>
        <Col lg='4' xs='12' sm='6'>
          <OrdersReceived 
            warning={colors.warning.main} />
        </Col>

        <Col lg='4' md='4' xs='12'>
        <OrdersBarChart warning={colors.warning.main} />
        </Col>
        {/* <Col lg='4' md='4' xs='12'>
        <ProfitLineChart info={colors.info.main} />

        </Col>  */}

      </Row>

      <Row className='match-height'>
        {/* <Col lg='6' xs='12'>
          <AvgSessions primary={colors.primary.main} />
        </Col> */}
        {/* <Col lg='6' xs='12'>
          <SupportTracker primary={colors.primary.main} danger={colors.danger.main} />
        </Col> */}
      </Row>
      <Row className='match-height'>
        

        {/* <Col lg='12' md='12' xs='12'>
        <CompanyTable />
        </Col> */}


        </Row>
      <Row className='match-height mb-4'>
        <Col lg='12' xs='12'>
        <DataTable
                columns={columns}
                data={data}
                // pagination
                highlightOnHover
                responsive
                customStyles={customStyles} 
            />
        </Col>
      </Row>

    </div>
  )
}

export default AnalyticsDashboard
