import express from 'express';
import { container } from 'tsyringe';
import { ClientesController } from '../controllers/clientes.controller';

const controller = (): ClientesController => {
  return container.resolve(ClientesController);
};

const router = express.Router();

router.get('/clientes', (req, res) => controller().index(req, res));
router.post('/clientes', (req, res) => controller().create(req, res));
router.get('/clientes/:id', (req, res) => controller().detalhes(req, res));
router.put('/clientes/:id', (req, res) => controller().update(req, res));
router.delete('/clientes/:id', (req, res) => controller().delete(req, res));

export default router;
