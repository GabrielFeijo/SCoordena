import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
	const spec = createSwaggerSpec({
		apiFolder: '/src/app/api', // Define a pasta API dentro da pasta app
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'Senac Coordena API Documentation',
				description: 'API Documentation for the Senac Coordena App',
				version: '1.0.0',
				contact: {
					name: 'Gabriel Feijó',
					email: 'feijo6622gmail.com',
				},
				license: {
					name: 'MIT License',
					url: 'https://opensource.org/licenses/MIT',
				},
			},
		},
	});

	return spec;
};
