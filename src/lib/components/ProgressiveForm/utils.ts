export class Diagnosis {
  text: string
  path: string[]

  constructor(text: string, path: string[]) {
    this.text = text
    this.path = path
  }

  pathString(): string {
    return this.path.join(" > ")
  }
}
