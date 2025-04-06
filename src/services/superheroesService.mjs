import superHeroRepository from '../repositories/SuperHeroRepository.mjs'

export async function getSuperHeroById(id) {
    return await superHeroRepository.getById(id)
}

export async function getAllSuperHeroes() {
    return await superHeroRepository.getAll()
}

export async function insertSuperHero(data) {
    return await superHeroRepository.insertSuperHero(data)
}

export async function updateSuperHero(id, data) {
    return await superHeroRepository.updateSuperHero(id, data)
}

export async function deleteSuperHeroById(id) {
    return await superHeroRepository.deleteById(id)
}