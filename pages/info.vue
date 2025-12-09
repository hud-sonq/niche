<template>
    <div>
        <div style="text-align: center;">
            <h3 style="font-size: 30px; transform: rotate(-8deg);">Tennessee's First Wine Window</h3>
            <h3>123 E main st</h3>
            <h3>123-456-7890</h3>
            <div>
                <a href="mailto:admin@niche.com" style="text-decoration: underline; text-align: center; color: black; cursor: pointer; display: flex; flex-direction: row; align-items: center; justify-content: center;">
                Email us <img src="/icons/LsiconOpenNewFilled.svg" alt="Email Icon" style="height: 32px;"/>
                </a>
            </div>
            <div style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;" class="cheeky-wrap">
                <div style="display: flex; justify-content: center;">
                <img src="/img/wineglass.png" style="height: 100px;" id="cheeky-img-base" class="cheeky-img"/>
                <img src="/img/wineglass-clink.png" style="height: 100px;" id="cheeky-img-clink" class="cheeky-img clink"/>
                <span style="position: absolute; font-size: 10px;" id="cheeky-span">chin-chin!</span>
                </div>
            </div>
        </div>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  const cheekyImg = document.getElementById("cheeky-img") as HTMLImageElement | null;
  if (!cheekyImg) return;

  let toggled = false;

  // Match the animation duration (2s) → halfway = 1s
  setInterval(() => {
    toggled = !toggled;
    cheekyImg.src = toggled ? "/img/wineglass-clink.png" : "/img/wineglass.png";
  }, 1000);
});
</script>