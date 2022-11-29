import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Aspirante,
  PuestoDisponible,
} from '../models';
import {AspiranteRepository} from '../repositories';

export class AspirantePuestoDisponibleController {
  constructor(
    @repository(AspiranteRepository) protected aspiranteRepository: AspiranteRepository,
  ) { }

  @get('/aspirantes/{id}/puesto-disponibles', {
    responses: {
      '200': {
        description: 'Array of Aspirante has many PuestoDisponible',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PuestoDisponible)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PuestoDisponible>,
  ): Promise<PuestoDisponible[]> {
    return this.aspiranteRepository.puestoDisponibles(id).find(filter);
  }

  @post('/aspirantes/{id}/puesto-disponibles', {
    responses: {
      '200': {
        description: 'Aspirante model instance',
        content: {'application/json': {schema: getModelSchemaRef(PuestoDisponible)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Aspirante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoDisponible, {
            title: 'NewPuestoDisponibleInAspirante',
            exclude: ['id'],
            optional: ['aspiranteId']
          }),
        },
      },
    }) puestoDisponible: Omit<PuestoDisponible, 'id'>,
  ): Promise<PuestoDisponible> {
    return this.aspiranteRepository.puestoDisponibles(id).create(puestoDisponible);
  }

  @patch('/aspirantes/{id}/puesto-disponibles', {
    responses: {
      '200': {
        description: 'Aspirante.PuestoDisponible PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoDisponible, {partial: true}),
        },
      },
    })
    puestoDisponible: Partial<PuestoDisponible>,
    @param.query.object('where', getWhereSchemaFor(PuestoDisponible)) where?: Where<PuestoDisponible>,
  ): Promise<Count> {
    return this.aspiranteRepository.puestoDisponibles(id).patch(puestoDisponible, where);
  }

  @del('/aspirantes/{id}/puesto-disponibles', {
    responses: {
      '200': {
        description: 'Aspirante.PuestoDisponible DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PuestoDisponible)) where?: Where<PuestoDisponible>,
  ): Promise<Count> {
    return this.aspiranteRepository.puestoDisponibles(id).delete(where);
  }
}
