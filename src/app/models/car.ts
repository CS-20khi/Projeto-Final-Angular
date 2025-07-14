export type Veiculo = {
    id: number,
    vehicle: string,
    volumetotal: number,
    connected: number,
    softwareUpdates: number,
    vin: string
    img: string
}

export type VinInfos = {
    vin: string
    id: number
  odometro: number
  nivelCombustivel: number
  status: string
  lat: number
  long:number
}