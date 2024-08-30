<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

// Assurez-vous d'enregistrer le plugin Observer
gsap.registerPlugin(Observer);

const cursorRef = ref(null);

function updatePosition(x: number, y: number) {
  const posX = (x / window.innerWidth) * 10 - 5;
  const posY = -(y / window.innerHeight) * 10 + 5;

  if (cursorRef.value) {
    gsap.to(cursorRef.value.position, {
      x: posX,
      y: posY,
      z: 20, // Ajustez la profondeur ici si nécessaire
      duration: 0.2,
      ease: "power2.out",
    });
  }
}

onMounted(() => {
  // Utilisation de GSAP Observer pour gérer la souris et le toucher
  Observer.create({
    target: window, // Nous écoutons les mouvements sur toute la fenêtre
    type: "pointer,touch", // Supporte à la fois les événements de souris et de toucher
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
  <!-- SpotLight pour l'éclairage physique qui suit la souris -->
  <TresSpotLight
    ref="cursorRef"
    :intensity="100"
    :angle="1"
    :penumbra="1"
    castShadow
  >
    <!-- Lensflare pour l'effet visuel -->
    <Lensflare :size="1" />
  </TresSpotLight>
</template>
