import mongoose from "mongoose";

//Esquema
const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0},
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    creador:  String,
    createdAt: { type: Date, default: Date.now }
})

//Modelo
const superHero = mongoose.model('SuperHero', superheroSchema, 'Grupo-08');
export default superHero