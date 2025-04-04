import superHero from '../models/SuperHero.mjs'
import IRepository from './IRepository.mjs'

class SuperHeroRepository extends IRepository {
    async getById(id) {
        return await superHero.findById(id)
    }
    async getAll() {
        return await superHero.find()
    }


    // async findByAttribute(atributo, valor) {
    //     return await superHero.find({[atributo]:valor})
    // }

    async findByAttribute(atributo, valor ) {
        return await superHero.find({[atributo]: { $regex: valor, $options: 'i'} })
    }

    
    async getOver30() {
        return await superHero.find({edad: {$gt:30}, planetaOrigen: "Tierra", $expr: { $gte: [{ $size: "$poderes" }, 2] }})
    }

    async insertSuperHero(data) {
        const hero = new superHero({
            nombreSuperHeroe: data.nombreSuperHeroe,
            nombreReal: data.nombreReal,
            edad: data.edad,
            planetaOrigen: data.planetaOrigen,
            debilidad: data.debilidad,
            poderes: data.poderes || [],
            aliados: data.aliados || [],
            enemigos: data.enemigos || [],
            creador: data.creador || 'Leandro'
        });
        await hero.save();
        console.log('Superhéroe insertado:', hero);
        return hero;
    }

    //Actualización de documento
    async  updateSuperHero() {
        const updatedHero = await superHero.findOneAndUpdate(
            { nombreSuperHeroe: "Batman" },
            { $set: { edad: 50 } },
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

    async  deleteByHeroName(nombresuperheroe) {
        console.log("lo que llega", nombresuperheroe)
        if (!nombresuperheroe) {
            throw new Error('El nombre de superheroe es requerido');
        }
        try {
            const deletedHero = await superHero.findOneAndDelete({nombreSuperHeroe: nombresuperheroe});

            if (!deletedHero) {
                throw new Error(`No se encontró un superhéroe con el nombre: ${nombresuperheroe}`);
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


