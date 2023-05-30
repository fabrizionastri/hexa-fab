import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { mockStore } from './db'

const resetJsonDB = () => {
  const json = JSON.stringify(mockStore, null, 2)
  const dirname = path.dirname(fileURLToPath(import.meta.url))
  const destination = path.join(dirname, 'db.json')

  fs.writeFile(destination, json, (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('File created successfully')
  })
}

resetJsonDB()
