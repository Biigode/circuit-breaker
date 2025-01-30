export class CircuitBreaker {
  private failureCount: number = 0;
  private lastFailureTime: number = 0;
  private state: "CLOSED" | "OPEN" | "HALF-OPEN" = "CLOSED";
  private fallbackServices: string[] = [];

  constructor(
    private failureThreshold: number, // Número máximo de falhas antes de abrir o circuito
    private recoveryTime: number, // Tempo para tentar recuperar o circuito (em ms)
    fallbackServices: string[] = [] // Lista de serviços de fallback
  ) {
    this.fallbackServices = fallbackServices;
  }

  private isRecoveryTimeElapsed(): boolean {
    return Date.now() - this.lastFailureTime > this.recoveryTime;
  }

  public async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === "OPEN") {
      if (this.isRecoveryTimeElapsed()) {
        console.log("Circuito meio-aberto: Testando serviço...");
        this.state = "HALF-OPEN";
      } else {
        console.log("Circuito aberto: Roteando para o fallback...");
        return await this.callFallbackServices(); // Chama os fallbacks
      }
    }

    try {
      const result = await fn();
      this.reset();
      return result;
    } catch (error: any) {
      this.failureCount++;
      this.lastFailureTime = Date.now();

      if (this.failureCount >= this.failureThreshold) {
        console.log("Circuito aberto: Muitas falhas detectadas");
        this.state = "OPEN";
      }

      throw new Error(error.message);
    }
  }

  private async callFallbackServices(): Promise<any> {
    for (const fallbackService of this.fallbackServices) {
      try {
        console.log(`Tentando fallback para: ${fallbackService}`);
        const response = await fetch(fallbackService);
        if (response.ok) {
          console.log(`Fallback bem-sucedido para: ${fallbackService}`);
          return response.json();
        }
      } catch (error) {
        console.error(`Erro ao chamar fallback: ${fallbackService}`);
      }
    }
    throw new Error("Todos os fallbacks falharam.");
  }

  private reset() {
    this.failureCount = 0;
    this.state = "CLOSED";
  }
}
