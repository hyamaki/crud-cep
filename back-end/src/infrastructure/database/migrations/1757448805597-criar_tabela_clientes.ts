import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CriarTabelaClientes1757448805597 implements MigrationInterface {
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "clientes",
        columns: [
          {
            name: "ID",
            type: "bigint",
            unsigned: true,
            isNullable: false,
            isPrimary: true, 
            isGenerated: true, 
            generationStrategy: 'increment'
          },
          {
            name: "idUsuario",
            type: "bigint",
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'DataHoraCadastro',
            type: 'datetime',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'Codigo',
            type: 'varchar',
            length: '15',
            isNullable: false,
          },
          {
            name: 'Nome',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
          {
            name: 'CPF_CNPJ',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'CEP',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'Logradouro',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'Endereco',
            type: 'varchar',
            length: '120',
            isNullable: false,
          },
          {
            name: 'Numero',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'Bairro',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'Cidade',
            type: 'varchar',
            length: '60',
            isNullable: false,
          },
          {
            name: 'UF',
            type: 'varchar',
            length: '2',
            isNullable: false,
          },
          {
            name: 'Fone',
            type: 'varchar',
            length: '15',
            isNullable: false,
          },
          {
            name: "LimiteCredito",
            type: "float",
            isNullable: false,
            default: 0,
          },
          {
            name: 'Validade',
            type: 'date',
            isNullable: true,
          },
        ]
      })
    );
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("clientes")
  }
  
}
