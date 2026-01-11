export type EcommerceEventMap = {
	"cart.added": Event;
	"cart.removed": Event;
	"cart.updated": Event;
	"product.selected": Event;
	"wishlist.added": Event;
	"wishlist.removed": Event;
	"wishlist.synced": Event;
	"products.loading": Event;
	"products.loaded": Event;
	"products.error": Event;
};

export class EcommerceEvent extends Event {
	type: keyof EcommerceEventMap;

	constructor(type: keyof EcommerceEventMap) {
		super(type);
		this.type = type;
	}
}
