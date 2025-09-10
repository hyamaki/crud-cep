import { DataSource, Repository } from 'typeorm';
import { container } from 'tsyringe';
import { BASE_SERVICE_INTERFACE } from '../../domain/services/_interfaces/base-service.interface';
import { BaseService } from '../../domain/services/base.service';
import { CLIENTE_REPOSITORY_INTERFACE } from '../../domain/repository/cliente-repository.interface';
import { TYPEORM_CLIENTE_REPOSITORY_INTERFACE, TypeORMClienteRepository } from '../database/repository/typeorm-cliente.repository';
import { ClienteEntity } from '../database/entities/cliente.entity';
import { CLIENTE_SERVICE_INTERFACE } from '../../domain/services/_interfaces/cliente-service.interface';
import { ClienteService } from '../../domain/services/cliente.service';
import { ATUALIZAR_CLIENTE_SERVICE_INTERFACE } from '../../application/services/_interfaces/cliente/atualizar-cliente.interface';
import { AtualizarClienteService } from '../../application/services/cliente/atualizar-cliente.service';
import { CADASTRAR_CLIENTE_SERVICE_INTERFACE } from '../../application/services/_interfaces/cliente/cadastrar-cliente.interface';
import { CadastrarClienteService } from '../../application/services/cliente/cadastrar-cliente.service';
import { LISTAR_CLIENTE_SERVICE_INTERFACE } from '../../application/services/_interfaces/cliente/listar-cliente.interface';
import { ListarClienteService } from '../../application/services/cliente/listar-cliente.service';
import { OBTER_CLIENTE_SERVICE_INTERFACE } from '../../application/services/_interfaces/cliente/obter-cliente.interface';
import { ObterClienteService } from '../../application/services/cliente/obter-cliente.service';
import { EXCLUIR_CLIENTE_SERVICE_INTERFACE } from '../../application/services/_interfaces/cliente/excluir-cliente.interface';
import { ExcluirClienteService } from '../../application/services/cliente/excluir-cliente.service';

export function registerDependencies(dataSource: DataSource) {

  container.register(ATUALIZAR_CLIENTE_SERVICE_INTERFACE, {
    useClass: AtualizarClienteService,
  });
  container.register(CADASTRAR_CLIENTE_SERVICE_INTERFACE, {
    useClass: CadastrarClienteService,
  });
  container.register(LISTAR_CLIENTE_SERVICE_INTERFACE, {
    useClass: ListarClienteService,
  });
  container.register(OBTER_CLIENTE_SERVICE_INTERFACE, {
    useClass: ObterClienteService,
  });
  container.register(EXCLUIR_CLIENTE_SERVICE_INTERFACE, {
    useClass: ExcluirClienteService,
  });


  container.register(BASE_SERVICE_INTERFACE, { useValue: BaseService });
  container.register(CLIENTE_SERVICE_INTERFACE, {
    useClass: ClienteService,
  });

  container.register(CLIENTE_REPOSITORY_INTERFACE, {
    useClass: TypeORMClienteRepository,
  });
  container.register<Repository<ClienteEntity>>(
    TYPEORM_CLIENTE_REPOSITORY_INTERFACE,
    { useFactory: () => dataSource.getRepository(ClienteEntity) },
  );
}
