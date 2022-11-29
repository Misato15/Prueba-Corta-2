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
  NuevoEmpleado,
} from '../models';
import {AspiranteRepository} from '../repositories';

export class AspiranteNuevoEmpleadoController {
  constructor(
    @repository(AspiranteRepository) protected aspiranteRepository: AspiranteRepository,
  ) { }

  @get('/aspirantes/{id}/nuevo-empleados', {
    responses: {
      '200': {
        description: 'Array of Aspirante has many NuevoEmpleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(NuevoEmpleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<NuevoEmpleado>,
  ): Promise<NuevoEmpleado[]> {
    return this.aspiranteRepository.nuevoEmpleados(id).find(filter);
  }

  @post('/aspirantes/{id}/nuevo-empleados', {
    responses: {
      '200': {
        description: 'Aspirante model instance',
        content: {'application/json': {schema: getModelSchemaRef(NuevoEmpleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Aspirante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NuevoEmpleado, {
            title: 'NewNuevoEmpleadoInAspirante',
            exclude: ['id'],
            optional: ['aspiranteId']
          }),
        },
      },
    }) nuevoEmpleado: Omit<NuevoEmpleado, 'id'>,
  ): Promise<NuevoEmpleado> {
    return this.aspiranteRepository.nuevoEmpleados(id).create(nuevoEmpleado);
  }

  @patch('/aspirantes/{id}/nuevo-empleados', {
    responses: {
      '200': {
        description: 'Aspirante.NuevoEmpleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NuevoEmpleado, {partial: true}),
        },
      },
    })
    nuevoEmpleado: Partial<NuevoEmpleado>,
    @param.query.object('where', getWhereSchemaFor(NuevoEmpleado)) where?: Where<NuevoEmpleado>,
  ): Promise<Count> {
    return this.aspiranteRepository.nuevoEmpleados(id).patch(nuevoEmpleado, where);
  }

  @del('/aspirantes/{id}/nuevo-empleados', {
    responses: {
      '200': {
        description: 'Aspirante.NuevoEmpleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(NuevoEmpleado)) where?: Where<NuevoEmpleado>,
  ): Promise<Count> {
    return this.aspiranteRepository.nuevoEmpleados(id).delete(where);
  }
}
