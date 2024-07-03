

export class Vector2 {
  constructor (
    public x: number,
    public y: number
  ) {}

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normalize() {
    const length = this.magnitude()
    return new Vector2(this.x / length, this.y / length)
  }

  add(vector: Vector2) {
    return new Vector2(this.x + vector.x, this.y + vector.y)
  }

  subtract(vector: Vector2) {
    return new Vector2(this.x - vector.x, this.y - vector.y)
  }

  multiply(scalar: number) {
    return new Vector2(this.x * scalar, this.y * scalar)
  }

  static direction(from: Vector2, to: Vector2) {
    return new Vector2(to.x - from.x, to.y - from.y).normalize()
  }

  static distance(from: Vector2, to: Vector2) {
    return Math.sqrt(
      Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)
    )
  }
}