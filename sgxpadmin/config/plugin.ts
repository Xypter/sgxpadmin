module.exports = ({ env }) => ({
	"content-versioning": {
		enabled:  true,
	},
	"rest-cache": {
		config: {
		  provider: {
			name: "memory",
			options: {
			  max: 32767,
			  maxAge: 3600,
			},
		  },
		  strategy: {
			contentTypes: [
			  // list of Content-Types UID to cache
			  "api::category.category",
			  "api::sprite.sprite",
			  "api::global.global",
			  "api::homepage.homepage",
			],
		  },
		},
	  },
});