import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Aspirante, AspiranteRelations, PuestoDisponible} from '../models';
import {PuestoDisponibleRepository} from './puesto-disponible.repository';

export class AspiranteRepository extends DefaultCrudRepository<
  Aspirante,
  typeof Aspirante.prototype.id,
  AspiranteRelations
> {

  public readonly puestoDisponibles: HasManyRepositoryFactory<PuestoDisponible, typeof Aspirante.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('PuestoDisponibleRepository') protected puestoDisponibleRepositoryGetter: Getter<PuestoDisponibleRepository>,
  ) {
    super(Aspirante, dataSource);
    this.puestoDisponibles = this.createHasManyRepositoryFactoryFor('puestoDisponibles', puestoDisponibleRepositoryGetter,);
    this.registerInclusionResolver('puestoDisponibles', this.puestoDisponibles.inclusionResolver);
  }
}
