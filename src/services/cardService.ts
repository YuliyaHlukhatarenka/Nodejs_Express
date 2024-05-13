import { cards, orders } from "../models";

export const getCard = (cardId: string) => {
    let card = cards.find(({ id }) => cardId === id);
    if (!card) {
        card = {
          id: cardId,
          items: [
            {
              product: {
                id: "book_id",
                title: "Book 2",
                description: "Boring book",
                price: 200,
              },
              count: 2,
            },
          ],
        };
        cards.push(card);
    }
    return { card, total: cards.length };
};

export const updateCard = (cardId: string, productId: string, newCount: number) => {
    let newCard;
    const cardIndex = cards.findIndex(({ id }) => id === cardId);
    if (cardIndex === -1) return null;
    if (newCount === 0) {
      newCard = {
        id: cards[cardIndex].id,
        items: cards[cardIndex].items.filter(
          ({ product }) => product.id !== productId
        ),
      };
    } else {
        const product = cards[cardIndex].items.find(
            ({ product }) => product.id === productId
        );
        if (!product) {
            newCard = {
            id: cards[cardIndex].id,
            items: [...cards[cardIndex].items, { product, count: newCount }],
            }; 
        } else {
            newCard = {
                id: cards[cardIndex].id,
                items: cards[cardIndex].items.map(({ product, count }) => {
                if (product.id !== productId) return { product, count };
                    return { product, count: newCount };
                }),
            };
        }
    }
    cards[cardIndex] = newCard;
    return { newCard, total: cards.length };
};

export const deleteCard = (cardId: string) => {
    const index = cards.findIndex(({ id }) => id === cardId);
    cards.splice(index, 1);
    return;
}

export const createOrder = (cardId: string) => {
    const index = cards.findIndex(({ id }) => id === cardId);
    orders.push(cards[index]);
    cards.splice(index, 1);
    return orders;
};

