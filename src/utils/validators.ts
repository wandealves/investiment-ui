export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidCPF = (cpf: string): boolean => {
  // Implementação básica
  cpf = cpf.replace(/[^\d]/g, '')
  return cpf.length === 11
}

export const isValidCNPJ = (cnpj: string): boolean => {
  // Implementação básica
  cnpj = cnpj.replace(/[^\d]/g, '')
  return cnpj.length === 14
}

export const isValidTicker = (ticker: string): boolean => {
  // Validate stock ticker format
  return /^[A-Z]{4}[0-9]{1,2}$/.test(ticker)
}
