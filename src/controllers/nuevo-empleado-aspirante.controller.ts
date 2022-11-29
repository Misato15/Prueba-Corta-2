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
  Aspirante,
} from '../models';
import {NuevoEmpleadoRepository} from '../repositories';

export class NuevoEmpleadoAspiranteController {
  constructor(
    @repository(NuevoEmpleadoRepository)
    public nuevoEmpleadoRepository: NuevoEmpleadoRepository,
  ) { }

  @get('/nuevo-empleados/{id}/aspirante', {
    responses: {
      '200': {
        description: 'Aspirante belonging to NuevoEmpleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aspirante)},
          },
        },
      },
    },
  })
  async getAspirante(
    @param.path.string('id') id: typeof NuevoEmpleado.prototype.id,
  ): Promise<Aspirante> {
    return this.nuevoEmpleadoRepository.aspirante(id);
  }
}
