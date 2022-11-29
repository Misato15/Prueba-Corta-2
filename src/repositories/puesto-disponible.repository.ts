import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {PuestoDisponible, PuestoDisponibleRelations, Aspirante} from '../models';
import {AspiranteRepository} from './aspirante.repository';

export class PuestoDisponibleRepository extends DefaultCrudRepository<
  PuestoDisponible,
  typeof PuestoDisponible.prototype.id,
  PuestoDisponibleRelations
> {

  public readonly aspirante: BelongsToAccessor<Aspirante, typeof PuestoDisponible.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('AspiranteRepository') protected aspiranteRepositoryGetter: Getter<AspiranteRepository>,
  ) {
    super(PuestoDisponible, dataSource);
    this.aspirante = this.createBelongsToAccessorFor('aspirante', aspiranteRepositoryGetter,);
    this.registerInclusionResolver('aspirante', this.aspirante.inclusionResolver);
  }
}
