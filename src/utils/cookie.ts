const cookie = {
  read(name: string): string | null {
    const match = (document.cookie + ";").match(new RegExp(".*?(;?\\s*)(" + name + ")=(.*?;)"))
    return match ? decodeURIComponent(match[3]).slice(0, -1) : null
  }
}


export default cookie