import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import './App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    idUsuario: '',
    Codigo: '',
    Nome: '',
    CPF_CNPJ: '',
    Fone: '',
    LimiteCredito: '',
    Validade: '',
    CEP: '',
    Logradouro: '',
    Endereco: '',
    Numero: '',
    Bairro: '',
    Cidade: '',
    UF: ''
  });

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  useEffect(() => {
    fetchCustomers();
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm !== '') {
      fetchCustomers();
    }
  }, [searchTerm]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/clientes?pagina='+currentPage+'&search='+searchTerm);
      setCustomers(response.data.data.list);
      setTotalPages(response.data.data.total_pages)
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      Swal.fire('Erro!', 'Erro ao carregar clientes.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCepChange = async (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, CEP: e.target.value });
    
    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.data.erro) {
          setFormData(prev => ({
            ...prev,
            Logradouro: response.data.logradouro,
            Endereco: response.data.logradouro,
            Bairro: response.data.bairro,
            Cidade: response.data.localidade,
            UF: response.data.uf
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      idUsuario: '',
      Codigo: '',
      Nome: '',
      CPF_CNPJ: '',
      Fone: '',
      LimiteCredito: '',
      Validade: '',
      CEP: '',
      Logradouro: '',
      Endereco: '',
      Numero: '',
      Bairro: '',
      Cidade: '',
      UF: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCustomer) {
        await axios.put(`http://localhost:4000/clientes/${editingCustomer.ID}`, formData);
        fetchCustomers();
        setEditingCustomer(null);
        Swal.fire('Sucesso!', 'Cliente atualizado com sucesso.', 'success');
      } else {
        const response = await axios.post('http://localhost:4000/clientes', formData);
        fetchCustomers();
        Swal.fire('Sucesso!', 'Cliente cadastrado com sucesso.', 'success');
      }
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      Swal.fire('Erro!', 'Erro ao salvar cliente. Tente novamente.', 'error');
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      idUsuario: customer.idUsuario || '',
      Codigo: customer.Codigo || '',
      Nome: customer.Nome || '',
      CPF_CNPJ: customer.CPF_CNPJ || '',
      Fone: customer.Fone || '',
      LimiteCredito: customer.LimiteCredito || '',
      Validade: customer.Validade || '',
      CEP: customer.CEP || '',
      Logradouro: customer.Logradouro || '',
      Endereco: customer.Endereco || '',
      Numero: customer.Numero || '',
      Bairro: customer.Bairro || '',
      Cidade: customer.Cidade || '',
      UF: customer.UF || ''
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:4000/clientes/${id}`);
          fetchCustomers();
          Swal.fire('Excluído!', 'Cliente foi excluído.', 'success');
        } catch (error) {
          console.error('Erro ao excluir cliente:', error);
          Swal.fire('Erro!', 'Erro ao excluir cliente.', 'error');
        }
      }
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const  = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCancel = () => {
    setEditingCustomer(null);
    resetForm();
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Gerenciamento de Clientes</h1>
      
      {/* Form */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>{editingCustomer ? 'Editar Cliente' : 'Cadastrar Cliente'}</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">ID Usuário</label>
                <input
                  type="text"
                  className="form-control"
                  name="idUsuario"
                  value={formData.idUsuario}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Código</label>
                <input
                  type="text"
                  className="form-control"
                  name="Codigo"
                  value={formData.Codigo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  name="Nome"
                  value={formData.Nome}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">CPF/CNPJ</label>
                <input
                  type="text"
                  className="form-control"
                  name="CPF_CNPJ"
                  value={formData.CPF_CNPJ}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">Telefone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="Fone"
                  value={formData.Fone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Limite de Crédito</label>
                <input
                  type="text"
                  className="form-control"
                  name="LimiteCredito"
                  value={formData.LimiteCredito}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Validade</label>
                <input
                  type="date"
                  className="form-control"
                  name="Validade"
                  value={formData.Validade}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">CEP</label>
                <input
                  type="text"
                  className="form-control"
                  name="CEP"
                  value={formData.CEP}
                  onChange={handleCepChange}
                  placeholder="00000-000"
                  maxLength="9"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 mb-3">
                <label className="form-label">Logradouro</label>
                <input
                  type="text"
                  className="form-control"
                  name="Logradouro"
                  value={formData.Logradouro}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Número</label>
                <input
                  type="text"
                  className="form-control"
                  name="Numero"
                  value={formData.Numero}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label">Endereço Completo</label>
                <input
                  type="text"
                  className="form-control"
                  name="Endereco"
                  value={formData.Endereco}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Bairro</label>
                <input
                  type="text"
                  className="form-control"
                  name="Bairro"
                  value={formData.Bairro}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Cidade</label>
                <input
                  type="text"
                  className="form-control"
                  name="Cidade"
                  value={formData.Cidade}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-2 mb-3">
                <label className="form-label">UF</label>
                <select
                  className="form-control"
                  name="UF"
                  value={formData.UF}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione</option>
                  {estados.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                {editingCustomer ? 'Atualizar' : 'Cadastrar'} Cliente
              </button>
              {editingCustomer && (
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Search Filter */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Buscar Clientes</label>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o Código, Nome, Cidade ou CEP para buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="card">
        <div className="card-header">
          <h5>Lista de Clientes</h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          ) : customers.length === 0 ? (
            <p className="text-muted">Nenhum cliente encontrado.</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Nome</th>
                      <th>CPF/CNPJ</th>
                      <th>Telefone</th>
                      <th>Limite</th>
                      <th>Validade</th>
                      <th>CEP</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.ID}>
                        <td>{customer.Codigo}</td>
                        <td>{customer.Nome}</td>
                        <td>{customer.CPF_CNPJ}</td>
                        <td>{customer.Fone}</td>
                        <td>{customer.LimiteCredito}</td>
                        <td>{customer.Validade}</td>
                        <td>{customer.CEP}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(customer)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(customer.ID)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <nav>
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                        Anterior
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => paginate(index + 1)}>
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                        Próximo
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
