class IdGenerate {
  private counter: number
  private typeStr: string
  constructor(type = 0) {
    if (!Number.isInteger(type) || type < 0 || type >= 100) {
      throw new Error('type must be int and between 0 and 99')
    }
    this.counter = Math.floor(Math.random() * 100)
    this.typeStr = this.padZero(type, 2)
  }

  private padZero(num: number, length: number): string {
    let n = String(num)
    while (n.length < length) {
      n = `0${n}`
    }
    return n
  }

  private addCounter() {
    this.counter += 1
    this.counter = this.counter % 100
    return this.counter
  }

  /**
   * generate a random ID
   * The ID is designed considering low-confliction with high-readablity
   *
   * Its format is listed as follows:
   *
   *    [6-digits]           [5-digits]        [2-digits]     [3-digits]        [2-digits]
   * +--------------+------------------------+------------+----------------+--------------+
   * |    YYMMDD    |     UNIX_TS % 10^5     |    TYPE    |   UID % 10^3   |  RAND % 100  |
   * +--------------+------------------------+------------+----------------+--------------+
   *     <date>             <timestamp>          <type>        <uid>         <random number>
   * Total length: 18 digits
   *
   * @param userId - userId
   * @returns string - id
   */
  public generate(userId: number): number {
    const date = new Date()
    const counter = this.addCounter()
    const timestamp = Math.floor(date.getTime() / 1e3) % 1e5
    const uid = userId % 1000

    const YY = this.padZero(date.getFullYear() % 100, 2)
    const MM = this.padZero(date.getMonth() + 1, 2)
    const DD = this.padZero(date.getDate(), 2)

    const tsStr = this.padZero(timestamp, 5)
    const uidStr = this.padZero(uid, 3)
    const counterStr = this.padZero(counter, 2)

    return Number(`${YY}${MM}${DD}${tsStr}${this.typeStr}${uidStr}${counterStr}`)
  }
}

export default IdGenerate
