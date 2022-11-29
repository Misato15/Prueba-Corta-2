import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  NuevoEmpleado,
  PuestoDisponible,
} from '../models';
import {NuevoEmpleadoRepository} from '../repositories';

export class NuevoEmpleadoPuestoDisponibleController {
  constructor(
    @repository(NuevoEmpleadoRepository)
    public nuevoEmpleadoRepository: NuevoEmpleadoRepository,
  ) { }

  @get('/nuevo-empleados/{id}/puesto-disponible', {
    responses: {
      '200': {
        description: 'PuestoDisponible belonging to NuevoEmpleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PuestoDisponible)},
          },
        },
      },
    },
  })
  async getPuestoDisponible(
    @param.path.string('id') id: typeof NuevoEmpleado.prototype.id,
  ): Promise<PuestoDisponible> {
    return this.nuevoEmpleadoRepository.puestoDisponible(id);
  }
}
