<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

const leftSpotRef = ref(null);
const centerSpotRef = ref(null);
const rightSpotRef = ref(null);

function updatePositions(x: number, y: number) {
  const posX = (x / window.innerWidth) * 10 - 5;
  const posY = -(y / window.innerHeight) * 10 + 5;

  const spots = [leftSpotRef, centerSpotRef, rightSpotRef];
  const offsets = [-2, 0, 2]; // Décalage horizontal pour chaque spot

  spots.forEach((spotRef, index) => {
    if (spotRef.value) {
      gsap.to(spotRef.value.position, {
        x: posX + offsets[index],
        y: posY,
        z: 20,
        duration: 0.1,
        ease: "power1.out",
      });
    }
  });
}

onMounted(() => {
  Observer.create({
    target: window,
    type: "pointer,touch",
    onMove: (self) => {
      updatePositions(self.x, self.y);
    },
  });
});

onUnmounted(() => {
  Observer.getAll().forEach((observer) => observer.kill());
});
</script>

<template>
  <TresAmbientLight :intensity="0.3" />
  <TresSpotLight
    ref="leftSpotRef"
    :intensity="100"
    :angle="0.4"
    :penumbra="0.5"
    castShadow
  >
    <Lensflare :size="0.7" />
  </TresSpotLight>

  <TresSpotLight
    ref="centerSpotRef"
    :intensity="100"
    :angle="0.5"
    :penumbra="0.6"
    castShadow
  >
    <Lensflare :size="1" />
  </TresSpotLight>

  <TresSpotLight
    ref="rightSpotRef"
    :intensity="100"
    :angle="0.4"
    :penumbra="0.5"
    castShadow
  >
    <Lensflare :size="0.7" />
  </TresSpotLight>
</template>
