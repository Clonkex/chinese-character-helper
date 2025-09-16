'use server'

import fs from 'fs';
import { Preset } from '@/lib/presets';

export async function loadPresets(): Promise<Preset[]> {
    if (!fs.existsSync('data/presets.json')) {
        return [];
    }
    const json = fs.readFileSync('data/presets.json', 'utf8');
    const presets = JSON.parse(json);
    return presets;
}

export async function savePresets(presets: Preset[]): Promise<boolean> {
    const json = JSON.stringify(presets);
    fs.writeFileSync('data/presets.json', json, 'utf8');
    return true;
}