import { success, notFound, authorOrAdmin } from '../../services/response/'
import { ContasSaidas } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  ContasSaidas.create({ ...body, user })
    .then((contasSaidas) => contasSaidas.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  ContasSaidas.count(query)
    .then(count => ContasSaidas.find(query, select, cursor)
      .populate('user')
      .then((contasSaidas) => ({
        count,
        rows: contasSaidas.map((contasSaidas) => contasSaidas.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  ContasSaidas.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((contasSaidas) => contasSaidas ? contasSaidas.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  ContasSaidas.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((contasSaidas) => contasSaidas ? Object.assign(contasSaidas, body).save() : null)
    .then((contasSaidas) => contasSaidas ? contasSaidas.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  ContasSaidas.findById(params.id)
    .then(notFound(res))
    .then((contasSaidas) => contasSaidas ? contasSaidas.remove() : null)
    .then(success(res, 204))
    .catch(next)
