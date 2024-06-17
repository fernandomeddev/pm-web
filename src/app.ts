import express from 'express'
import appConfig, { MOCK_FOLDER, USE_MOCK } from './config/app.config'
import routes from './routes'
import mockJson from 'express-middleware-mock';

const app = express()
app.use(appConfig)

app.use('/api', routes)

if (USE_MOCK) {
  app.use(mockJson(MOCK_FOLDER));
}

export default app