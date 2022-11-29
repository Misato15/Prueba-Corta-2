import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {PuestoDisponible, PuestoDisponibleRelations, NuevoEmpleado} from '../models';
import {NuevoEmpleadoRepository} from './nuevo-empleado.repository';

export class PuestoDisponibleRepository extends DefaultCrudRepository<
  PuestoDisponible,
  typeof PuestoDisponible.prototype.id,
  PuestoDisponibleRelations
> {

  public readonly nuevoEmpleados: HasManyRepositoryFactory<NuevoEmpleado, typeof PuestoDisponible.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('NuevoEmpleadoRepository') protected nuevoEmpleadoRepositoryGetter: Getter<NuevoEmpleadoRepository>,
  ) {
    super(PuestoDisponible, dataSource);
    this.nuevoEmpleados = this.createHasManyRepositoryFactoryFor('nuevoEmpleados', nuevoEmpleadoRepositoryGetter,);
    this.registerInclusionResolver('nuevoEmpleados', this.nuevoEmpleados.inclusionResolver);
  }
}
