import { Button, Paper, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import Footer from '../../layouts/Footer'

//** Setup (define helper functions and variables here)

function Home(props) {
	//** Destructure Props

	//** State Variables

	//** Component Logic

	//** Return JSX
	return (
		<Paper elevation={0}>
			<div style={{ background: '#f3e9ca' }}>
				<img
					src='https://i.ibb.co/dBBdHMb/SCC14.jpg'
					alt='Harbor Cruise'
					style={{ width: '50%', height: 300 }}
				/>
				<img
					src='https://i.ibb.co/ph4fykd/IMG-0807.jpg'
					alt='Pleasant Lady'
					style={{ width: '50%', height: 300 }}
				/>
			</div>
			<Box
				sx={{
					paddingLeft: '1rem',
					paddingRight: '1rem',
					width: '100%',
					height: 'auto',
					paddingTop: '1rem',
					background: '#f3e9ca',
				}}
			>
				<Typography variant='h5'>
					<strong>Harbor Cruise</strong>
				</Typography>
				<Typography variant='h6'>
					Welcome aboard the Pleasant Lady - a luxurious sixty-foot 1979
					converted fishing boat, renovated into a one-of-a-kind harbor cruiser.
					With a spacious and luxurious interior, the Pleasant Lady provides the
					perfect setting for a romantic evening or a fun-filled day with
					friends and family! You'll have plenty of room to relax or celebrate,
					with two newly renovated bathrooms, two open-air bars, two large
					couches under the covered house, and comfortable couches on our back
					deck perfect for lounging in the sun! As you cruise through Mount
					Pleasant and Charleston's historic waterfront, you'll enjoy
					breathtaking views of the city's famous landmarks. Whether you're a
					local or a visitor, the Pleasant Lady offers a unique way to
					experience Charleston. With its boutique flair and personalized
					service, you're guaranteed to have a charter boat experience like no
					other! Book your next experience with Shem Creek Charter Company, and
					get ready to see Charleston in a whole new light!
				</Typography>
				<Link
					to='/bookings/new'
					style={{ textDecoration: 'none', color: 'white' }}
				>
					<Button variant='contained' sx={{ marginTop: 3 }}>
						Book Now
					</Button>
				</Link>
			</Box>
			<div style={{ paddingTop: 25, background: '#f3e9ca' }}>
				<img
					src='https://stpetepier.org/wp-content/uploads/2022/06/ctb-0775-june-2022-blog-tour-boat-main-1200x768-1.jpg'
					alt='Eco-Tour'
					style={{ width: '50%', height: 300 }}
				/>
				<img
					src='https://lowcountrywatersports.com/wp-content/uploads/2023/05/IMG_9794.jpg'
					alt='Dolphins'
					style={{ width: '50%', height: 300 }}
				/>
			</div>
			<Box
				sx={{
					width: '100%',
					height: 'auto',
					paddingLeft: '1rem',
					paddingRight: '1rem',
					paddingTop: '1rem',
					paddingBottom: '25px',
					background: '#f3e9ca',
				}}
			>
				<Typography variant='h5'>
					<strong>Eco-Tour</strong>
				</Typography>
				<Typography variant='h6'>
					Guided by knowledgeable naturalists, tourists are educated about the
					diverse flora and fauna while they soak in the natural beauty of
					Charleston's waters. Through responsible practices and a commitment to
					conservation, we provide an unforgettable
					experience that fosters appreciation for both the environment and
					local culture. Whether it's observing playful dolphins or uncovering
					hidden marshlands, this unique tour promotes a harmonious connection
					between nature and tourism.
				</Typography>
				<Link
					to='/bookings/new'
					style={{ textDecoration: 'none', color: 'white' }}
				>
					<Button variant='contained' sx={{ marginTop: 3 }}>
						Book Now
					</Button>
				</Link>
			</Box>
			<Footer />
		</Paper>
	)
}
export default Home
