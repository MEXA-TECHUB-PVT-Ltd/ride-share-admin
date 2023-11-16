import { useState ,useEffect} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Row,
  Col
} from "reactstrap";
import classnames from 'classnames'
import { selectThemeColors } from '@utils'
import Select, { components } from 'react-select'
import { FileText, Users, Link } from 'react-feather'
import { useParams } from 'react-router-dom';
import { post } from "../urls/api";
const AddDocument = () => {
  const {id}=useParams();
  const [activeList, setActiveLIst] = useState('1')

  const toggleList = list => {
    if (activeList !== list) {
      setActiveLIst(list)
    }
  }
  const [imageUrls, setImageUrls] = useState([]);
  const [savedCanvasData, setSavedCanvasData] = useState([]);

  const fetchData = async () => {
    // get Images from db 
    const postData = {
        file_id: id
    };
    const apiData = await post("file/getbgImagesByFileId", postData); // Specify the endpoint you want to call
    console.log("apixxsData")

    console.log(apiData)
    if (apiData.error) {
        // toastAlert("error", "No Images Selected")
    } else {
        // toastAlert("success", "You can Edit document ")

        setImageUrls(apiData.result);
        // setActiveImage(apiData.result[0].bgimgs_id)
    }


};
const fetchDataPositions = async () => {
  // get positions from db 
  console.log(id)
  const postData = {
      file_id: id
  };
  const apiData = await post("file/getallPositionsFromFile_Id", postData); // Specify the endpoint you want to call
  console.log("Position Data")

  console.log("apiData")
  console.log(apiData)

  if (apiData.error) {
      // toastAlert("error", apiData.message)
  } else {
      // toastAlert("success", apiData.message)
      console.log('positions')
      console.log(apiData.result)
      // getCanvas Data 
      setSavedCanvasData(apiData.result[0].position_array)
  }
};
  useEffect(() => {
    console.log(id)
    fetchData();
    fetchDataPositions();
}, []);
  return (
    <>
      {/* buton  */}
      <Card>
        <CardHeader>
          <CardTitle>Editor</CardTitle>
        </CardHeader>
        <CardBody>

          {/* <Button color="primary" onClick={() => setShow(true)}>Go somewhere</Button> */}
       {/* Editor  */}
       <Row>
      <Col md='2' sm='12'>
      <ListGroup tag='div'>
          <ListGroupItem
            className={classnames('cursor-pointer', {
              active: activeList === '1'
            })}
            onClick={() => toggleList('1')}
            action
          >
            Text
          </ListGroupItem>
          <ListGroupItem
            className={classnames('cursor-pointer', {
              active: activeList === '2'
            })}
            onClick={() => toggleList('2')}
            action
          >
            Signature
          </ListGroupItem>
          <ListGroupItem
            className={classnames('cursor-pointer', {
              active: activeList === '3'
            })}
            onClick={() => toggleList('3')}
            action
          >
            Date
          </ListGroupItem>
          <ListGroupItem
            className={classnames('cursor-pointer', {
              active: activeList === '4'
            })}
            onClick={() => toggleList('4')}
            action
          >
            Settings
          </ListGroupItem>
        </ListGroup>
        </Col>
        {imageUrls.map((item, index) => {
          return (
            <Col md='2' sm='12' key={index}>
              abc
              <img  style={{ width: '100%' }} src={item.bgimgs_url} />
            </Col>
          )
        })}
        <Col className='mt-1' md='10' sm='12'>
dfdgdfg
        </Col>
        </Row>
        </CardBody>
      </Card>

    </>
  );
};

export default AddDocument;
