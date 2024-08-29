<template>
  <Transition
    name="fade-overlay"
    enter-active-class="opacity-1 transition-opacity duration-900"
    leave-active-class="opacity-0 transition-opacity duration-900"
  >
    <div
      v-show="!hasFinishLoading"
      class="absolute bg-[#252A2E] t-0 l-0 w-full h-full z-20 flex justify-center items-center text-white font-mono"
    >
      <div class="w-200px">
        Loading... {{ progress }} %
        <i class="i-ic-twotone-catching-pokemon animate-rotate-in"></i>
      </div>
    </div>
  </Transition>
  <TresCanvas v-bind="gl" window-size v-show="hasFinishLoading">
    <TresPerspectiveCamera :position="[0, 0, 16]" ref="camRef" fov="75" />
    <TresAmbientLight :intensity="0.1" />
    <TresDirectionalLight
      cast-shadow
      :position="[0, 20, 20]"
      :intensity="0.9"
    />
    <MouseParallax :factor="1" :ease="[3, 3]" />

    <TresMesh receive-shadow :position="[0, 0, 0]">
      <TresPlaneGeometry :args="[100, 100]" />
      <MeshReflectionMaterial :roughness="0" color="#212529" />
    </TresMesh>

    <TresGroup :position="[-6, 2, 10]">
      <Levioso
        :speed="speedLevio"
        :rotation-factor="rotationLevio"
        :float-factor="floatLevio"
      >
        <Suspense>
          <Text3D
            text="!"
            font="fonts/Mitr.json"
            size="2"
            curveSegments="10"
            rotation-y="-0.5"
          >
            <TresMeshStandardMaterial color="#212529" />
          </Text3D>
        </Suspense>
      </Levioso>
    </TresGroup>

    <TresGroup :position="[0, 5, 4]">
      <Suspense>
        <Text3D
          text="WORK IN PROGRESS"
          font="fonts/Mitr.json"
          size="1.5"
          curveSegments="10"
          center
        >
          <TresMeshStandardMaterial color="#212529" />
        </Text3D>
      </Suspense>
    </TresGroup>

    <TresGroup :position="[-4, -1, 10]">
      <Levioso
        :speed="speedLevio"
        :rotation-factor="rotationLevio"
        :float-factor="floatLevio"
      >
        <Suspense>
          <Text3D
            text="<"
            font="fonts/Mitr.json"
            size="2"
            curve-segments="10"
            rotation-y="-0.5"
          >
            <TresMeshStandardMaterial color="#212529" />
          </Text3D>
        </Suspense>
      </Levioso>
    </TresGroup>
    <TresGroup :position="[4, -1, 10]">
      <Levioso
        :speed="speedLevio"
        :rotation-factor="rotationLevio"
        :float-factor="floatLevio"
      >
        <Suspense>
          <Text3D
            text="/"
            font="fonts/Mitr.json"
            size="2"
            curve-segments="10"
            rotation-y="0.5"
            position-x="-1.5"
          >
            <TresMeshStandardMaterial color="#212529" />
          </Text3D>
        </Suspense>
      </Levioso>
      <Levioso
        :speed="speedLevio"
        :rotation-factor="rotationLevio"
        :float-factor="floatLevio"
      >
        <Suspense>
          <Text3D
            text=">"
            font="fonts/Mitr.json"
            size="2"
            curveSegments="10"
            rotation-y="0.5"
          >
            <TresMeshStandardMaterial color="#212529" />
          </Text3D>
        </Suspense>
      </Levioso>
    </TresGroup>
    <TresGroup :position="[6, 1, 10]">
      <Levioso
        :speed="speedLevio"
        :rotation-factor="rotationLevio"
        :float-factor="floatLevio"
      >
        <Suspense>
          <Text3D
            text="?"
            font="fonts/Mitr.json"
            size="2"
            curveSegments="10"
            rotation-y="0.5"
          >
            <TresMeshStandardMaterial color="#212529" />
          </Text3D>
        </Suspense>
      </Levioso>
    </TresGroup>

    <TresGroup :position="[0, -3, 5]">
      <Suspense>
        <Avatar />
      </Suspense>
    </TresGroup>
  </TresCanvas>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  nextTick,
  onUnmounted,
  watch,
  shallowRef,
} from "vue";

import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
const { $gsap, $Observer } = useNuxtApp();
const { onLoop } = useRenderLoop();
import { OrbitControls, Sphere } from "@tresjs/cientos";
import { useProgress } from "@tresjs/cientos";

const { hasFinishLoading, progress, items } = await useProgress();

const camRef = ref(null);
const speedLevio = 2;
const rotationLevio = 2;
const floatLevio = 2;
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
