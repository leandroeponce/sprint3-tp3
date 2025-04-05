import express from "express";
import { validateSuperHero } from '../validations/validateSuperHero.mjs'
import { obtenerSuperheroePorIdController, obtenerTodosLosSuperheroesController, buscarSuperheroesPorAtributoController, obtenerSuperheroesMayoresDe30Controller, insertSuperHeroController, updateSuperHeroController, deleteByIdController, deleteByHeroNameController} from '../controllers/superheroesController.mjs'
import SuperHero from '../models/SuperHero.mjs'
import { validationResult } from "express-validator";

const router =  express.Router()

router.get('/heroes', obtenerTodosLosSuperheroesController)
router.get('/heroes/id/:id', obtenerSuperheroePorIdController)
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController)
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller)
router.post('/heroes/crear', validateSuperHero, insertSuperHeroController)
router.put('/heroes/edit', updateSuperHeroController)
router.delete('/heroes/eliminarporid/:id', deleteByIdController)
router.delete('/heroes/eliminarpornombre/:nombresuperheroe', deleteByHeroNameController)


//vista para crear superheroe
router.get('/createhero', (req, res) => {
    res.render('createsuperhero', { errores: [], datos: {} });
});

export default router;