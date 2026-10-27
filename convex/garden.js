import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

const stages = ['seed', 'sprout', 'bud', 'bloom']
const stageValidator = v.union(
  v.literal('seed'),
  v.literal('sprout'),
  v.literal('bud'),
  v.literal('bloom'),
)

function validateDeviceKey(deviceKey) {
  if (typeof deviceKey !== 'string' || deviceKey.length < 20 || deviceKey.length > 80 || !/^[a-zA-Z0-9-]+$/.test(deviceKey)) {
    throw new Error('Invalid device key')
  }
}

function growthStage(plantedAt, now = Date.now()) {
  const age = Math.max(0, now - plantedAt)
  if (age < 60_000) return 'seed'
  if (age < 60 * 60_000) return 'sprout'
  if (age < 24 * 60 * 60_000) return 'bud'
  return 'bloom'
}

export const listCommunity = query({
  args: {},
  returns: v.array(v.object({
    plantedAt: v.number(),
    stage: stageValidator,
  })),
  handler: async (ctx) => {
    const flowers = await ctx.db.query('flowers')
      .withIndex('by_updatedAt')
      .order('desc')
      .take(120)
    return flowers.map((flower) => ({
      plantedAt: flower.plantedAt,
      stage: growthStage(flower.plantedAt),
    }))
  },
})

export const getMyFlower = query({
  args: { deviceKey: v.string() },
  returns: v.union(v.null(), v.object({
    plantedAt: v.number(),
    stage: stageValidator,
  })),
  handler: async (ctx, { deviceKey }) => {
    validateDeviceKey(deviceKey)
    const flower = await ctx.db.query('flowers')
      .withIndex('by_deviceKey', (q) => q.eq('deviceKey', deviceKey))
      .first()
    if (!flower) return null
    return { plantedAt: flower.plantedAt, stage: growthStage(flower.plantedAt) }
  },
})

export const plantFlower = mutation({
  args: { deviceKey: v.string() },
  returns: v.object({ plantedAt: v.number(), stage: stageValidator }),
  handler: async (ctx, { deviceKey }) => {
    validateDeviceKey(deviceKey)
    const now = Date.now()
    const existing = await ctx.db.query('flowers')
      .withIndex('by_deviceKey', (q) => q.eq('deviceKey', deviceKey))
      .first()
    if (existing) {
      await ctx.db.patch(existing._id, { plantedAt: now, updatedAt: now })
    } else {
      await ctx.db.insert('flowers', { deviceKey, plantedAt: now, updatedAt: now })
    }
    return { plantedAt: now, stage: growthStage(now, now) }
  },
})
