// IMPORT MODULES

import express, { Express, Request, Response } from 'express'

import { orderStore } from './core/gateways/store.gateway'
import expressEjsLayouts from 'express-ejs-layouts'

import { calculateOrder } from './core/usecases/calculateOrder'

// SERVER SET UP

const expressPort = 3001
const expressUrl = `http://localhost:${expressPort}`
const app: Express = express()

app.set('view engine', 'ejs') // sets the default engine for EJS files, meaning that you can use res.render('fileName') instead of res.render('fileName', {extension: 'ejs'}).
app.use(expressEjsLayouts) // use express-ejs-layouts as the layout engine
// app.set('views', new URL('./views', import.meta.url).pathname)
// app.set('views', path.join(__dirname, '/views')) // set the default folder for ejs files. use the path.join to merge the path of the current direct(__dirname property) and 'views' folder into an absolute path
app.set('views', './src/views')

app.use(express.urlencoded({ extended: true })) // To parse incoming URL-encoded requests (form data in POST request body). Important : if you do not do this, you won't be able to get data from a POST request body
app.use(express.json()) // To parse incoming JSON requests. Important : if you do not do this, you won't be able to get data from a POST request body

// DATABASE SET UP

app.get('/', (_req: Request, res: Response) => {
  res.send(`⚡️Server is running at ${expressUrl}`)
})

app.get('/order', async (_req: Request, res: Response) => {
  const orders = await orderStore.getAll()
  // res.send(JSON.stringify(orders))
  res.render('order-all', { orders })
})

app.get('/order/:id', async (req, res) => {
  const id = req.params.id
  let order = await orderStore.getById(id)
  if (order) {
    order = await calculateOrder(order)
    res.render('order-detail', { order })
  }
  res.send('Order not found')
})

// SERVER LISTENING

app.use((_req: Request, res: Response) => {
  res.status(404).send('Page not found')
})

app.listen(expressPort, () => {
  console.log(`⚡️Server is running at ${expressUrl}`)
})
