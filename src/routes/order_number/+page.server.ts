import { getOrders } from '$lib/service/orderService';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const page = Number(url.searchParams.get('page') || 1);
    const pageSize = Number(url.searchParams.get('pageSize') || 10);

    const data = await getOrders(page, pageSize);

    return {
        items: data
    };
};
