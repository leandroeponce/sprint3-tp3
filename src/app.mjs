import express from 'express'
import { connectDB } from './config/dbConfig.mjs'
import superHeroRoutes from './routes/superHeroRoutes.mjs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = process.env.PORT || 3000;

//Conexión a MongoDB
connectDB()

app.use(express.urlencoded({ extended: true }))

//Configuración de ejs como motor de vistas
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//Middleware para parsear a JSON
app.use(express.json())

//Configuración de rutas
app.use('/api', superHeroRoutes)

//Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: 'Ruta no encontrada' })
})

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})