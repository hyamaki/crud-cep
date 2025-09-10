import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import {
  ClienteRequestDTO,
} from '../../../../application/dtos/clientes/cliente-request.dto';
import {
  ICadastrarClienteService,
  CADASTRAR_CLIENTE_SERVICE_INTERFACE,
} from '../../../../application/services/_interfaces/cliente/cadastrar-cliente.interface';
import {
  IListarClienteService,
  LISTAR_CLIENTE_SERVICE_INTERFACE,
} from '../../../../application/services/_interfaces/cliente/listar-cliente.interface';
import { ListaPaginadaClienteResponse } from '../responses/clientes/lista-paginada-cliente.response';
import { FindOperator, Like, Or } from 'typeorm';
import { IObterClienteService, OBTER_CLIENTE_SERVICE_INTERFACE } from '../../../../application/services/_interfaces/cliente/obter-cliente.interface';
import { ATUALIZAR_CLIENTE_SERVICE_INTERFACE, IAtualizarClienteService } from '../../../../application/services/_interfaces/cliente/atualizar-cliente.interface';
import { ApplicationException } from '../../../../shared/exceptions/application.exception';
import { EXCLUIR_CLIENTE_SERVICE_INTERFACE, IExcluirClienteService } from '../../../../application/services/_interfaces/cliente/excluir-cliente.interface';

@injectable()
export class ClientesController {
  private iCadastrarClienteService: ICadastrarClienteService;
  private iListarClienteService: IListarClienteService;
  private iObterClienteService: IObterClienteService;
  private iAtualizarClienteService: IAtualizarClienteService;
  private iExcluirClienteService: IExcluirClienteService;

  constructor(
    @inject(CADASTRAR_CLIENTE_SERVICE_INTERFACE)
    iCadastrarClienteService: ICadastrarClienteService,
    @inject(LISTAR_CLIENTE_SERVICE_INTERFACE)
    iListarClienteService: IListarClienteService,
    @inject(OBTER_CLIENTE_SERVICE_INTERFACE)
    iObterClienteService: IObterClienteService,
    @inject(ATUALIZAR_CLIENTE_SERVICE_INTERFACE)
    iAtualizarClienteService: IAtualizarClienteService,
    @inject(EXCLUIR_CLIENTE_SERVICE_INTERFACE)
    iExcluirClienteService: IExcluirClienteService,
  ) {
    this.iCadastrarClienteService = iCadastrarClienteService;
    this.iListarClienteService = iListarClienteService;
    this.iObterClienteService = iObterClienteService;
    this.iAtualizarClienteService = iAtualizarClienteService;
    this.iExcluirClienteService = iExcluirClienteService;
  }

  async index(req: Request, res: Response) {
    const pagina =
      typeof req.query.pagina === 'string' ? parseInt(req.query.pagina) : 1;
    const qtdItens =
      typeof req.query.itens === 'string' ? parseInt(req.query.itens) : 10;

    let filtros : any= [];
    if (req.query.search !== undefined) {
      filtros = [
        { Codigo: Like(`%${req.query.search.toString()}%`) },
        { Nome: Like(`%${req.query.search.toString()}%`) },
        { Cidade: Like(`%${req.query.search.toString()}%`) },
        { CEP: Like(`%${req.query.search.toString()}%`) },
      ]
    }

    try {
      const clientes = await this.iListarClienteService.executar(
        pagina,
        qtdItens,
        filtros,
      );

      res.status(200).json({
        data: ListaPaginadaClienteResponse.serialize(
          clientes,
          pagina,
          qtdItens,
        ),
      });
    } catch (error: any) {
      console.log(error)
      res.status(500).json({
        name: 'Exception',
        statusCode: 500,
        description: (error as Error).toString(),
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const novoClienteRequestDTO: ClienteRequestDTO =
        req.body as ClienteRequestDTO;
      const clienteCadastrado = await this.iCadastrarClienteService.executar(
        novoClienteRequestDTO,
      );

      res.status(201).json({
        data: clienteCadastrado
      });
    } catch (error: any) {
      res.status(500).json({
        name: 'Exception',
        statusCode: 500,
        description: (error as Error).toString(),
      });
    }
  }

  async detalhes(req: Request, res: Response) {
    try {
      const cliente = await this.iObterClienteService.executar({
        campo: 'id',
        valor: req.params.id,
      });

      res.status(200).json({
        data: cliente,
      });
    } catch (error: any) {
      if (error instanceof ApplicationException) {
        res.status(400).json(error);
      } else {
        res.status(500).json({
          name: 'Exception',
          statusCode: 500,
          description: (error as Error).toString(),
        });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const atualizarClienteRequestDTO: ClienteRequestDTO =
        req.body as ClienteRequestDTO;
      const clienteAtualizado = await this.iAtualizarClienteService.executar(
        parseInt(req.params.id),
        atualizarClienteRequestDTO,
      );

      res.status(200).json({
        data: clienteAtualizado,
      });
    } catch (error: any) {
      if (error instanceof ApplicationException) {
        res.status(400).json(error);
      } else {
        res.status(500).json({
          name: 'Exception',
          statusCode: 500,
          description: (error as Error).toString(),
        });
      }
    }
  }
  
  async delete(req: Request, res: Response) {
    try {
      const clienteExcluido = await this.iExcluirClienteService.executar(
        parseInt(req.params.id),
      );

      res.status(200).json({
        data: clienteExcluido,
      });
    } catch (error: any) {
      if (error instanceof ApplicationException) {
        res.status(400).json(error);
      } else {
        res.status(500).json({
          name: 'Exception',
          statusCode: 500,
          description: (error as Error).toString(),
        });
      }
    }
  }
}
