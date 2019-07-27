import Link  from 'next/link';

const to = (to) => ({ to, component: Link as any });

export default to;
