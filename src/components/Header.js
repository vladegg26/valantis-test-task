import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../public/Logo.png'

function Header() {
	return (
		<div>
			<div className='header'>
				<div style={{ marginLeft: 20, padding: 10 }}>
					<Link to='/valantis-task' className='header-link'>
						Главная
					</Link>
					<Link to='/table' className='header-link'>
						Таблица
					</Link>
				</div>
				<span>
					<img src={Logo} className='logo' />
				</span>
			</div>
		</div>
	)
}

export default Header
