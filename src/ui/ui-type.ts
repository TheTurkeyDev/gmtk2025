export interface UI {
    mouseDown: (event: MouseEvent, canvas: HTMLCanvasElement) => void
    mouseUp: (event: MouseEvent, canvas: HTMLCanvasElement) => void
    mouseMove: (event: MouseEvent, canvas: HTMLCanvasElement) => void
    render: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void
    update: (delta: number, width: number, height: number) => void
}