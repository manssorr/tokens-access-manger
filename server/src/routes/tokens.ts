import { Router, Request, Response, type IRouter } from 'express'
import { getAllTokens, renewToken, createToken, deleteToken, seedTokens } from '../data/mockTokens.js'
import { TokensResponse, RenewResponse, CreateTokenRequest, CreateTokenResponse, DeleteResponse, SeedResponse } from '../types/token.js'

export const tokensRouter: IRouter = Router()

// GET /api/tokens - Get all tokens
tokensRouter.get('/', (_req: Request, res: Response<TokensResponse>) => {
  try {
    const tokens = getAllTokens()
    console.log(`✅ Fetched ${tokens.length} tokens`)
    res.json({
      success: true,
      data: tokens
    })
  } catch (error) {
    console.error('❌ Error fetching tokens:', error)
    res.status(500).json({
      success: false,
      data: []
    })
  }
})

// POST /api/tokens - Create new token
tokensRouter.post('/', (req: Request<{}, {}, CreateTokenRequest>, res: Response<CreateTokenResponse>) => {
  try {
    const { serviceName, token, expiryDate } = req.body

    // Validation
    if (!serviceName || !token || !expiryDate) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields',
        error: 'serviceName, token, and expiryDate are required'
      })
      return
    }

    // Validate date format
    const date = new Date(expiryDate)
    if (isNaN(date.getTime())) {
      res.status(400).json({
        success: false,
        message: 'Invalid date format',
        error: 'expiryDate must be a valid ISO 8601 date'
      })
      return
    }

    const newToken = createToken(serviceName, token, expiryDate)
    console.log(`✅ Created token for service: ${serviceName}`)

    res.status(201).json({
      success: true,
      message: 'Token created successfully',
      data: newToken
    })
  } catch (error) {
    console.error('❌ Error creating token:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// POST /api/tokens/:id/renew - Renew a token (stub)
tokensRouter.post('/:id/renew', (req: Request, res: Response<RenewResponse>) => {
  try {
    const { id } = req.params
    const renewedToken = renewToken(id)

    if (!renewedToken) {
      console.log(`⚠️  Token not found for renewal: ${id}`)
      res.status(404).json({
        success: false,
        message: 'Token not found',
        error: `No token found with id: ${id}`
      })
      return
    }

    console.log(`✅ Renewed token: ${renewedToken.serviceName} (${id})`)
    res.json({
      success: true,
      message: 'Token renewed successfully',
      data: renewedToken
    })
  } catch (error) {
    console.error('❌ Error renewing token:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// DELETE /api/tokens/:id - Delete a token
tokensRouter.delete('/:id', (req: Request, res: Response<DeleteResponse>) => {
  try {
    const { id } = req.params
    const deleted = deleteToken(id)

    if (!deleted) {
      console.log(`⚠️  Token not found for deletion: ${id}`)
      res.status(404).json({
        success: false,
        message: 'Token not found',
        error: `No token found with id: ${id}`
      })
      return
    }

    console.log(`✅ Deleted token: ${id}`)
    res.json({
      success: true,
      message: 'Token deleted successfully'
    })
  } catch (error) {
    console.error('❌ Error deleting token:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// POST /api/tokens/seed - Seed random tokens
tokensRouter.post('/seed', (req: Request, res: Response<SeedResponse>) => {
  try {
    const count = req.body.count || 10
    const newTokens = seedTokens(count)

    console.log(`✅ Seeded ${newTokens.length} random tokens`)
    res.status(201).json({
      success: true,
      message: `Successfully seeded ${newTokens.length} tokens`,
      data: newTokens
    })
  } catch (error) {
    console.error('❌ Error seeding tokens:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})
