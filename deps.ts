export * from 'https://code.harmony.rocks/v2.5.0/mod.ts';

// @deno-types="https://deno.land/x/usefultags@1.1.1/usefulTags.d.ts"
export { stripAllIndents as stripIndent } from "https://deno.land/x/usefultags@1.1.1/usefulTags.mjs";

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function readJson(filepath: string) {
    try {
        return JSON.parse(await Deno.readTextFile(filepath));
    } catch (e) {
        console.log(filepath+': '+e.message);
    }
}
