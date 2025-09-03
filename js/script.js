document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('neural-net-canvas');
    const ctx = canvas.getContext('2d');
    let nodes = [];

    // キャンバスのサイズをウィンドウに合わせる
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ウィンドウサイズが変更されたらキャンバスサイズも更新
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // ノード（点）のクラス
    class Node {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.vx = (Math.random() - 0.5) * 0.5; // X方向の速度
            this.vy = (Math.random() - 0.5) * 0.5; // Y方向の速度
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            // 画面端での跳ね返り
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.vx = -this.vx;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.vy = -this.vy;
            }

            this.x += this.vx;
            this.y += this.vy;
            this.draw();
        }
    }

    // ノードの生成
    function createNodes(count) {
        for (let i = 0; i < count; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 2 + 1; // ノードのサイズ
            const color = 'rgba(144, 202, 249, 0.8)';
            nodes.push(new Node(x, y, radius, color));
        }
    }

    // ノード間の線を引く
    function drawLines() {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const node1 = nodes[i];
                const node2 = nodes[j];
                const distance = Math.hypot(node1.x - node2.x, node1.y - node2.y);

                if (distance < 150) { // 150px以内に近づいたら線を引く
                    const opacity = 1 - (distance / 150);
                    ctx.beginPath();
                    ctx.moveTo(node1.x, node1.y);
                    ctx.lineTo(node2.x, node2.y);
                    ctx.strokeStyle = `rgba(144, 202, 249, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    // アニメーションループ
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 前のフレームをクリア
        drawLines();
        nodes.forEach(node => node.update());
        requestAnimationFrame(animate);
    }

    createNodes(80); // 80個のノードを生成
    animate();
});