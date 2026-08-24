export class EngineUnavailableError extends Error {
  constructor(message, options) {
    super(message, options)
    this.name = 'EngineUnavailableError'
  }
}
