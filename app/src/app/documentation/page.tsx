import { getApiDocs } from '@/lib/swagger';
import ReactSwagger from './react-swagger';

export default async function IndexPage() {
	const spec = await getApiDocs();
	return (
		<section className='bg-secondary w-full h-full rounded-xl p-4 bg-white'>
			<ReactSwagger
				spec={spec}
				url='/swagger.json'
			/>
		</section>
	);
}
