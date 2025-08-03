
type SliderOptions = {
    min?: number
    max?: number
    value?: number
    step?: number
    trackColor?: string
    fillColor?: string
    thumbColor?: string
    textColor?: string
    onChange?: (value: number) => void
}

export class Slider {

    private x: number;
    private y: number;
    private width: number;
    private height: number;

    private min: number;
    private max: number;
    private value: number;
    private step: number;
    private label: string;
    private trackColor: string;
    private fillColor: string;
    private thumbColor: string;
    private textColor: string;
    private onChange: (value: number) => void;

    // Internal state
    private isDragging = false;
    private isHovered = false;
    private trackHeight = 8;
    private thumbRadius = 12;
    private labelHeight = 25;
    private valueHeight = 25;

    // Animation properties
    private animatedValue: number;
    private animatedThumbScale = 1.0;

    constructor(x: number, y: number, width: number, height: number, label: string, options: SliderOptions = {}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.label = label;

        // Options with defaults
        this.min = options.min ?? 0;
        this.max = options.max ?? 100;
        this.value = options.value ?? 50;
        this.step = options.step ?? 1;
        this.trackColor = options.trackColor ?? '#444';
        this.fillColor = options.fillColor ?? '#4CAF50';
        this.thumbColor = options.thumbColor ?? '#ffffff';
        this.textColor = options.textColor ?? '#ffffff';
        this.onChange = options.onChange ?? (() => { });

        this.animatedValue = this.value;
    }

    /**
     * Convert value to pixel position
     */
    valueToPosition(value: number) {
        const ratio = (value - this.min) / (this.max - this.min);
        const trackWidth = this.width - (this.thumbRadius * 2);
        return this.x + this.thumbRadius + (ratio * trackWidth);
    }

    /**
     * Convert pixel position to value
     */
    positionToValue(position: number) {
        const trackWidth = this.width - (this.thumbRadius * 2);
        const relativePos = position - this.x - this.thumbRadius;
        const ratio = Math.max(0, Math.min(1, relativePos / trackWidth));
        const rawValue = this.min + (ratio * (this.max - this.min));
        return Math.round(rawValue / this.step) * this.step;
    }

    /**
     * Check if point is within slider bounds
     */
    isPointInSlider(x: number, y: number) {
        return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
    }

    /**
     * Check if point is within thumb
     */
    isPointInThumb(x: number, y: number) {
        const thumbX = this.valueToPosition(this.value);
        const thumbY = this.y + this.labelHeight + (this.height - this.labelHeight - this.valueHeight) / 2;
        const distance = Math.sqrt(Math.pow((x - thumbX), 2) + Math.pow((y - thumbY), 2));
        return distance <= this.thumbRadius * this.animatedThumbScale;
    }

    /**
     * Handle mouse/touch down
     */
    handlePointerDown(x: number, y: number) {
        if (this.isPointInSlider(x, y)) {
            if (this.isPointInThumb(x, y)) {
                this.isDragging = true;
                return true;
            } else {
                // Click on track - jump to position
                const newValue = this.positionToValue(x);
                if (newValue !== this.value)
                    this.setValue(newValue);
                this.isDragging = true;
                return true;
            }
        }
        return false;
    }

    /**
     * Handle mouse/touch move
     */
    handlePointerMove(x: number, y: number) {
        const wasHovered = this.isHovered;
        this.isHovered = this.isPointInSlider(x, y);

        if (this.isDragging) {
            const newValue = this.positionToValue(x);
            if (newValue !== this.value)
                this.setValue(newValue);
            return true;
        }

        return wasHovered !== this.isHovered;
    }

    /**
     * Handle mouse/touch up
     */
    handlePointerUp() {
        this.isDragging = false;
    }

    /**
     * Set slider value
     */
    setValue(newValue: number) {
        const clampedValue = Math.max(this.min, Math.min(this.max, newValue));
        if (clampedValue !== this.value) {
            this.value = clampedValue;
            this.onChange(this.value);
        }
    }

    /**
     * Update animations
     */
    update(delta: number) {
        // Smooth value animation
        const valueDiff = this.value - this.animatedValue;
        if (Math.abs(valueDiff) > 0.1)
            this.animatedValue += valueDiff * delta * 8;
        else
            this.animatedValue = this.value;

        // Thumb scale animation
        const targetScale = this.isDragging ? 1.3 : (this.isHovered ? 1.1 : 1.0);
        const scaleDiff = targetScale - this.animatedThumbScale;
        if (Math.abs(scaleDiff) > 0.01)
            this.animatedThumbScale += scaleDiff * delta * 10;
        else
            this.animatedThumbScale = targetScale;
    }

    /**
     * Draw the slider
     */
    render(ctx: CanvasRenderingContext2D) {
        const centerY = this.y + this.labelHeight + (this.height - this.labelHeight - this.valueHeight) / 2;
        const thumbX = this.valueToPosition(this.animatedValue);

        // Draw label
        if (this.label) {
            ctx.fillStyle = this.textColor;
            ctx.font = '16px Segoe UI, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(this.label, this.x, this.y + 18);
        }

        // Draw track background
        ctx.fillStyle = this.trackColor;
        ctx.beginPath();
        ctx.roundRect(this.x + this.thumbRadius, centerY - this.trackHeight / 2, this.width - this.thumbRadius * 2, this.trackHeight, this.trackHeight / 2
        );
        ctx.fill();

        // Draw track fill
        const fillWidth = thumbX - (this.x + this.thumbRadius);
        if (fillWidth > 0) {
            ctx.fillStyle = this.fillColor;
            ctx.beginPath();
            ctx.roundRect(this.x + this.thumbRadius, centerY - this.trackHeight / 2, fillWidth, this.trackHeight, this.trackHeight / 2);
            ctx.fill();
        }

        // Draw thumb shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 2;

        // Draw thumb
        ctx.fillStyle = this.thumbColor;
        ctx.beginPath();
        ctx.arc(thumbX, centerY, this.thumbRadius * this.animatedThumbScale, 0, Math.PI * 2);
        ctx.fill();

        // Draw thumb border
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = this.fillColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw value
        ctx.fillStyle = this.textColor;
        ctx.font = 'bold 18px Segoe UI, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(this.animatedValue).toString(), this.x + this.width + 20, this.y + 35);
    }
}