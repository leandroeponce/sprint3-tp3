import { getSuperHeroById, getAllSuperHeroes, insertSuperHero, updateSuperHero, deleteSuperHeroById } from '../services/superheroesService.mjs'
import { validationResult } from 'express-validator'

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params
        const superheroe =  await getSuperHeroById(id)
        if (!superheroe) {
            return res.status(404).render('error', { mensaje: 'Superhéroe no encontrado' })
        }

        res.render('editSuperhero', { datos: superheroe, errores: [] })
    }
    catch (error) {
        res.status(500).render('error', {
            mensaje: 'Error al obtener el superhéroe',
            error: error.message
        })
    }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await getAllSuperHeroes()

        res.render('dashboard', { heroes: superheroes })
    }
    catch (error)  {
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message })
    }
}

export async function insertSuperHeroController(req, res) {
    const errores = validationResult(req)

    if(!errores.isEmpty()){
        return res.status(400).render('createSuperHero', {
            errores: errores.array(),
            datos: req.body
        })
    }
    try {
        console.log("Datos recibidos: ", req.body)

        const { nombreSuperHeroe, nombreReal, edad, poderes, planetaOrigen, debilidad, aliados, enemigos, creador } = req.body
        if (!nombreSuperHeroe || !nombreReal || !edad || !poderes || poderes.length === 0) {
            return res.status(400).render('createSuperHero', {
                errores: [{ msg: 'Faltan datos obligatorios.' }],
                datos: req.body
            })
        }

        const superheroe = await insertSuperHero({
            nombreSuperHeroe,
            nombreReal,
            edad,
            poderes,
            planetaOrigen,
            debilidad,
            aliados,
            enemigos,
            creador: "Leandro"
        })
        res.render('success', { nombre: superheroe.nombreSuperHeroe, mensaje: 'Superhéroe agregado correctamente.' });
    }
    catch (error)  {
        res.status(500).render('error', {
            mensaje:'Error al insertar el superhéroe',
            error: error.message
        })
    }
}

export async function updateSuperHeroController(req, res) {
    try {
        const { id } = req.params
        const errores = validationResult(req)
        if(!errores.isEmpty()){
            return res.status(400).render('editSuperHero', {
                errores: errores.array(),
                datos: { ...req.body, _id: id }
            })
        }

        const datos = {
            nombreSuperHeroe: req.body.nombreSuperHeroe,
            nombreReal: req.body.nombreReal,
            edad: req.body.edad,
            planetaOrigen: req.body.planetaOrigen,
            debilidad: req.body.debilidad,
            poderes: req.body.poderes.split(',').map(p => p.trim()),
            aliados: req.body.aliados?.split(',').map(a => a.trim()),
            enemigos: req.body.enemigos?.split(',').map(e => e.trim()),
            creador: "Leandro"
        }
        const superheroeActualizado = await updateSuperHero(id, datos)
        
        if(!superheroeActualizado) {
            return res.status(404).render('error', { mensaje: 'Superhéroe no encontrado'})
        }

        res.render('success', { nombre: superheroeActualizado.nombreSuperHeroe, mensaje: 'Superhéroe actualizado correctamente.' })
    }
    catch (error)  {
        res.status(500).render('error', { mensaje: 'Error al actualizar el superhéroe', error: error.message })
    }
}

export async function deleteByIdController(req, res) {
    try {
        const { id } = req.params
        const superheroe = await deleteSuperHeroById(id)

        if (!superheroe) {
            return res.status(404).render('error', { mensaje: 'Superhéroe no encontrado' })
        }
        const heroView = superheroe.toObject()
        res.render('deletedHero', { nombre: heroView.nombreSuperHeroe })
    }
    catch (error)  {
        res.status(500).render('error', { mensaje: 'Error al eliminar el superhéroe', error: error.message })
    }
}

export async function createHeroView(req, res) {
    res.render('createsuperhero', { errores: [], datos: {} });  
}