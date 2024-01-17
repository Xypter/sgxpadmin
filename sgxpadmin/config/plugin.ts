module.exports = ({ env }) => ({
	"content-versioning": {
		enabled:  true,
	},
	redis: {
		config: {
			connections: {
				default: {
					connection: {
						host: '127.0.0.1',
						port: 6379,
						db: 0,
					},
					settings: {
						debug: false,
					},
				},
			},
		},
	},
	// Step 2: Configure the redis cache plugin
	"rest-cache": {
		config: {
			provider: {
				name: "redis",
				options: {
					max: 32767,
					connection: "default",
				},
			},
			strategy: {
				
				enableEtagSupport: true,
				logs: true,
				clearRelatedCache: true,
				maxAge: 3600000,
				contentTypes: [
					// list of Content-Types UID to cache
					"api::category.category",
					"api::sprite.sprite",
					"api::global.global",
					"api::homepage.homepage",
					{
						contentType: "api::sprite.sprite",
						maxAge: 3600000,
						hitpass: false,
						keys: {
							useQueryParams: false,
							useHeaders: ["accept-encoding"],
						},
						method: "GET",
					}
				],
			},
		},
	},
});