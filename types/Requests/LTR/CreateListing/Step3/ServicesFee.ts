
export interface IServicesFee {
  included_fee: typeService[]
}

export interface typeService {
  id: number,
  value: number,
  calculate_function: number,
  included: number
}

export interface serviceFeeType {
  id:number,
  value:string
}
