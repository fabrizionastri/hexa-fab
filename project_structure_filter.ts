import * as fs from 'fs'

// Parse the .project_structure_filter file into an array of filter patterns
const filterPatterns = fs
  .readFileSync('.project_structure_filter', 'utf-8')
  .split('\n')
  .map((line) => line.trim())

console.log('filterPatterns:', filterPatterns)

// checks if the file path contains any of the filter patterns
function containsFilter(filePath: string): boolean {
  return filterPatterns.some((filter) => filePath.includes(filter))
}

const input = fs.createReadStream('project_structure.txt')
const output = fs.createWriteStream('project_structure_filtered.txt')
let keepThisSection = true

input.on('data', (chunk) => {
  const lines = chunk.toString().split('\n')
  // console.log('lines:', lines)

  const filteredLines = lines.filter((line) => {
    if (line.startsWith('--- File: ')) {
      const filePath = line.slice('--- File: '.length).trim()
      // console.log('filePath:', filePath)
      keepThisSection = containsFilter(filePath)
      // console.log('keepThisSection:', keepThisSection)
    }
    return keepThisSection ? line : false
  })

  output.write(filteredLines.join('\n'))
})

input.on('end', () => {
  output.end()
})
