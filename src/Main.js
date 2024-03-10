import Logo from './public/Logo.png'

function Main() {
	return (
		<>
			<div className='main-page'>
				<img src={Logo} className='main-logo' />
				<div className='self-info-wrapper'>
					<h2>Доброго времени суток!</h2>
					<h1>На странице "Таблица" находится выполненное задание.</h1>
					<h3>
						В этом проекте реализованы все запрашиваемые в задании требования. Реализованы они исходя из возможностей
						предоставленного API.
					</h3>
				</div>
			</div>
		</>
	)
}

export default Main
