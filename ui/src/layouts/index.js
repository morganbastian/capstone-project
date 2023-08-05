import { Paper } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = (props) => {
	return (
		<Paper elevation={0}>
			<Navbar />
			<Outlet />
			{/* Outlet is not a “real” Component, it is imported from react-router-dom. it will be replaced by the element rendered by the route */}
			{/* <Footer /> */}
		</Paper>
	)
}

export default Layout
