const express = require("express");
const { z } = require("zod");
const auth = require("../middleware/auth");
const Order = require("../models/Orders");

const router = express.Router();

// Schema de validação
const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        qty: z.number().int().min(1),
      }),
    )
    .min(1),
  notes: z.string().max(500).optional(),
});

// Criar um novo pedido
router.post("/", auth, async (req, res) => {
  try {
    const data = createOrderSchema.parse(req.body);

    if (!req.user?.id) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const order = await Order.create({
      userId: req.user.id,
      items: data.items,
      notes: data.notes,
    });

    return res.status(201).json({
      message: "Pedido criado com sucesso",
      order: {
        id: order._id,
        userId: order.userId,
        items: order.items,
        notes: order.notes,
        createdAt: order.createdAt,
      },
    });
  } catch (err) {
    if (err?.issues) {
      return res.status(400).json({ error: "Dados inválidos", details: err.issues });
    }
    console.error("Erro ao criar pedido:", err);
    return res.status(500).json({ error: "Erro interno ao criar o pedido" });
  }
});

module.exports = router;
