import fs from 'fs'
import path from 'path'
// import { fileURLToPath } from 'url' // use this to get path to current file path

import { mockStore } from '../../mock/db'

const resetDb = () => {
  const json = JSON.stringify(mockStore, null, 2)
  // const dirname = path.dirname(fileURLToPath(import.meta.url))
  // const dirname = './mock' // use for use in this repo
  const dirname = 'C:/Users/fabri/Repos/clean-architecture/hexa-fab/mock' // use absolute path for use from other repos
  const destination = path.join(dirname, 'db.json')

  fs.writeFile(destination, json, (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('File created successfully')
  })
}

resetDb()
