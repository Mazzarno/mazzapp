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
          class="h-full transition-all duration-300 ease-out bg-white"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>
  </Transition>
  <TresCanvas v-bind="gl" window-size v-show="hasFinishLoading">
    <TresPerspectiveCamera :position="[0, 0, 16]" ref="camRef" fov="75" />

    <Levioso :speed="5" :rotation-factor="0.1" :float-factor="2.5">
      <MouseParallax :factor="1" :ease="[3, 3]" />
    </Levioso>

    <TresDirectionalLight :position="[0, 20, 20]" :intensity="0.1" />

    <Cursor />

    <TresMesh receive-shadow :position="[0, 0, 0]">
      <TresPlaneGeometry :args="[100, 100]" />
      <TresMeshStandardMaterial color="#000814" />
    </TresMesh>

    <TresGroup :position="[-6, 2, 10]">
      <Levioso
        :speed="speedLevio"
        :rotation-factor="rotationLevio"
        :float-factor="floatLevio"
      >
        <Suspense>
          <Text3D
            ref="textRefs.exclamation"
            :text="texts.exclamation"
            font="fonts/Mitr.json"
            size="2"
            curveSegments="10"
            rotation-y="-0.5"
            @click="transformText('exclamation')"
          >
            <TresMeshStandardMaterial color="#212529" />
          </Text3D>
        </Suspense>
      </Levioso>
    </TresGroup>

    <TresGroup :position="[0, 5, 4]">
      <Suspense>
        <Text3D
          ref="textRefs.workInProgress"
          :text="texts.workInProgress"
          font="fonts/Mitr.json"
          size="1.5"
          curveSegments="10"
          center
          @click="transformText('workInProgress')"
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
            :text="texts.lessThan"
            font="fonts/Mitr.json"
            size="2"
            curve-segments="10"
            rotation-y="-0.5"
            @click="transformText('lessThan')"
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
            :text="texts.slash"
            font="fonts/Mitr.json"
            size="2"
            curve-segments="10"
            rotation-y="0.5"
            position-x="-1.5"
            @click="transformText('slash')"
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
            :text="texts.greaterThan"
            font="fonts/Mitr.json"
            size="2"
            curve-segments="10"
            rotation-y="0.5"
            @click="transformText('greaterThan')"
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
            :text="texts.question"
            font="fonts/Mitr.json"
            size="2"
            curveSegments="10"
            rotation-y="0.5"
            @click="transformText('question')"
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
import { reactive, ref } from "vue";
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

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!?<>/";

function getRandomLetter() {
  return letters[Math.floor(Math.random() * letters.length)];
}

const texts = reactive({
  exclamation: "!",
  workInProgress: "WORK IN PROGRESS",
  lessThan: "<",
  slash: "/",
  greaterThan: ">",
  question: "?",
});

const textRefs = {
  exclamation: ref(null),
  workInProgress: ref(null),
  lessThan: ref(null),
  slash: ref(null),
  greaterThan: ref(null),
  question: ref(null),
};

function transformText(key) {
  const textRef = textRefs[key];
  if (textRef.value) {
    $gsap.to(textRef.value.rotation, {
      y: textRef.value.rotation.y + Math.PI * 4, // 2 rotations complètes
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        texts[key] = getRandomLetter();
        // Réinitialiser la rotation
        $gsap.set(textRef.value.rotation, { y: 0 });
      },
    });
  }
}
</script>
