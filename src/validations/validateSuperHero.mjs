import { body, validationResult } from 'express-validator'

export const validateSuperHero = [
    body('nombreSuperHeroe')
            .trim()
            .notEmpty().withMessage('El nombre del superhéroe es obligatorio.')
            .isLength({ min: 3, max: 60 }).withMessage('El nombre del superhéroe debe tener entre 3 y 60 caracteres.'),

        body('nombreReal')
            .trim()
            .notEmpty().withMessage('El nombre real es obligatorio.')
            .isLength({ min: 3, max: 60 }).withMessage('El nombre real debe tener entre 3 y 60 caracteres.'),

        body('edad')
            .trim()
            .notEmpty().withMessage('La edad es obligatoria.')
            .isInt({ min: 0 }).withMessage('La edad debe ser un número positivo o cero.'),

        body('poderes')
        .custom((poderes) => {
            if (typeof poderes === 'string') {
                poderes = poderes.split(',').map(poder => poder.trim()).filter(poder => poder.length > 0);
            }
            if (!Array.isArray(poderes) || poderes.length === 0) {
                throw new Error('Debe ingresar al menos un poder.');
            }
            for (let poder of poderes) {
                poder = poder.trim();
                if (poder.length < 3 || poder.length > 60) {
                    throw new Error('Cada poder debe tener entre 3 y 60 caracteres y no contener espacios al inicio o final.');
                }
            }
    
            return true;
        }),
    // Middleware para manejar los errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
        next();
    }
]