import  express  from "express";
import { adminRouter } from "../routers/admin.routes.js";
import { departmentsRouter } from "../routers/departments.routes.js";
import { directionsRouter } from "../routers/directions.routes.js";
import { positionsRouter } from "../routers/positions.routes.js";
import { groupsRouter } from "../routers/groups.routes.js";
import { userssRouter } from "../routers/users.routes.js";
import { checksRouter } from "../routers/checks.routes.js";
import { incomesRouter } from "../routers/incomes.routes.js";
import { outlaysRouter } from "../routers/outlays.routes.js";
const PORT = 4500;
const app = express()
app.use(express.json())
app.use('/admin', adminRouter)
app.use('/groups', groupsRouter)
app.use('/users', userssRouter)
app.use('/incomes', incomesRouter)
app.use('/outlays', outlaysRouter)
app.use('/checks', checksRouter)
app.use('/positions', positionsRouter)
app.use('/directions', directionsRouter)
app.use('/department', departmentsRouter)
app.listen(PORT)