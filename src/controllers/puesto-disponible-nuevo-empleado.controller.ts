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
  PuestoDisponible,
  NuevoEmpleado,
} from '../models';
import {PuestoDisponibleRepository} from '../repositories';

export class PuestoDisponibleNuevoEmpleadoController {
  constructor(
    @repository(PuestoDisponibleRepository) protected puestoDisponibleRepository: PuestoDisponibleRepository,
  ) { }

  @get('/puesto-disponibles/{id}/nuevo-empleados', {
    responses: {
      '200': {
        description: 'Array of PuestoDisponible has many NuevoEmpleado',
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
    return this.puestoDisponibleRepository.nuevoEmpleados(id).find(filter);
  }

  @post('/puesto-disponibles/{id}/nuevo-empleados', {
    responses: {
      '200': {
        description: 'PuestoDisponible model instance',
        content: {'application/json': {schema: getModelSchemaRef(NuevoEmpleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PuestoDisponible.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NuevoEmpleado, {
            title: 'NewNuevoEmpleadoInPuestoDisponible',
            exclude: ['id'],
            optional: ['puestoDisponibleId']
          }),
        },
      },
    }) nuevoEmpleado: Omit<NuevoEmpleado, 'id'>,
  ): Promise<NuevoEmpleado> {
    return this.puestoDisponibleRepository.nuevoEmpleados(id).create(nuevoEmpleado);
  }

  @patch('/puesto-disponibles/{id}/nuevo-empleados', {
    responses: {
      '200': {
        description: 'PuestoDisponible.NuevoEmpleado PATCH success count',
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
    return this.puestoDisponibleRepository.nuevoEmpleados(id).patch(nuevoEmpleado, where);
  }

  @del('/puesto-disponibles/{id}/nuevo-empleados', {
    responses: {
      '200': {
        description: 'PuestoDisponible.NuevoEmpleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(NuevoEmpleado)) where?: Where<NuevoEmpleado>,
  ): Promise<Count> {
    return this.puestoDisponibleRepository.nuevoEmpleados(id).delete(where);
  }
}
