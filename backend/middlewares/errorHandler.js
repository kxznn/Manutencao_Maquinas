// middleware centralizado de erro
const errorHandler = (err, req, res, next) => {
  // log do erro no servidor
  console.error(err);
  // responder com status 500 por padrão e mensagem
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
};

// exportar
module.exports = { errorHandler };
