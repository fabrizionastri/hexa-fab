import * as fs from 'fs'
import { mockStore } from './db'

export const resetJsonDB = () => {
  const json = JSON.stringify(mockStore, null, 2)

  fs.writeFile('db.json', json, (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('File created successfully')
  })
}

resetJsonDB()
