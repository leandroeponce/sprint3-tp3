import { getSuperHeroById, getAllSuperHeroes, findSuperHeroesByAttribute, getSuperHeroesOver30, insertSuperHero, updateSuperHero, deleteSuperHeroById, deleteSuperHeroByHeroName } from '../services/superheroesService.mjs'
import { validationResult } from 'express-validator'

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params
        const superheroe =  await getSuperHeroById(id)
        if (!superheroe) {
            return res.status(404).render('error', { mensaje: 'Superhéroe no encontrado' })
        }

        res.render('editSuperhero', { datos: superheroe })
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

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor} = req.params
        const superheroes = await findSuperHeroesByAttribute(atributo, valor)
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes con ese atributo' })
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes)
        res.status(200).json(superheroesFormateados)
    }
    catch (error)  {
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message })
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes =  await getSuperHeroesOver30()
        console.log(superheroes)
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes mayores de 30 años' })
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes)
        res.status(200).json(superheroesFormateados)
    }
    catch (error)  {
        res.status(500).send({ mensaje: 'Error al obtener superhéroes mayores de 30 años', error: error.message })
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
            creador
        })
        res.render('success', { mensaje: 'Superhéroe agregado correctamente.' });
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
        const superheroe = await updateSuperHero()

        const superheroeFormateado = renderizarSuperheroe(superheroe)
        res.status(200).json(superheroeFormateado)
    }
    catch (error)  {
        res.status(500).send({ mensaje: 'Error al actualizar el superhéroe', error: error.message })
    }
}

export async function deleteByIdController(req, res) {
    try {
        console.log("parametros recibidos: ", req.params)
        const { id } = req.params
        console.log("id recibido", id)

        const superheroe = await deleteSuperHeroById(id)
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' })
        }
        console.log("superheroe", superheroe)

        const superheroeFormateado = renderizarSuperheroe(superheroe)
        res.status(200).json(superheroeFormateado)
    }
    catch (error)  {
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe', error: error.message })
    }
}

export async function deleteByHeroNameController(req, res) {
    try {
        console.log("parametros recibidos: ", req.params)
        const { nombresuperheroe } = req.params
        console.log("nombre recibido", nombresuperheroe)

        const superheroe = await deleteSuperHeroByHeroName(nombresuperheroe)
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' })
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe)
        res.status(200).json(superheroeFormateado)
    }
    catch (error)  {
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe', error: error.message })
    }
}