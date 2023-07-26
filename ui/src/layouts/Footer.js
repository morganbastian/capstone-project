import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
//still need to figure out how to get the footer to the bottom of the page
function Footer(props) {
	return (
		<Box
			sx={{
				position: 'fixed',
				width: '100%',
				height: 'auto',
				paddingTop: '1rem',
				paddingBottom: '1rem',
			}}
		>
			<Container maxWidth='lg'>
				<Grid container direction='column' alignItems='center'>
					<Grid item xs={12}>
						<Typography color='black' variant='h5'>
							Contact Us
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography color='textSecondary' variant='subtitle1'>
							843-452-9492
							<span> | </span>
							shemcreekcharterco@gmail.com
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default Footer;