import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PuestoDisponible} from '../models';
import {PuestoDisponibleRepository} from '../repositories';

export class PuestoDisponbibleController {
  constructor(
    @repository(PuestoDisponibleRepository)
    public puestoDisponibleRepository : PuestoDisponibleRepository,
  ) {}

  @post('/puesto-disponibles')
  @response(200, {
    description: 'PuestoDisponible model instance',
    content: {'application/json': {schema: getModelSchemaRef(PuestoDisponible)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoDisponible, {
            title: 'NewPuestoDisponible',
            exclude: ['id'],
          }),
        },
      },
    })
    puestoDisponible: Omit<PuestoDisponible, 'id'>,
  ): Promise<PuestoDisponible> {
    return this.puestoDisponibleRepository.create(puestoDisponible);
  }

  @get('/puesto-disponibles/count')
  @response(200, {
    description: 'PuestoDisponible model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PuestoDisponible) where?: Where<PuestoDisponible>,
  ): Promise<Count> {
    return this.puestoDisponibleRepository.count(where);
  }

  @get('/puesto-disponibles')
  @response(200, {
    description: 'Array of PuestoDisponible model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PuestoDisponible, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PuestoDisponible) filter?: Filter<PuestoDisponible>,
  ): Promise<PuestoDisponible[]> {
    return this.puestoDisponibleRepository.find(filter);
  }

  @patch('/puesto-disponibles')
  @response(200, {
    description: 'PuestoDisponible PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoDisponible, {partial: true}),
        },
      },
    })
    puestoDisponible: PuestoDisponible,
    @param.where(PuestoDisponible) where?: Where<PuestoDisponible>,
  ): Promise<Count> {
    return this.puestoDisponibleRepository.updateAll(puestoDisponible, where);
  }

  @get('/puesto-disponibles/{id}')
  @response(200, {
    description: 'PuestoDisponible model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PuestoDisponible, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PuestoDisponible, {exclude: 'where'}) filter?: FilterExcludingWhere<PuestoDisponible>
  ): Promise<PuestoDisponible> {
    return this.puestoDisponibleRepository.findById(id, filter);
  }

  @patch('/puesto-disponibles/{id}')
  @response(204, {
    description: 'PuestoDisponible PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoDisponible, {partial: true}),
        },
      },
    })
    puestoDisponible: PuestoDisponible,
  ): Promise<void> {
    await this.puestoDisponibleRepository.updateById(id, puestoDisponible);
  }

  @put('/puesto-disponibles/{id}')
  @response(204, {
    description: 'PuestoDisponible PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() puestoDisponible: PuestoDisponible,
  ): Promise<void> {
    await this.puestoDisponibleRepository.replaceById(id, puestoDisponible);
  }

  @del('/puesto-disponibles/{id}')
  @response(204, {
    description: 'PuestoDisponible DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.puestoDisponibleRepository.deleteById(id);
  }
}
