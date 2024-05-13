export const cards = [{
    id: "card1",
    items: [
      {
        product: {
          id: "891389f0-4312-42d6-a650-6fda0959c734",
          title: "Book",
          description: "Interesting book",
          price: 200,
        },
        count: 2,
      },
    ],
  },
];

export const orders = [];

export const products: ProductType[] = [
  {
    id: "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
    title: "Book",
    description: "Interesting book",
    price: 200,
  },
];

export type ProductType = {
    id: string;
    title: string;
    description: string;
    price: number;
};