import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PuestoDisponible,
  Aspirante,
} from '../models';
import {PuestoDisponibleRepository} from '../repositories';

export class PuestoDisponibleAspiranteController {
  constructor(
    @repository(PuestoDisponibleRepository)
    public puestoDisponibleRepository: PuestoDisponibleRepository,
  ) { }

  @get('/puesto-disponibles/{id}/aspirante', {
    responses: {
      '200': {
        description: 'Aspirante belonging to PuestoDisponible',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aspirante)},
          },
        },
      },
    },
  })
  async getAspirante(
    @param.path.string('id') id: typeof PuestoDisponible.prototype.id,
  ): Promise<Aspirante> {
    return this.puestoDisponibleRepository.aspirante(id);
  }
}
