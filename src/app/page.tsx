'use client'

import dynamic from 'next/dynamic'

const Graph = dynamic(() => import('../components/graph'), {
    ssr: false,
})

export default function Home() {
    return <Graph />
}
