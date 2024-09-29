import { faker } from "@faker-js/faker"

export type Order = {
	orderId: number
	name: string
	description: string
	createdAt: Date
	url: string
	quantity: number
	status: "scheduled" | "pending" | "packaged" | "shipped" | "delivered"
	price: number
}

const range = ( len: number ) => {
	const arr: number[] = []
	for ( let i = 0; i < len; i++ ) {
		arr.push( i )
	}
	return arr
}

const newOrder = ( index: number ): Order => {
	return {
		orderId: index + 1,
		createdAt: faker.date.anytime(),
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		url: faker.internet.url(),
		quantity: faker.number.int( {
			min: 1,
			max: 100,
		} ),
		price: faker.number.float( {
			min: 1,
			max: 10_000,
		} ),
		status: faker.helpers.shuffle<Order["status"]>( [
			"delivered",
			"pending",
			"shipped",
			"scheduled",
			"packaged",
		] )[ 0 ],
	}
}

export const makeOrderData = ( ...lens: number[] ) => {
	const makeDataLevel = ( depth = 0 ): Order[] => {
		const len = lens[ depth ]
		return range( len ).map( ( d ): Order => {
			return {
				...newOrder( d ),
			}
		} )
	}

	return makeDataLevel()
}
