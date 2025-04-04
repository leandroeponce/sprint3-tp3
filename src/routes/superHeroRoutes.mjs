import express from "express";
import { validateSuperHero } from '../validations/validateSuperHero.mjs'
import { obtenerSuperheroePorIdController, obtenerTodosLosSuperheroesController, buscarSuperheroesPorAtributoController, obtenerSuperheroesMayoresDe30Controller, insertSuperHeroController, updateSuperHeroController, deleteByIdController, deleteByHeroNameController} from '../controllers/superheroesController.mjs'
import SuperHero from '../models/SuperHero.mjs'

const router =  express.Router()

router.get('/heroes', obtenerTodosLosSuperheroesController)
router.get('/heroes/id/:id', obtenerSuperheroePorIdController)
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController)
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller)
router.post('/heroes/crear', validateSuperHero, insertSuperHeroController)
router.put('/heroes/actualizar', updateSuperHeroController)
router.delete('/heroes/eliminarporid/:id', deleteByIdController)
router.delete('/heroes/eliminarpornombre/:nombresuperheroe', deleteByHeroNameController)

//vista del dashboard
router.get('/dashboard', async (req, res) => {
    try {
        const heroes = await SuperHero.find(); // Obtiene la lista de héroes de la BD
        console.log("Heroes desde la BD:", heroes.map(h => h.toObject()))
        res.render('dashboard', { heroes });  // Renderiza la vista pasando los datos
    } catch (error) {
        console.error('Error al obtener los superhéroes:', error)
        res.status(500).send('Error al obtener los superhéroes')
    }
});

//vista para crear superheroe
router.get('/createhero', (req, res) => {
    res.render('createsuperhero');
});



export default router;