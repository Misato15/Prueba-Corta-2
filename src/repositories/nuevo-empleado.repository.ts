import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {NuevoEmpleado, NuevoEmpleadoRelations, Aspirante, PuestoDisponible} from '../models';
import {AspiranteRepository} from './aspirante.repository';
import {PuestoDisponibleRepository} from './puesto-disponible.repository';

export class NuevoEmpleadoRepository extends DefaultCrudRepository<
  NuevoEmpleado,
  typeof NuevoEmpleado.prototype.id,
  NuevoEmpleadoRelations
> {

  public readonly aspirante: BelongsToAccessor<Aspirante, typeof NuevoEmpleado.prototype.id>;

  public readonly puestoDisponible: BelongsToAccessor<PuestoDisponible, typeof NuevoEmpleado.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('AspiranteRepository') protected aspiranteRepositoryGetter: Getter<AspiranteRepository>, @repository.getter('PuestoDisponibleRepository') protected puestoDisponibleRepositoryGetter: Getter<PuestoDisponibleRepository>,
  ) {
    super(NuevoEmpleado, dataSource);
    this.puestoDisponible = this.createBelongsToAccessorFor('puestoDisponible', puestoDisponibleRepositoryGetter,);
    this.registerInclusionResolver('puestoDisponible', this.puestoDisponible.inclusionResolver);
    this.aspirante = this.createBelongsToAccessorFor('aspirante', aspiranteRepositoryGetter,);
    this.registerInclusionResolver('aspirante', this.aspirante.inclusionResolver);
  }
}
