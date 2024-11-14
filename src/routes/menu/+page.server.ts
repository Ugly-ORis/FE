import { getIceCreams } from '$lib/service/iceCreamService';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const page = Number(url.searchParams.get('page') || 1);
    const pageSize = Number(url.searchParams.get('pageSize') || 10);

    const data = await getIceCreams(page, pageSize);
    console.log('from page.server.ts', data);

    return {
        items: data
    };
};
