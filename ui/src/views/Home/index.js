import { Button, Paper, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'

//** Setup (define helper functions and variables here)

function Home(props) {
	//** Destructure Props
	
	//** State Variables

	//** Component Logic

	//** Return JSX
	return (
		<Paper>
			<Box
				sx={{
					paddingLeft: '1rem',
					paddingRight: '1rem',
					width: '100%',
					height: 'auto',
					paddingTop: '1rem',
				}}
			>
				<Typography variant='h5'>Harbor Cruise</Typography>
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
					<Button variant='contained'>Book Now</Button>
				</Link>
			</Box>
			<Box
				sx={{
					width: '100%',
					height: 'auto',
					paddingLeft: '1rem',
					paddingRight: '1rem',
					paddingTop: '1rem',
					paddingBottom: '25px'
				}}
			>
				<Typography variant='h5'>Eco-Tour</Typography>
				<Typography variant='h6'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin turpis
					mauris, fringilla quis malesuada at, vestibulum a tellus. Donec ornare
					elementum velit, non ultricies nunc lacinia et. Pellentesque ac
					aliquet arcu. Duis consequat eros non dolor vehicula semper. Etiam
					cursus urna sit amet fringilla interdum. Duis porttitor pharetra
					massa, quis varius elit dapibus vitae. Donec id enim rutrum sem
					molestie fermentum eu feugiat lectus. Nam facilisis molestie gravida.
					Mauris quis nibh sem. In porta eget lorem eu facilisis. Praesent
					pellentesque ex odio, at lobortis urna sollicitudin vel. Sed et lectus
					vulputate, suscipit velit ut, rutrum nisi. Cras pulvinar sapien id
					pretium viverra.
				</Typography>
				<Link
					to='/bookings/new'
					style={{ textDecoration: 'none', color: 'white' }}
				>
					<Button variant='contained'>Book Now</Button>
				</Link>
			</Box>
		</Paper>
	)
}
export default Home
