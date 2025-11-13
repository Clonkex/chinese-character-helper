'use client'

import Papa from 'papaparse'
import { presets } from '@/lib/presets'
import { numberedSyllableToTonemark } from '@/lib/utils'

export default function Exporter() {
    function downloadPresets() {
        const rows: {
            character: string
            pinyin: string
            source: string
        }[] = []
        for (const preset of presets) {
            for (const word of preset.words) {
                rows.push({
                    character: word.c.join(''),
                    pinyin: word.p.map(p => numberedSyllableToTonemark(p)).join(''),
                    source: preset.name,
                })
            }
        }
        const csv = Papa.unparse(rows)

        const link = document.createElement('a')
        link.setAttribute('download', 'vocabulary.csv')
        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv)
        document.body.appendChild(link)
        link.click()
        link.remove()
    }

    return (
        <div className="flex justify-center h-dvh">
            <div className="flex flex-col justify-center">
                <button className="btn btn-primary" onClick={downloadPresets}>
                    Download Exported Presets
                </button>
            </div>
        </div>
    )
}
