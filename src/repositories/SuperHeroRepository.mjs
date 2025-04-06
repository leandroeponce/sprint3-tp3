import superHero from '../models/SuperHero.mjs'
import IRepository from './IRepository.mjs'

class SuperHeroRepository extends IRepository {
    async getById(id) {
        return await superHero.findById(id)
    }
    
    async getAll() {
        return await superHero.find()
    }

    //Actualización de documento
    async  updateSuperHero(id, data) {
        const updatedHero = await superHero.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
        );
        console.log('Resultado de la actualización', updatedHero); 
        return updatedHero;
    }

    //Eliminación de documento
    async  deleteById(id) {
        console.log("lo que llega", id)
        if (!id) {
            throw new Error('El ID es requerido');
        }

        try {
            const deletedHero = await superHero.findByIdAndDelete(id);

            if (!deletedHero) {
                throw new Error(`No se encontró un superhéroe con el ID: ${id}`);
            }

            console.log('Superhéroe eliminado:', deletedHero);
            return deletedHero;

        } catch (error) {
            console.error('Error al eliminar el superhéroe:', error.message);
            throw error;
        }
    }
}

export default new SuperHeroRepository();


