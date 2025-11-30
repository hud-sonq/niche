<template>
  <div id="initial-stuff" ref="initialStuffRef">
    <div
      id="niche-png-container"
      ref="imgRef"
      class="fade-item start-hidden"
    >
      <img src="/img/niche3.png" alt="niche" id="niche-png-itself" />
    </div>

    <div id="texts">
      <div ref="titleRef" class="fade-item start-hidden">
        <h3>find the niche</h3>
      </div>

      <div ref="addressRef" class="fade-item start-hidden">
        <div class="order-button">
          <BlobButton :text="blobButtonText" @click="handleClick" />
        </div>
      </div>
    </div>
  </div>

  <div id="after-click-stuff" ref="afterStuffRef" style="display:none; opacity:0;">
    <div style="text-align: center;">
      <h3 class="start-hidden">123 E main st</h3>
      <h3 class="start-hidden">Chattanooga, TN 37408</h3>
      <h3 class="start-hidden">123-456-7890</h3>
      <div>
        <a href="mailto:admin@niche.com" style="text-decoration: underline; text-align: center; color: black; cursor: pointer; display: flex; flex-direction: row; align-items: center; justify-content: center;" class="start-hidden">
          Email us <img src="/icons/LsiconOpenNewFilled.svg" alt="Email Icon" style="height: 32px;"/>
        </a>
      </div>
      <div style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;" class="start-hidden cheeky-wrap">
        <div style="display: flex; justify-content: center;">
          <img src="/img/wineglass.png" style="height: 100px;" id="cheeky-img-base" class="cheeky-img"/>
          <img src="/img/wineglass-clink.png" style="height: 100px;" id="cheeky-img-clink" class="cheeky-img clink"/>
          <span style="position: absolute; font-size: 10px;" id="cheeky-span">chin chin</span>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue';

const imgRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const addressRef = ref<HTMLElement | null>(null);

const initialStuffRef = ref<HTMLElement | null>(null);
const afterStuffRef = ref<HTMLElement | null>(null);

const blobButtonText = 'CLICK HERE';

onMounted(() => {
  requestAnimationFrame(() => {
    imgRef.value?.classList.remove('start-hidden');
    titleRef.value?.classList.remove('start-hidden');
    addressRef.value?.classList.remove('start-hidden');

    requestAnimationFrame(() => {
      setTimeout(() => imgRef.value?.classList.add('visible'), 500);

      setTimeout(() => {
        titleRef.value?.classList.add('visible');

        setTimeout(() => {
          addressRef.value?.classList.add('visible');
        }, 775);
      }, 1700);
    });
  });

  const cheekyImg = document.getElementById("cheeky-img") as HTMLImageElement | null;
  if (!cheekyImg) return;

  let toggled = false;

  // Match the animation duration (2s) → halfway = 1s
  setInterval(() => {
    toggled = !toggled;
    cheekyImg.src = toggled ? "/img/wineglass-clink.png" : "/img/wineglass.png";
  }, 1000);
});

function handleClick() {
  const initial = initialStuffRef.value;
  const after = afterStuffRef.value;
  if (!initial || !after) return;

  initial.querySelectorAll('.fade-item').forEach((el) => {
    (el as HTMLElement).style.transition = "opacity 350ms ease";
    el.classList.remove('visible');
  });

  setTimeout(() => {
    initial.style.display = 'none';

    after.style.display = 'block';
    after.style.opacity = '0';
    after.style.transition = 'opacity 600ms ease';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        after.style.opacity = '1';

        const items = after.querySelectorAll('.start-hidden');

        let delay = 600;

        items.forEach((item) => {
          item.classList.remove('start-hidden');

          setTimeout(() => {
            item.classList.add('visible');
          }, delay);

          delay += 1000;
        });
      });
    });

  }, 350);
}


</script>



<style scoped>
/* Starting invisible + translated slightly */
.start-hidden {
  opacity: 0;
}

/* Base fade item settings */
.fade-item {
  opacity: 0;
  transition: opacity 3000ms cubic-bezier(.22,.9,.34,1);
  will-change: opacity;
}

/* Active fade state */
.fade-item.visible {
  opacity: 1;
}

/* Layout */
#niche-png-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
}

#niche-png-container img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

#niche-png-itself {
  max-width: 300px;
}

#texts {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 8px;
}

.cheeky-wrap {
  position: relative;
  width: fit-content;
  height: fit-content;
}

/* Both images occupy same layout space and stack */
.cheeky-img {
  display: block;
  position: absolute;
  width: auto;
  height: 100px;
  transform-origin: center;
  /* same rotation animation on both images so they tilt together */
  animation: cheeky-bob 2s steps(1, end) infinite;
  /* make opacity animated separately via own animation */
  will-change: opacity, transform;
}

/* clink image will be visible only in tilted half (0% - 50%) */
.cheeky-img.clink {
  animation-name: cheeky-bob, clink-opacity;
  animation-duration: 2s, 2s;
  animation-timing-function: steps(1, end), steps(1, end);
  animation-iteration-count: infinite, infinite;
  animation-fill-mode: both, both;
  /* Ensure it sits above base */
  z-index: 2;
}

/* base image visible in upright half (50% - 100%) */
.cheeky-img#cheeky-img-base {
  animation-name: cheeky-bob, base-opacity;
  animation-duration: 2s, 2s;
  animation-timing-function: steps(1, end), steps(1, end);
  animation-iteration-count: infinite, infinite;
  animation-fill-mode: both, both;
  z-index: 1;
}

/* opacity keyframes aligned to the same steps so no drift */
@keyframes clink-opacity {
  0%   { opacity: 1; }   /* tilted visible */
  49%  { opacity: 1; }
  50%  { opacity: 0; }   /* then hidden when upright */
  100% { opacity: 0; }
}

@keyframes base-opacity {
  0%   { opacity: 0; }   /* base hidden when tilted */
  49%  { opacity: 0; }
  50%  { opacity: 1; }   /* visible when upright */
  100% { opacity: 1; }
}

/* keep your rotation animation unchanged (applied via cheeky-bob) */
@keyframes cheeky-bob {
  0%   { transform: rotate(-9deg); }
  1%   { transform: rotate(-25deg); }
  50%  { transform: rotate(-25deg); }
  51%  { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}

#cheeky-span { 
  animation: cheeky-fade 2s steps(1, end) infinite; 
  transform: rotate(22deg); right: 97px; 
} 

@keyframes cheeky-fade { 
  0% { opacity: 1; } 49% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 0; } 
}


/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .fade-item,
  .fade-item.visible,
  .start-hidden {
    transition: none !important;
    opacity: 1 !important;
  }
}
</style>
