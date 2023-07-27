import { rest } from 'msw'
import mockUser from '../mocks/data/mockUsers.json'
import mockBookings from '../mocks/data/mockBookings.json'
import mockCharters from '../mocks/data/mockCharters.json'

export const handlers = [
  rest.get('http://localhost:9000/users/', (req, res, ctx) => { // capture "GET /greeting" requests
    return res(ctx.json(mockUser)) // respond using a mocked JSON body
  }),
  rest.get('http://localhost:9000/bookings', (req, res, ctx) => { // capture "GET /greeting" requests
    return res(ctx.json(mockBookings)) // respond using a mocked JSON body
  }),
  rest.get('http://localhost:9000/charters', (req, res, ctx) => { // capture "GET /greeting" requests
    return res(ctx.json(mockCharters)) // respond using a mocked JSON body
  }),
]