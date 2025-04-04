import superHeroRepository from '../repositories/SuperHeroRepository.mjs'

export async function getSuperHeroById(id) {
    return await superHeroRepository.getById(id)
}

export async function getAllSuperHeroes() {
    return await superHeroRepository.getAll()
}

export async function findSuperHeroesByAttribute(atributo, valor) {
    return await superHeroRepository.findByAttribute(atributo, valor)
}

export async function getSuperHeroesOver30() {
    return await superHeroRepository.getOver30()
}

export async function insertSuperHero(data) {
    return await superHeroRepository.insertSuperHero(data)
}

export async function updateSuperHero() {
    return await superHeroRepository.updateSuperHero()
}

export async function deleteSuperHeroById(id) {
    return await superHeroRepository.deleteById(id)
}

export async function deleteSuperHeroByHeroName(nombresuperheroe) {
    return await superHeroRepository.deleteByHeroName(nombresuperheroe)
}