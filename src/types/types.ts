export type EcommerceEventMap = {
	"cart.added": Event;
	"cart.removed": Event;
	"cart.updated": Event;
	"product.selected": Event;
	"filter.changed": Event;
	"wishlist.added": Event;
	"wishlist.removed": Event;
	"wishlist.synced": Event;
	"search.started": Event;
	"search.completed": Event;
	"search.cancelled": Event;
	"products.loading": Event;
	"products.loaded": Event;
	"products.error": Event;
};

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
