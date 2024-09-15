<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRenderLoop, useTresContext } from "@tresjs/core";
import { vLightHelper } from "@tresjs/core";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);
const cursorRef = ref(null);
const { onLoop } = useRenderLoop();
onLoop(() => {});
function updatePosition(x: number, y: number) {
  const posX = (x / window.innerWidth) * 30 - 15;
  const posY = -(y / window.innerHeight) * 10 + 5;
  if (cursorRef.value) {
    gsap.to(cursorRef.value.position, {
      x: posX,
      y: posY,
      z: 3.5,
      yoyo: true,
      duration: 2.5,
      ease: "power2",
    });
  }
}
onMounted(() => {
  Observer.create({
    target: window,
    type: "pointer,touch",
    onMove: (self) => {
      updatePosition(self.x, self.y);
    },
    // Si vous souhaitez gérer les événements de clic ou de tap, vous pouvez ajouter ces options :
    onDown: (self) => console.log("Clicked or tapped!"),
    onUp: (self) => console.log("Released!"),
  });
});
onUnmounted(() => {
  // Optionnel : si vous avez besoin de nettoyer l'Observer
  Observer.getAll().forEach((observer) => observer.kill());
});
</script>

<template>
  <TresAmbientLight intensity="2" />
  <TresDirectionalLight color="#faedcd" intensity="1" :position="[0, 0, 20]" />
  <TresPointLight
    ref="cursorRef"
    color="#faedcd"
    :intensity="15"
    scale="10"
    castShadow
    :position="[0, 0, 3.5]"
    :shadow-mapSize="[20048, 20048]"
    :shadow-camera-left="-2000"
    :shadow-camera-right="2000"
    :shadow-camera-top="2000"
    :shadow-camera-bottom="-2000"
    :shadow-camera-near="0.5"
    :shadow-camera-far="50"
  >
  </TresPointLight>
</template>
