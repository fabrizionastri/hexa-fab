import express, { Express, Request, Response } from 'express'
import { JsonServerOrderStore } from '../adapters/stores/JsonServerStore'

const expressPort = 3001
const expressUrl = `http://localhost:${expressPort}`
const app: Express = express()

const orderStore = JsonServerOrderStore

app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
  res.send(`⚡️Server is running at ${expressUrl}`)
})

app.get('/orders', async (_req: Request, res: Response) => {
  const orders = await orderStore.getAll()
  res.send(JSON.stringify(orders))
  // res.send('⚡️orders')
})

app.get('/orders/:id', async (_req: Request, res: Response) => {
  const order = await orderStore.getAll()
  res.send(JSON.stringify(order))
  // res.send('⚡️orders')
})

app.listen(expressPort, () => {
  console.log(`⚡️Server is running at ${expressUrl}`)
})
