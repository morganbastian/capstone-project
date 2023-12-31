import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
	Paper,
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Menu,
	Container,
	Avatar,
	Button,
	Tooltip,
	MenuItem,
} from '@mui/material'

import { isUserLoggedIn, clearToken } from '../utility/utils'
import { getMe } from '../utility/api'

//settings for the profile dropdown
function Navbar() {
	const [anchorElNav, setAnchorElNav] = useState(null)
	const [anchorElUser, setAnchorElUser] = useState(null)
	const [myData, setMyData] = useState({})

	useEffect(() => {
		if (isUserLoggedIn()) {
			const getMyData = async () => {
				const me = await getMe()
				setMyData(me)
			}
			getMyData()
		}
	}, [])
	const isUserAdmin = () => {
		if (myData.role === 'admin') {
			return true
		}
		return false
	}

	function Logout() {
		clearToken()
		window.location.reload(false)
	}

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}
	if (!myData) {
		return <div>loading...</div>
	}
	return (
		<Paper>
			<AppBar position='static'>
				<Container maxWidth='xl'>
					<Toolbar disableGutters>
						<Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
							<Box
								component='img'
								sx={{
									height: 75,
									width: 150,
								}}
								alt='Logo'
								src={
									'https://images.squarespace-cdn.com/content/v1/63f4000e8a3d7c5e96d42603/944d390d-de90-4a16-a0e6-f97140b00a90/Sccco1.jpg?format=1500w'
								}
							/>
						</Link>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'flex', md: 'none' },
								alignItems: 'center',
							}}
						>
							<Menu
								id='menu-appbar'
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							></Menu>
						</Box>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'none', md: 'flex' },
								flexDirection: 'flex-end',
								alignItems: 'center',
								justifyContent: 'flex-end',
								textDecoration: 'none',
								color: 'white',
							}}
						>
							<Link to='/bookings/new' style={{ textDecoration: 'none' }}>
								<Button
									sx={{
										display: { xs: 'none', md: 'flex' },
										mr: 1,
										textDecoration: 'none',
										color: 'white',
									}}
								>
									Book Now
								</Button>
							</Link>
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip>
								{isUserLoggedIn() ? (
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar alt='Profile' />
									</IconButton>
								) : (
									<Link to='/login'>
										<Button
											sx={{
												// display: { xs: 'none', md: 'flex' },
												mr: 1,
												textDecoration: 'none',
												color: 'white',
												flex: 'row-reverse',
											}}
										>
											Login
										</Button>
									</Link>
								)}
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id='menu-appbar'
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem>
									<Link to='/userbookings' style={{ textDecoration: 'none' }}>
										My Bookings
									</Link>
								</MenuItem>
								{isUserAdmin() ? (
									<MenuItem>
										<Link to='/adminpanel' style={{ textDecoration: 'none' }}>
											Admin Panel
										</Link>
									</MenuItem>
								) : null}
								<MenuItem onClick={() => Logout()}>
									<Link to='/' style={{ textDecoration: 'none' }}>
										Logout
									</Link>
								</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</Paper>
	)
}

export default Navbar
