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
import {NuevoEmpleado} from '../models';
import {NuevoEmpleadoRepository} from '../repositories';

export class NuevoEmpleadoController {
  constructor(
    @repository(NuevoEmpleadoRepository)
    public nuevoEmpleadoRepository : NuevoEmpleadoRepository,
  ) {}

  @post('/nuevo-empleados')
  @response(200, {
    description: 'NuevoEmpleado model instance',
    content: {'application/json': {schema: getModelSchemaRef(NuevoEmpleado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NuevoEmpleado, {
            title: 'NewNuevoEmpleado',
            exclude: ['id'],
          }),
        },
      },
    })
    nuevoEmpleado: Omit<NuevoEmpleado, 'id'>,
  ): Promise<NuevoEmpleado> {
    return this.nuevoEmpleadoRepository.create(nuevoEmpleado);
  }

  @get('/nuevo-empleados/count')
  @response(200, {
    description: 'NuevoEmpleado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(NuevoEmpleado) where?: Where<NuevoEmpleado>,
  ): Promise<Count> {
    return this.nuevoEmpleadoRepository.count(where);
  }

  @get('/nuevo-empleados')
  @response(200, {
    description: 'Array of NuevoEmpleado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(NuevoEmpleado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(NuevoEmpleado) filter?: Filter<NuevoEmpleado>,
  ): Promise<NuevoEmpleado[]> {
    return this.nuevoEmpleadoRepository.find(filter);
  }

  @patch('/nuevo-empleados')
  @response(200, {
    description: 'NuevoEmpleado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NuevoEmpleado, {partial: true}),
        },
      },
    })
    nuevoEmpleado: NuevoEmpleado,
    @param.where(NuevoEmpleado) where?: Where<NuevoEmpleado>,
  ): Promise<Count> {
    return this.nuevoEmpleadoRepository.updateAll(nuevoEmpleado, where);
  }

  @get('/nuevo-empleados/{id}')
  @response(200, {
    description: 'NuevoEmpleado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(NuevoEmpleado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(NuevoEmpleado, {exclude: 'where'}) filter?: FilterExcludingWhere<NuevoEmpleado>
  ): Promise<NuevoEmpleado> {
    return this.nuevoEmpleadoRepository.findById(id, filter);
  }

  @patch('/nuevo-empleados/{id}')
  @response(204, {
    description: 'NuevoEmpleado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NuevoEmpleado, {partial: true}),
        },
      },
    })
    nuevoEmpleado: NuevoEmpleado,
  ): Promise<void> {
    await this.nuevoEmpleadoRepository.updateById(id, nuevoEmpleado);
  }

  @put('/nuevo-empleados/{id}')
  @response(204, {
    description: 'NuevoEmpleado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() nuevoEmpleado: NuevoEmpleado,
  ): Promise<void> {
    await this.nuevoEmpleadoRepository.replaceById(id, nuevoEmpleado);
  }

  @del('/nuevo-empleados/{id}')
  @response(204, {
    description: 'NuevoEmpleado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.nuevoEmpleadoRepository.deleteById(id);
  }
}
