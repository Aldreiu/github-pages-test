const textEl = document.querySelector("#text");
const texts = JSON.parse(textEl.getAttribute("data-text"));

let index = 0; // 数组下标
let charIndex = 0; // 子的下标
let delta = 500; // 间隔时间

let start = null;
let isDeleting = false; // 是否删除

// time是每次动画的时间戳
function type(time) {
    window.requestAnimationFrame(type); // 下一帧动画 个人觉得写在最后比较好
    // console.log("timt:"+time);
    if (!start) strat = time;
    // console.log("strat:"+strat);
    let progress = time - start;
    // console.log("progress:"+progress);

    if (progress > delta) {
        let text = texts[index];
        if (!isDeleting) {
            textEl.innerHTML = text.slice(0, ++charIndex);
            delta = 500 - Math.random() * 400;
        } else {
            textEl.innerHTML = text.slice(0, charIndex--);
        }

        start = time;
        // console.log(strat);
        // console.log("newProge"+progress);

        if (charIndex === text.length) {
            isDeleting = true;
            delta = 200;
            start = time + 1200;  // 1200ms在进行删除
        }

        if (charIndex < 0) {
            isDeleting = false;
            start = time + 200;
            index = ++index % texts.length;
        }
    }
    // window.requestAnimationFrame(type);
}

window.requestAnimationFrame(type);