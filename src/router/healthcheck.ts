import { Request, Response, Router } from 'express'
import { OK } from 'http-status'

const router = Router()
router.get('/healthcheck', (_: Request, res: Response) => res.sendStatus(OK))

export const HealthcheckRouter = router
