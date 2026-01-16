import app from './app'

const PORT = 8080

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
