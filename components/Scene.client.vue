<template>
  <Transition
    name="fade-overlay"
    enter-active-class="opacity-1 transition-opacity duration-900"
    leave-active-class="opacity-0 transition-opacity duration-900"
  >
    <div
      v-show="!hasFinishLoading"
      class="absolute bg-[#252A2E] w-full h-full z-20 flex flex-col justify-center items-center text-white font-mono"
    >
      <div class="mb-4">Loading...</div>
      <div class="w-full h-6 bg-[#252A2E] absolute bottom-0 overflow-hidden">
        <div
          class="h-full transition-all duration-1000 ease-out bg-white"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>
  </Transition>
  <TresCanvas v-bind="gl" window-size v-show="hasFinishLoading">
    <TresPerspectiveCamera :position="[0, 0, 16]" ref="camRef" fov="75" />

    <OrbitControls />

    <Levioso :speed="5" :rotation-factor="0.1" :float-factor="2.5">
      <MouseParallax :factor="1" :ease="[3, 3]" />
    </Levioso>

    <Lumos />

    <Text />

    <TresMesh receiveShadow :position="[0, 0, 0]">
      <TresPlaneGeometry :args="[100, 100]" />
      <TresMeshStandardMaterial color="#e9ecef" />
    </TresMesh>
  </TresCanvas>
</template>

<script setup>
import { reactive, ref } from "vue";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import { OrbitControls } from "@tresjs/cientos";
import { useProgress } from "@tresjs/cientos";

const { hasFinishLoading, progress } = await useProgress();

const camRef = ref(null);

const gl = reactive({
  clearColor: "#212529",
  powerPreference: "high-performance",
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
});
</script>
