require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const machineRoutes = require('./routes/machines');
const maintenanceRoutes = require('./routes/maintenances');

const { errorHandler } = require('./middlewares/errorHandler');
const app = express();
connectDB();

app.use(helmet()); 
app.use(cors()); 
app.use(express.json()); 

app.use('/api/auth', authRoutes); 
app.use('/api/machines', machineRoutes); 
app.use('/api/maintenances', maintenanceRoutes); 

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
