import mongoose, { Schema } from 'mongoose'

const contasSaidasSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  valor: {
    type: Number
  },
  nome: {
    type: String
  },
  pago: {
    type: Boolean
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

contasSaidasSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      valor: this.valor,
      nome: this.nome,
      pago: this.pago,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('ContasSaidas', contasSaidasSchema)

export const schema = model.schema
export default model
