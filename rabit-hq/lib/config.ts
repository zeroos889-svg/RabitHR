export const config = {
  featureEnableAI: (process.env.FEATURE_ENABLE_AI || 'false') === 'true',
  featureEnableInvestor: (process.env.FEATURE_ENABLE_INVESTOR || 'true') === 'true',
  openAiKey: process.env.OPENAI_API_KEY || null,
}
