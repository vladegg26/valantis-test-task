import React, { useEffect, useState } from 'react'
import { Button, Table, Select, Input, Form, InputNumber } from 'antd'
import { ApiService } from '../services/api.service'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

const apiService = new ApiService()
const columns = [
	{
		title: 'Id',
		dataIndex: 'id',
		key: 'id'
	},
	{
		title: 'Изделие',
		dataIndex: 'product',
		key: 'product'
	},
	{
		title: 'Брэнд',
		dataIndex: 'brand',
		key: 'brand'
	},
	{
		title: 'Цена',
		dataIndex: 'price',
		key: 'price'
	}
]
const options = [
	{
		value: 10,
		label: '10 записей'
	},
	{
		value: 30,
		label: '30 записей'
	},
	{
		value: 50,
		label: '50 записей'
	},
	{
		value: 100,
		label: '100 записей'
	}
]

function ItemsTable() {
	const [data, setData] = useState([])
	const [offset, setOffset] = useState(0)
	const [limit, setLimit] = useState(50)
	const [loading, setLoading] = useState(false)
	const [counter, setCounter] = useState(1)
	const [brands, setBrands] = useState([])
	const [isFilterApplied, setIsFilterApplied] = useState(false)
	const [productValue, setProductValue] = useState(undefined)
	const [brandValue, setBrandValue] = useState(undefined)
	const [priceValue, setPriceValue] = useState(null)

	const onNext = () => {
		setOffset(offset + limit)
		setCounter(counter + 1)
	}
	const onPrev = () => {
		setOffset(offset - limit)
		setCounter(counter - 1)
	}

	const changeItemsAmount = value => {
		setOffset(0)
		setCounter(1)
		setLimit(value)
	}
	const fetchData = async () => {
		setLoading(true)
		setData(await apiService.getItems({ offset, limit }))
		setLoading(false)
	}
	const applyFilter = async () => {
		setLoading(true)
		setData(
			await apiService.getByFilter({
				product: productValue ? productValue : undefined,
				brand: brandValue ? brandValue : undefined,
				price: priceValue ? priceValue : undefined
			}),
			setIsFilterApplied(true)
		)
		setLoading(false)
	}

	const getBrands = async () => {
		setBrands(
			await apiService.getItemFields({ field: 'brand', offset: 0, limit: 8000 }).then(res => {
				return res.reduce((acc, val) => {
					if (val && !acc.some(item => item.value === val)) acc.push({ value: val, label: val })
					return acc
				}, [])
			})
		)
	}

	const clearFilter = async () => {
		await fetchData()
		setProductValue(undefined)
		setBrandValue(undefined)
		setPriceValue(null)
		setIsFilterApplied(false)
	}
	useEffect(() => {
		fetchData()
	}, [offset, limit])

	useEffect(() => {
		getBrands()
	}, [])

	return (
		<>
			<div className='filter'>
				<Form layout='inline'>
					<Form.Item label='Изделие'>
						<Input style={{ width: 150 }} onChange={e => setProductValue(e.target.value)} value={productValue} />
					</Form.Item>
					<Form.Item label='Брэнд'>
						<Select
							allowClear={true}
							style={{ width: 150 }}
							onChange={v => setBrandValue(v)}
							value={brandValue}
							options={brands}
						/>
					</Form.Item>
					<Form.Item label='Цена'>
						<InputNumber min={0} style={{ width: 150 }} onChange={v => setPriceValue(v)} value={priceValue} />
					</Form.Item>
					<Form.Item>
						<Button disabled={!productValue && !brandValue && !priceValue} onClick={applyFilter} type='primary'>
							Фильтровать
						</Button>
					</Form.Item>
					<Form.Item>
						<Button onClick={clearFilter}>Очистить</Button>
					</Form.Item>
				</Form>
			</div>

			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column'
				}}
			>
				<div className='table-wrapper'>
					<Table dataSource={data} columns={columns} pagination={false} loading={loading} />
				</div>
			</div>

			<div className='paginator'>
				{isFilterApplied ? (
					<p style={{ marginRight: '15px' }} className='danger-text'>
						Фильтр работает только на одну страницу. Чтобы работать с пагинацией - очистите фильтр!
					</p>
				) : null}
				<Button
					icon={<ArrowLeftOutlined />}
					disabled={isFilterApplied || offset - limit < 0}
					onClick={() => onPrev()}
				></Button>
				<span className='counter'>{counter} </span>
				<Button icon={<ArrowRightOutlined />} disabled={isFilterApplied} onClick={() => onNext()}></Button>

				<Select
					onChange={v => changeItemsAmount(v)}
					options={options}
					value={limit}
					disabled={isFilterApplied}
					className='selector'
				/>
			</div>
		</>
	)
}

export default ItemsTable
