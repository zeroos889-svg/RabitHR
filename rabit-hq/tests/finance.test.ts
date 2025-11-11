import { describe, it, expect } from 'vitest'
import { calculateFinancials } from '../lib/finance'

describe('finance calculations', () => {
  it('always returns a snapshot shape even when DB is unavailable', async () => {
    const snapshot = await calculateFinancials(2)

    expect(snapshot.lookbackMonths).toBe(2)
    expect(typeof snapshot.totalCapital).toBe('number')
    expect(Array.isArray(snapshot.monthlyBurnHistory)).toBe(true)
    expect(['healthy', 'warning', 'critical']).toContain(snapshot.status)
    expect(snapshot.source === 'database' || snapshot.source === 'fallback').toBe(true)
  })
})
