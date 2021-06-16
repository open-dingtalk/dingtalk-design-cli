type TickKey = string | number;

export class Performance {
  private tickMap: Record<TickKey, number>;

  constructor() {
    this.tickMap = {};
  }

  tick(key: TickKey): void {
    this.tickMap[key] = Date.now();
  }

  interval(start: TickKey, end: TickKey): number {
    return this.tickMap[end] - this.tickMap[start];
  }
}

export default new Performance();