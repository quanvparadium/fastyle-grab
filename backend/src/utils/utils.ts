export function getName(file1: string, file2: string): number {
    try {
        return parseInt(file1.split('.')[0]) - parseInt(file2.split('.')[0])
    } catch (error) {
        throw new Error('Validation Type')
    }
}
export function random(range: number, seed: number) {
    const x = Math.sin(seed + 1) * range
    return Math.floor((x - Math.floor(x)) * range)
}
