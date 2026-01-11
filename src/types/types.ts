export type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	category: string;
	inStock: boolean;
};

export type CartItem = {
	product: Product;
	quantity: number;
};
