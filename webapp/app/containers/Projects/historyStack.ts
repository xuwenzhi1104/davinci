interface IHistory {
  name?: string
  pic?: number
  id?: number
}
class HistoryStack  {
  private item: IHistory[]
  private wrap: {}
  constructor () {
    this.item = []
    this.wrap = {}
    this.init()
  }
  public init () {
    const store = localStorage.getItem('historyBrowser')
    const user = this.getUser()
    console.log(user)
    if (store && store.length) {
      const result = this.parse(store)
      this.wrap = result
      if (user) {
        const items = this.wrap[user]
        if (items && items.length) {
          this.item = items
          this.wrap[user] = this.item
        } else {
          this.item = []
          this.wrap[user] = this.item
        }
      }
    } else {
      if (user) {
        this.item = []
        this.wrap[user] = this.item
      }
    }
  }
  public pushNode (d?: IHistory) {
    const user = this.getUser()
    const store = localStorage.getItem('historyBrowser')
    if (store) {
      const result = this.parse(store)
      this.wrap = result
      if (user && user.length) {
        if (result && result[user]) {
          const userArr = result[user]
          if (userArr && Array.isArray(userArr)) {
            this.item = userArr
          } else {
            this.item = []
          }
          this.wrap[user] = this.item
        } else {
          this.item = []
          this.wrap[user] = this.item
        }
      }
    } else {
      if (user) {
        this.item = []
        this.wrap[user] = this.item
      }
    }
    if (d) {
      this.item = this.item.filter((t) => t.id !== d.id)
      this.item.unshift(d)
      this.save()
    }
  }
  private getUser () {
    const user = localStorage.getItem('loginUser')
    const userObj = this.parse(user)
    if (userObj && userObj.id) {
      return userObj.id
    }
    return false
  }
  private save () {
    const user = this.getUser()
    if (user) {
      this.wrap[user] = this.item
    }
    localStorage.setItem('historyBrowser', this.stringify(this.wrap))
  }
  private parse (str: string) {
    try {
      if (str) {
        return JSON.parse(str)
      }
    } catch (err) {
      throw new Error(err)
    }
  }
  private stringify (data) {
    try {
      if (data) {
        return JSON.stringify(data)
      }
    } catch (err) {
      throw new Error(err)
    }
  }
  public clear () {
    this.item.length = 0
  }
  public getAll () {
    const user = this.getUser()
    if (user) {
      return this.wrap[user]
    }
  }
}

export default HistoryStack
