class IRepository {
    getById() {
        throw new Error('Método obtenerPorId() no implementado')
    }
    getAll() {
        throw new Error('Método obtenerTodos() no implementado')
    }
    findByAttribute() {
        throw new Error('Método buscarPorAtributo() no implementado')
    }
    getOver30() {
        throw new Error('Método obtenerMayoresDe30() no implementado')
    }
    insertSuperHero() {
        throw new Error('Método insertSuperHero() no implementado')
    }
    updateSuperHero() {
        throw new Error ('Método updateSuperHero() no implementado')
    }
    deleteById() {
        throw new Error ('Método deleteById() no implementado')
    }
    deleteByHeroName() {
        throw new Error ('Método deleteByHeroName() no implementado')
    }
}

export default IRepository;