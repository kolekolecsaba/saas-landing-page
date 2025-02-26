window.Color4Bg = {
    BlurGradientBg: class {
        constructor(options) {
            this.dom = document.querySelector(options.dom);
            this.colors = options.colors;
            this.loop = options.loop;
            this.init();
        }

        init() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.zIndex = '-1';
            
            this.dom.style.position = 'relative';
            this.dom.appendChild(canvas);

            let width = canvas.width = canvas.offsetWidth;
            let height = canvas.height = canvas.offsetHeight;

            const gradient = ctx.createLinearGradient(0, 0, width, height);
            this.colors.forEach((color, index) => {
                gradient.addColorStop(index / (this.colors.length - 1), color);
            });

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            if (this.loop) {
                this.animate(ctx, width, height);
            }
        }

        animate(ctx, width, height) {
            let offset = 0;
            
            const animation = () => {
                offset = (offset + 0.002) % 1;
                
                const gradient = ctx.createLinearGradient(
                    width * Math.cos(offset * Math.PI * 2), 
                    height * Math.sin(offset * Math.PI * 2), 
                    width * Math.cos((offset + 0.5) * Math.PI * 2),
                    height * Math.sin((offset + 0.5) * Math.PI * 2)
                );

                this.colors.forEach((color, index) => {
                    gradient.addColorStop(index / (this.colors.length - 1), color);
                });

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
                
                requestAnimationFrame(animation);
            };

            animation();
        }
    }
};
