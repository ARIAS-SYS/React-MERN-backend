const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

const router = Router();

// Todas las peticiones deben pasar por la validacion token
router.use( validarJWT );

router.get('/', getEventos );

router.post(
  '/', 
  [
    check('title','El titulo es ebligatorio').not().isEmpty(),
    check('start','Fecha de inicio es ebligatorio').custom( isDate ),
    check('end','Fecha de finalización es ebligatorio').custom( isDate ),
    validarCampos
  ],
  crearEvento );

router.put(
  '/:id',
  [
    check('title','El titulo es ebligatorio').not().isEmpty(),
    check('start','Fecha de inicio es ebligatorio').custom( isDate ),
    check('end','Fecha de finalización es ebligatorio').custom( isDate ),
    validarCampos
  ], 
  actualizarEvento 
);

router.delete('/:id', eliminarEvento );

module.exports = router;