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
      <div ref="buttonContainerRef" class="fade-item start-hidden">
        <div>
          <NuxtLink to="/info"><BlobButton :text="blobButtonText"/></NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const blobButtonText = 'CLICK HERE';

const imgRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const buttonContainerRef = ref<HTMLElement | null>(null);

const elements = [imgRef, titleRef, buttonContainerRef];

const staggerDelay = 1000;

onMounted(() => {
  elements.forEach((elRef, index) => {
    const el = elRef.value;
    if (!el) return;

    setTimeout(() => {
      el.classList.remove('start-hidden');
      requestAnimationFrame(() => {
        el.classList.add('visible');
      });
    }, index * staggerDelay);
  });
});
</script>

