import React, { useEffect, useState } from 'react';
import { Space, Table, Typography } from 'antd';
import { CarEntity } from '../domain/CarEntity';
import {getCarList} from '../services/api';
import { useNavigate } from 'react-router-dom';

const { Column } = Table;


const CarList: React.FC = () => {
    const [data, setData] = useState<CarEntity[]>([])
    const  [loading,setLoading]=useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [])

   const fetchData= ()=>{
       setLoading(true)
      getCarList().then((data)=>{
         setData(data)
      }).catch((err)=>{
          console.log(err)
      }).finally(()=>{
          setLoading(false)
      })
    }

    return (
        <Table
            loading={loading}
            dataSource={data}
        > 
            <Column title="id" dataIndex="id" key="id" />
            <Column title="carId" dataIndex="carId" key="carId" />
            <Column title="hp" dataIndex="hp" key="hp" />
            <Column title="inStock" dataIndex="inStock" key="inStock"
                render={(inStock: boolean) => (
                    <Space size="middle">
                        <Typography.Text>{inStock ? 'YES' : 'NO'}</Typography.Text>
                    </Space>
                )} />
            <Column title="price" dataIndex="price" key="price" render={(price: number) => (
                <Space size="middle">
                    <Typography.Text>{`${price} €`}</Typography.Text>
                </Space>
            )} />
            <Column title="color" dataIndex="color" key="color"
                render={(color: string) => (
                    <Space size="middle">
                        <Typography.Text>{color}</Typography.Text>
                        <div style={{ width: 40, height: 10, backgroundColor: color }}></div>
                    </Space>
                )}
            />

            <Column
                title="Action"
                key="action"
                render={(_: any, record: CarEntity) => (
                    <Space size="middle">
                        <a onClick={() =>navigate(`edit/${record.id}`)}>Edit</a>
                    </Space>
                )}
            />
        </Table>
    )
};

export default CarList;