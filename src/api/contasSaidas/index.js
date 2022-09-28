import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export ContasSaidas, { schema } from './model'

const router = new Router()
const { valor, nome, pago } = schema.tree

/**
 * @api {post} /contasSaidas Create contas saidas
 * @apiName CreateContasSaidas
 * @apiGroup ContasSaidas
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam valor Contas saidas's valor.
 * @apiParam nome Contas saidas's nome.
 * @apiParam pago Contas saidas's pago.
 * @apiSuccess {Object} contasSaidas Contas saidas's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Contas saidas not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ valor, nome, pago }),
  create)

/**
 * @api {get} /contasSaidas Retrieve contas saidas
 * @apiName RetrieveContasSaidas
 * @apiGroup ContasSaidas
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of contas saidas.
 * @apiSuccess {Object[]} rows List of contas saidas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /contasSaidas/:id Retrieve contas saidas
 * @apiName RetrieveContasSaidas
 * @apiGroup ContasSaidas
 * @apiSuccess {Object} contasSaidas Contas saidas's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Contas saidas not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /contasSaidas/:id Update contas saidas
 * @apiName UpdateContasSaidas
 * @apiGroup ContasSaidas
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam valor Contas saidas's valor.
 * @apiParam nome Contas saidas's nome.
 * @apiParam pago Contas saidas's pago.
 * @apiSuccess {Object} contasSaidas Contas saidas's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Contas saidas not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ valor, nome, pago }),
  update)

/**
 * @api {delete} /contasSaidas/:id Delete contas saidas
 * @apiName DeleteContasSaidas
 * @apiGroup ContasSaidas
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Contas saidas not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
