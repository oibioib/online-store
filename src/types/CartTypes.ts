// TODO: такие вещи лучше выносить в константы
export enum CartSettings {
  perPage = 3,
}

// TODO: интерфейсы компонентов лучше размещать в самом компоненте
export interface ICartHeader {
  length: number;
}

export type storeItem = {
  id: number;
  quantity: number;
};

export interface ISummaryCart {
  totalSum: number;
  totalItems: number;
}
