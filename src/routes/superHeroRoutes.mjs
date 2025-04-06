import express from "express";
import { validateSuperHero } from '../validations/validateSuperHero.mjs'
import { obtenerSuperheroePorIdController, obtenerTodosLosSuperheroesController, insertSuperHeroController, updateSuperHeroController, deleteByIdController, createHeroView} from '../controllers/superheroesController.mjs'

const router =  express.Router()

router.get('/heroes', obtenerTodosLosSuperheroesController)
router.get('/heroes/id/:id', obtenerSuperheroePorIdController)
router.get('/heroes/agregar', createHeroView)
router.post('/heroes/crear', validateSuperHero, insertSuperHeroController)
router.get('/heroes/edit/:id', obtenerSuperheroePorIdController)
router.put('/heroes/edit/:id', validateSuperHero, updateSuperHeroController)
router.delete('/heroes/:id', deleteByIdController)

export default router;