import { Route, Routes } from 'react-router-dom'
import Table from './Table'
import Main from '../Main'

function Content() {
	return (
		<>
			<div className='content-wrapper'>
				<div className='content'>
					<Routes>
						<Route path='/valantis-task' element={<Main />} />
						<Route path='/table' element={<Table />} />
					</Routes>
				</div>
			</div>
		</>
	)
}

export default Content
