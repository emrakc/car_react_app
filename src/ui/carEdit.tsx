import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Space, Table, Typography, Spin, Switch, InputNumber, Select, Row, Col } from 'antd';
import { CarEntity } from '../domain/CarEntity';
import { useNavigate, useParams } from 'react-router-dom';
import { CarColors } from '../utils/color';
import { getCar, putCar } from '../services/api';
 
const CarEdit: React.FC = () => {
  const [car, setCar] = useState<CarEntity>()
  let { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id)
      fetchData();
  }, [id])

  const fetchData = () => {
    if (id) {
      setLoading(true)
      getCar(id).then((data) => {
        setCar(data)
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
    }
  }

  const onFinish = (formData:CarEntity) => { 
    if (car && formData) {
      formData.carId=car.carId;
      formData.id=car.id;
      setLoading(true)
      putCar(formData).then((data) => {
        navigate('/')
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
    }
  }

  return (
    car
      ? <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={car}
        onFinish={onFinish}
        autoComplete="off"
      >

        <Form.Item
          label="id"
          name="id"

        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="car id"
          name="carId"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="in stock"
          name="inStock"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="horse power"
          name="hp"
          rules={[{ required: true, message: 'Please input hp' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="price"
          rules={[{ required: true, message: 'Please input price' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="color"
          label="color"
          rules={[{ required: true, message: 'Please input color' }]}
        >
          <Select
            placeholder="Color" 
          >
            {
              Object.keys(CarColors).map((key: any, value: any) => (
                <Select.Option key={key} value={key}>
                  <Row gutter={16}>
                    <Col className="gutter-row" style={{ backgroundColor: key }} span={6}>

                    </Col>
                    <Col className="gutter-row" span={18}>
                      {key}
                    </Col>

                  </Row>
                </Select.Option>
              ))
            }

          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type='text' onClick={()=>navigate('/')}>
            Back
          </Button>
        </Form.Item>
      </Form>
      : <Spin />
  )
};

export default CarEdit;